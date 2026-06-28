class TogyzkumalakGame {
    constructor() {
        this.reset();
    }

    reset() {
        this.board = Array(18).fill(9);
        this.kazan = [0, 0];
        this.tuzdyq = [-1, -1];
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = null;
        this.moveHistory = [];
        this.lastMove = null;
    }

    clone() {
        const copy = new TogyzkumalakGame();
        copy.board = [...this.board];
        copy.kazan = [...this.kazan];
        copy.tuzdyq = [...this.tuzdyq];
        copy.currentPlayer = this.currentPlayer;
        copy.gameOver = this.gameOver;
        copy.winner = this.winner;
        return copy;
    }

    getValidMoves(player = this.currentPlayer) {
        if (this.gameOver) return [];
        const start = (player === 1) ? 0 : 9;
        const end = (player === 1) ? 8 : 17;
        const moves = [];
        for (let i = start; i <= end; i++) {
            if (this.board[i] > 0) {
                moves.push(i);
            }
        }
        return moves;
    }

    checkGameEnd() {
        if (this.kazan[0] > 81) {
            this.gameOver = true;
            this.winner = 1;
            return true;
        }
        if (this.kazan[1] > 81) {
            this.gameOver = true;
            this.winner = 2;
            return true;
        }
        if (this.kazan[0] === 81 && this.kazan[1] === 81) {
            this.gameOver = true;
            this.winner = 0;
            return true;
        }

        const p1Moves = this.getValidMoves(1);
        const p2Moves = this.getValidMoves(2);

        if (this.currentPlayer === 1 && p1Moves.length === 0) {
            for (let i = 9; i < 18; i++) {
                this.kazan[1] += this.board[i];
                this.board[i] = 0;
            }
            this.gameOver = true;
            this.winner = this.kazan[0] > this.kazan[1] ? 1 : (this.kazan[1] > this.kazan[0] ? 2 : 0);
            return true;
        }

        if (this.currentPlayer === 2 && p2Moves.length === 0) {
            for (let i = 0; i < 9; i++) {
                this.kazan[0] += this.board[i];
                this.board[i] = 0;
            }
            this.gameOver = true;
            this.winner = this.kazan[0] > this.kazan[1] ? 1 : (this.kazan[1] > this.kazan[0] ? 2 : 0);
            return true;
        }

        return false;
    }

    makeMove(idx) {
        if (this.gameOver) return false;

        const player = this.currentPlayer;
        const isValid = (player === 1 && idx >= 0 && idx <= 8 && this.board[idx] > 0) ||
                        (player === 2 && idx >= 9 && idx <= 17 && this.board[idx] > 0);
        if (!isValid) return false;

        const preState = {
            board: [...this.board],
            kazan: [...this.kazan],
            tuzdyq: [...this.tuzdyq],
            currentPlayer: this.currentPlayer
        };

        let stones = this.board[idx];
        this.board[idx] = 0;

        let curr = idx;

        if (stones > 1) {
            this.board[idx] = 1;
            stones--;
        }

        const sowSteps = [];

        while (stones > 0) {
            curr = (curr + 1) % 18;

            const oppTuzdyq = this.tuzdyq[player === 1 ? 1 : 0];
            if (curr === oppTuzdyq) {
                this.kazan[player === 1 ? 1 : 0]++;
                sowSteps.push({ index: curr, destination: 'kazan', owner: (player === 1 ? 2 : 1) });
            } else {
                this.board[curr]++;
                sowSteps.push({ index: curr, destination: 'hole' });
            }
            stones--;
        }

        const endIdx = curr;
        let captures = 0;
        let isTuzdyqCreated = false;

        const isOpponentSide = (player === 1) ? (endIdx >= 9 && endIdx <= 17) : (endIdx >= 0 && endIdx <= 8);

        if (isOpponentSide) {
            const count = this.board[endIdx];
            if (count % 2 === 0) {
                captures = count;
                this.kazan[player === 1 ? 0 : 1] += count;
                this.board[endIdx] = 0;
            }
            else if (count === 3) {
                const isNinthHole = (player === 1) ? (endIdx === 17) : (endIdx === 8);
                const playerAlreadyHasTuzdyq = this.tuzdyq[player === 1 ? 0 : 1] !== -1;

                let matchesOppositeTuzdyq = false;
                if (player === 1) {
                    const p2Tuzdyq = this.tuzdyq[1];
                    if (p2Tuzdyq !== -1 && (p2Tuzdyq + 9) === endIdx) {
                        matchesOppositeTuzdyq = true;
                    }
                } else {
                    const p1Tuzdyq = this.tuzdyq[0];
                    if (p1Tuzdyq !== -1 && (p1Tuzdyq - 9) === endIdx) {
                        matchesOppositeTuzdyq = true;
                    }
                }

                if (!isNinthHole && !playerAlreadyHasTuzdyq && !matchesOppositeTuzdyq) {
                    this.tuzdyq[player === 1 ? 0 : 1] = endIdx;
                    captures = 3;
                    this.kazan[player === 1 ? 0 : 1] += 3;
                    this.board[endIdx] = 0;
                    isTuzdyqCreated = true;
                }
            }
        }

        this.lastMove = {
            player,
            startIdx: idx,
            endIdx,
            captures,
            isTuzdyq: isTuzdyqCreated,
            sowSteps
        };

        this.moveHistory.push({
            preState,
            move: idx,
            postState: {
                board: [...this.board],
                kazan: [...this.kazan],
                tuzdyq: [...this.tuzdyq],
                currentPlayer: this.currentPlayer
            },
            meta: this.lastMove
        });

        this.checkGameEnd();

        if (!this.gameOver) {
            this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
        }

        return true;
    }

    undo() {
        if (this.moveHistory.length === 0) return false;
        const last = this.moveHistory.pop();

        this.board = [...last.preState.board];
        this.kazan = [...last.preState.kazan];
        this.tuzdyq = [...last.preState.tuzdyq];
        this.currentPlayer = last.preState.currentPlayer;
        this.gameOver = false;
        this.winner = null;

        if (this.moveHistory.length > 0) {
            this.lastMove = this.moveHistory[this.moveHistory.length - 1].meta;
        } else {
            this.lastMove = null;
        }
        return true;
    }
}
