class TogyzkumalakAI {
    constructor(difficulty = 1) {
        this.difficulty = difficulty;
    }

    setDifficulty(d) {
        this.difficulty = d;
    }

    getBestMove(game) {
        const validMoves = game.getValidMoves();
        if (validMoves.length === 0) return null;

        if (this.difficulty === 1) {
            if (Math.random() > 0.3) {
                return validMoves[Math.floor(Math.random() * validMoves.length)];
            }
            return this.getBestMoveMinimax(game, 1);
        }

        if (this.difficulty === 2) {
            return this.getBestMoveMinimax(game, 3);
        }

        if (this.difficulty === 3) {
            return this.getBestMoveMinimax(game, 5);
        }

        return validMoves[0];
    }

    getBestMoveMinimax(game, maxDepth) {
        const validMoves = game.getValidMoves();
        if (validMoves.length === 1) return validMoves[0];

        let bestMove = validMoves[0];
        let bestScore = -Infinity;
        let alpha = -Infinity;
        let beta = Infinity;

        const shuffledMoves = [...validMoves].sort(() => Math.random() - 0.5);

        for (const move of shuffledMoves) {
            const tempGame = game.clone();
            tempGame.makeMove(move);

            const nextIsMaximizing = (tempGame.currentPlayer === 2);
            const score = this.minimax(tempGame, maxDepth - 1, alpha, beta, nextIsMaximizing);

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            alpha = Math.max(alpha, bestScore);
        }

        return bestMove;
    }

    minimax(game, depth, alpha, beta, isMaximizing) {
        if (depth === 0 || game.gameOver) {
            return this.evaluate(game);
        }

        const validMoves = game.getValidMoves();
        if (validMoves.length === 0) {
            return this.evaluate(game);
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (const move of validMoves) {
                const tempGame = game.clone();
                tempGame.makeMove(move);
                const nextIsMaximizing = (tempGame.currentPlayer === 2);
                const evaluation = this.minimax(tempGame, depth - 1, alpha, beta, nextIsMaximizing);
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of validMoves) {
                const tempGame = game.clone();
                tempGame.makeMove(move);
                const nextIsMaximizing = (tempGame.currentPlayer === 2);
                const evaluation = this.minimax(tempGame, depth - 1, alpha, beta, nextIsMaximizing);
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) break;
            }
            return minEval;
        }
    }

    evaluate(game) {
        if (game.gameOver) {
            if (game.winner === 2) return 200000 + game.kazan[1];
            if (game.winner === 1) return -200000 - game.kazan[0];
            return 0;
        }

        let score = 0;

        // 1. Material advantage (Captured stones)
        const kazanDiff = game.kazan[1] - game.kazan[0];
        score += kazanDiff * 1000;

        // 2. Tuzdyq evaluation
        const aiTuzdyqIdx = game.tuzdyq[1];
        const humanTuzdyqIdx = game.tuzdyq[0];

        if (aiTuzdyqIdx !== -1) {
            score += 500;
            // Bonus if Tuzdyq is in a high-traffic hole
            const otauNum = aiTuzdyqIdx + 1; // 1 to 9
            score += (10 - otauNum) * 20;
        }
        if (humanTuzdyqIdx !== -1) {
            score -= 500;
            const otauNum = 18 - humanTuzdyqIdx;
            score -= (10 - otauNum) * 20;
        }

        // 3. Board presence (Stones remaining in holes)
        let aiStones = 0;
        let humanStones = 0;
        for (let i = 0; i < 9; i++) humanStones += game.board[i];
        for (let i = 9; i < 18; i++) aiStones += game.board[i];

        score += (aiStones - humanStones) * 10;

        // 4. Strategic Positioning (Difficulty 2+)
        if (this.difficulty >= 2) {
            // Vulnerability check: Holes with even stones are targets
            for (let i = 0; i < 9; i++) {
                const count = game.board[i];
                if (count > 0 && count % 2 === 1) score += 20; // Harder for AI to capture (will become even)
                if (count === 2 && aiTuzdyqIdx === -1 && i !== 8) score += 60; // Potential Tuzdyq for AI
            }

            for (let i = 9; i < 18; i++) {
                const count = game.board[i];
                if (count > 0 && count % 2 === 0) score -= 30; // Vulnerable to human capture
                if (count === 2 && humanTuzdyqIdx === -1 && i !== 17) score -= 80; // Potential Tuzdyq for human
            }

            // Mobility: Number of available moves
            const aiMoves = game.getValidMoves(2).length;
            const humanMoves = game.getValidMoves(1).length;
            score += (aiMoves - humanMoves) * 50;

            // Protection of high-value holes
            if (aiStones < 10) score -= 500; // Penalize "atsyz qalu" risk
        }

        // 5. Grandmaster Heuristics (Difficulty 3)
        if (this.difficulty === 3) {
            // Favor moves that lead to "atsyz qalu" for opponent
            if (humanStones < 5) score += 1000;

            // Control of the board
            for (let i = 9; i < 18; i++) {
                if (game.board[i] > 12) score += 40; // Accumulating stones for a big sweep
            }
        }

        score += (Math.random() - 0.5) * 10; // Slight randomness to avoid repetitive games
        return score;
    }
}
