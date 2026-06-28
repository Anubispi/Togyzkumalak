class TogyzkumalakUI {
    constructor() {
        this.game = new TogyzkumalakGame();
        this.ai = new TogyzkumalakAI(1);

        this.isAnimating = false;
        this.selectedHole = -1;
        this.activeTheme = 'wood';
        this.soundEnabled = true;
        this.autoPlayAi = true;

        this.initDomElements();
        this.bindEvents();
        this.loadSettings();
        this.resetGame();
    }

    initDomElements() {
        this.rowP1 = document.getElementById('row-p1');
        this.rowP2 = document.getElementById('row-p2');
        this.kazanP1 = document.getElementById('kazan-p1');
        this.kazanP2 = document.getElementById('kazan-p2');
        this.kazanP1Container = document.getElementById('kazan-p1-container');
        this.kazanP2Container = document.getElementById('kazan-p2-container');

        this.aiThinking = document.getElementById('ai-thinking');
        this.aiIntent = document.getElementById('ai-intent');
        this.intentText = document.getElementById('intent-text');

        this.influenceBar = document.getElementById('influence-bar');
        this.p1Percent = document.getElementById('p1-percent');
        this.p2Percent = document.getElementById('p2-percent');
        this.evaluationChart = document.getElementById('evaluation-chart');

        this.themeSelect = document.getElementById('theme-select');
        this.soundToggle = document.getElementById('sound-toggle');
        this.undoBtn = document.getElementById('undo-btn');
        this.newGameBtn = document.getElementById('new-game-btn');

        this.historyList = document.getElementById('history-list');
        this.replaySlider = document.getElementById('replay-slider');
        this.btnPrev = document.getElementById('btn-prev');
        this.btnPlay = document.getElementById('btn-play');
        this.btnNext = document.getElementById('btn-next');
        this.replayStatus = document.getElementById('replay-status');

        this.rulesModal = document.getElementById('rules-modal');
        this.btnRules = document.getElementById('btn-rules');
        this.btnCloseRules = document.getElementById('btn-close-rules');

        this.animationLayer = document.getElementById('animation-layer');
    }

    bindEvents() {
        this.themeSelect.addEventListener('change', (e) => {
            this.setTheme(e.target.value);
        });

        this.soundToggle.addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            this.soundToggle.classList.toggle('active', this.soundEnabled);
            this.soundToggle.innerText = this.soundEnabled ? i18n.t('soundOn') : i18n.t('soundOff');
            if (this.soundEnabled) gameAudio.playUiClick();
        });

        this.btnRules.addEventListener('click', () => {
            if (this.soundEnabled) gameAudio.playUiClick();
            this.rulesModal.classList.add('open');
        });

        this.btnCloseRules.addEventListener('click', () => {
            if (this.soundEnabled) gameAudio.playUiClick();
            this.rulesModal.classList.remove('open');
        });

        this.rulesModal.addEventListener('click', (e) => {
            if (e.target === this.rulesModal) {
                this.rulesModal.classList.remove('open');
            }
        });

        this.newGameBtn.addEventListener('click', () => {
            if (this.soundEnabled) gameAudio.playUiClick();
            this.resetGame();
        });

        this.undoBtn.addEventListener('click', () => {
            if (this.isAnimating) return;
            if (this.soundEnabled) gameAudio.playUiClick();

            if (this.game.moveHistory.length >= 2) {
                this.game.undo();
                this.game.undo();
                this.renderAll();
                this.updateAnalytics();
            } else if (this.game.moveHistory.length === 1) {
                this.game.undo();
                this.renderAll();
                this.updateAnalytics();
            }
        });

        this.replaySlider.addEventListener('input', (e) => {
            const index = parseInt(e.target.value);
            this.loadReplayState(index);
        });
    }

    loadSettings() {
        const savedDiff = localStorage.getItem('togyz_difficulty');
        this.setDifficulty(savedDiff ? parseInt(savedDiff) : 1);

        const savedTheme = localStorage.getItem('togyz_theme');
        this.setTheme(savedTheme ? savedTheme : 'wood');
        this.themeSelect.value = this.activeTheme;
    }

    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.activeTheme = theme;
        localStorage.setItem('togyz_theme', theme);
    }

    setDifficulty(diff) {
        this.ai.setDifficulty(diff);
        localStorage.setItem('togyz_difficulty', diff);

        for (let i = 1; i <= 3; i++) {
            const badge = document.getElementById(`badge-${i}`);
            if (badge) {
                badge.classList.toggle('active', i === diff);
            }
        }
    }

    resetGame() {
        this.game.reset();
        this.isAnimating = false;

        this.replaySlider.disabled = true;
        this.replaySlider.max = 0;
        this.replaySlider.value = 0;
        this.replayStatus.innerText = i18n.t('replayReady');
        this.btnPrev.disabled = true;
        this.btnPlay.disabled = true;
        this.btnNext.disabled = true;

        this.aiThinking.classList.add('hidden');
        this.aiThinking.classList.remove('flex');
        this.aiIntent.classList.remove('hidden');
        this.intentText.innerText = i18n.t('waitingMove');

        this.buildBoardHoles();
        this.renderAll();
        this.updateAnalytics();
    }

    buildBoardHoles() {
        this.rowP1.innerHTML = '';
        this.rowP2.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            this.rowP1.appendChild(this.createHoleElement(i, 1));
        }

        for (let i = 17; i >= 9; i--) {
            this.rowP2.appendChild(this.createHoleElement(i, 2));
        }
    }

    createHoleElement(idx, owner) {
        const otau = document.createElement('div');
        otau.id = `otau-${idx}`;
        otau.className = `otau-hole`;
        otau.dataset.idx = idx;

        const ghost = document.createElement('div');
        ghost.className = 'ghost-stone-preview';
        otau.appendChild(ghost);

        otau.addEventListener('mouseenter', () => {
            if (this.isAnimating || this.game.gameOver || this.game.currentPlayer !== 1) return;
            if (owner === 1 && this.game.board[idx] > 0) {
                otau.classList.add('valid-hover');
                this.highlightSowPath(idx);
            }
        });

        otau.addEventListener('mouseleave', () => {
            otau.classList.remove('valid-hover');
            this.clearSowPath();
        });

        otau.addEventListener('click', () => {
            this.handlePlayerMove(idx);
        });

        const label = document.createElement('span');
        label.className = `otau-label ${owner === 1 ? 'row-p1-labels' : 'row-p2-labels'}`;
        const otauNum = owner === 1 ? (idx + 1) : (18 - idx);
        label.innerText = `№${otauNum}`;
        otau.appendChild(label);

        return otau;
    }

    highlightSowPath(startIdx) {
        const count = this.game.board[startIdx];
        if (count === 0) return;

        let curr = startIdx;
        let steps = count;

        if (steps > 1) steps--;

        while (steps > 0) {
            curr = (curr + 1) % 18;
            const targetOtau = document.getElementById(`otau-${curr}`);
            if (targetOtau) targetOtau.classList.add('hover-sow-path');
            steps--;
        }
    }

    clearSowPath() {
        document.querySelectorAll('.otau-hole').forEach(el => {
            el.classList.remove('hover-sow-path');
        });
    }

    handlePlayerMove(idx) {
        if (this.isAnimating || this.game.gameOver || this.game.currentPlayer !== 1) return;
        if (idx > 8 || this.game.board[idx] === 0) return;

        this.clearSowPath();
        this.animateAndExecuteMove(idx, () => {
            if (typeof learningManager !== 'undefined' && learningManager.isLearningMode) {
                learningManager.checkPuzzleSuccess(idx);
                return;
            }
            if (this.game.gameOver) {
                this.finalizeGame();
            } else if (this.game.currentPlayer === 2 && this.autoPlayAi) {
                this.triggerAiTurn();
            }
        });
    }

    triggerAiTurn() {
        this.isAnimating = true;
        this.aiThinking.classList.remove('hidden');
        this.aiThinking.classList.add('flex');
        this.aiIntent.classList.add('hidden');

        const thinkTime = 1200 + Math.random() * 800;
        setTimeout(() => {
            const bestMove = this.ai.getBestMove(this.game);
            if (bestMove !== null) {
                this.animateAndExecuteMove(bestMove, () => {
                    this.aiThinking.classList.add('hidden');
                    this.aiThinking.classList.remove('flex');
                    this.aiIntent.classList.remove('hidden');

                    if (this.game.lastMove) {
                        this.updateIntentText(this.game.lastMove);
                    }

                    this.isAnimating = false;
                    if (this.game.gameOver) this.finalizeGame();
                });
            } else {
                this.isAnimating = false;
                this.game.checkGameEnd();
                if (this.game.gameOver) this.finalizeGame();
            }
        }, thinkTime);
    }

    updateIntentText(moveMeta) {
        let text = i18n.currentLang === 'ru' ? "Совершает позиционный ход." : (i18n.currentLang === 'kk' ? "Позициялық жүріс жасауда." : "Making a positional move.");
        const otauNum = moveMeta.startIdx >= 9 ? (18 - moveMeta.startIdx) : (moveMeta.startIdx + 1);

        if (moveMeta.isTuzdyq) {
            if (i18n.currentLang === 'ru') text = `ИИ берет Туздык из лунки №${otauNum}! Это стратегическое преимущество.`;
            else if (i18n.currentLang === 'kk') text = `ИИ №${otauNum} отаудан тұздық алды! Бұл стратегиялық артықшылық.`;
            else text = `AI takes Tuzdyq from hole №${otauNum}! This is a strategic advantage.`;
        } else if (moveMeta.captures > 0) {
            if (i18n.currentLang === 'ru') text = `ИИ захватил ${moveMeta.captures} камней из лунки №${18 - moveMeta.endIdx} в свой казан.`;
            else if (i18n.currentLang === 'kk') text = `ИИ №${18 - moveMeta.endIdx} отаудан ${moveMeta.captures} құмалақ жеңіп алды.`;
            else text = `AI captured ${moveMeta.captures} stones from hole №${18 - moveMeta.endIdx} to its kazan.`;
        } else {
            if (i18n.currentLang === 'ru') text = `ИИ сделал ход из лунки №${otauNum}.`;
            else if (i18n.currentLang === 'kk') text = `ИИ №${otauNum} отаудан жүріс жасады.`;
            else text = `AI made a move from hole №${otauNum}.`;
        }
        this.intentText.innerText = text;
    }

    animateAndExecuteMove(startIdx, onComplete) {
        this.isAnimating = true;
        const initialStonesCount = this.game.board[startIdx];

        const success = this.game.makeMove(startIdx);
        if (!success) {
            this.isAnimating = false;
            if (onComplete) onComplete();
            return;
        }

        const moveMeta = this.game.lastMove;
        const steps = moveMeta.sowSteps;

        if (this.soundEnabled) {
            gameAudio.playSowSequence(steps.length);
        }

        const startOtau = document.getElementById(`otau-${startIdx}`);
        this.renderHoleStones(startIdx, initialStonesCount > 1 ? 1 : 0);

        let stepIndex = 0;

        const animateStep = () => {
            if (stepIndex >= steps.length) {
                this.renderAll();
                this.updateAnalytics();

                if (this.soundEnabled) {
                    if (moveMeta.isTuzdyq) gameAudio.playTuzdyq();
                    else if (moveMeta.captures > 0) gameAudio.playCapture();
                }

                this.isAnimating = false;
                if (onComplete) onComplete();
                return;
            }

            const step = steps[stepIndex];
            const targetIdx = step.index;
            const targetEl = step.destination === 'kazan'
                ? (step.owner === 1 ? this.kazanP1 : this.kazanP2)
                : document.getElementById(`otau-${targetIdx}`);

            if (!targetEl) {
                stepIndex++;
                animateStep();
                return;
            }

            const flyingStone = document.createElement('div');
            flyingStone.className = `flying-kumalak ${moveMeta.player === 1 ? 'p1-stone' : 'p2-stone'}`;

            const startRect = startOtau.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();

            const startX = startRect.left + startRect.width / 2 - 7;
            const startY = startRect.top + startRect.height / 2 - 7;
            const targetX = targetRect.left + targetRect.width / 2 - 7;
            const targetY = targetRect.top + targetRect.height / 2 - 7;

            flyingStone.style.left = `${startX}px`;
            flyingStone.style.top = `${startY}px`;
            this.animationLayer.appendChild(flyingStone);

            requestAnimationFrame(() => {
                flyingStone.style.left = `${targetX}px`;
                flyingStone.style.top = `${targetY}px`;
            });

            setTimeout(() => {
                flyingStone.remove();
                if (step.destination === 'hole') {
                    const currentStonesInDOM = targetEl.querySelectorAll('.kumalak-stone').length;
                    this.renderHoleStones(targetIdx, currentStonesInDOM + 1);
                } else {
                    const kazanScoreEl = step.owner === 1 ? this.kazanP1 : this.kazanP2;
                    kazanScoreEl.innerText = parseInt(kazanScoreEl.innerText) + 1;
                }
                stepIndex++;
                animateStep();
            }, 180);
        };

        animateStep();
    }

    renderAll() {
        for (let i = 0; i < 18; i++) {
            this.renderHole(i);
        }

        this.kazanP1.innerText = this.game.kazan[0];
        this.kazanP2.innerText = this.game.kazan[1];

        this.kazanP1Container.classList.toggle('active-glow', this.game.currentPlayer === 1 && !this.game.gameOver);
        this.kazanP2Container.classList.toggle('active-glow', this.game.currentPlayer === 2 && !this.game.gameOver);

        document.querySelectorAll('.last-move-indicator').forEach(el => el.remove());
        if (this.game.lastMove) {
            const endIdx = this.game.lastMove.endIdx;
            const hole = document.getElementById(`otau-${endIdx}`);
            if (hole) {
                const p = document.createElement('div');
                p.className = 'last-move-indicator';
                hole.appendChild(p);
            }
        }

        this.undoBtn.disabled = this.game.moveHistory.length === 0;
        this.renderHistory();
    }

    renderHole(idx) {
        const otau = document.getElementById(`otau-${idx}`);
        if (!otau) return;

        otau.querySelectorAll('.kumalak-stone, .stone-count-badge, .key-move-badge').forEach(e => e.remove());

        otau.classList.remove('tuzdyq-gold', 'tuzdyq-red');
        if (this.game.tuzdyq[0] === idx) otau.classList.add('tuzdyq-gold');
        else if (this.game.tuzdyq[1] === idx) otau.classList.add('tuzdyq-red');

        const count = this.game.board[idx];
        this.renderHoleStones(idx, count);

        const canMove = !this.game.gameOver && this.game.currentPlayer === 1 && idx < 9 && count > 0;
        otau.classList.toggle('disabled', !canMove);
    }

    renderHoleStones(idx, count) {
        const otau = document.getElementById(`otau-${idx}`);
        if (!otau) return;

        otau.querySelectorAll('.kumalak-stone, .stone-count-badge').forEach(e => e.remove());

        const owner = idx < 9 ? 1 : 2;
        const maxStonesToDraw = 6;
        const drawCount = Math.min(count, maxStonesToDraw);

        for (let j = 0; j < drawCount; j++) {
            const stone = document.createElement('div');
            stone.className = `kumalak-stone ${owner === 1 ? 'p1-stone' : 'p2-stone'}`;

            stone.style.width = '13px';
            stone.style.height = '13px';

            const angle = (j / Math.max(drawCount, 1)) * 2 * Math.PI + (idx * 0.4);
            const radius = drawCount === 1 ? 0 : 10 + Math.random() * 4;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            stone.style.left = `${x}%`;
            stone.style.top = `${y}%`;
            stone.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

            otau.appendChild(stone);
        }

        if (count > 0) {
            const badge = document.createElement('span');
            badge.className = 'stone-count-badge';
            badge.innerText = count;
            otau.appendChild(badge);
        }
    }

    renderHistory() {
        this.historyList.innerHTML = '';
        if (this.game.moveHistory.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'text-xs text-[var(--text-secondary)] opacity-60 italic text-center py-4';
            empty.innerText = i18n.t('noMoves');
            this.historyList.appendChild(empty);
            return;
        }
        this.game.moveHistory.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `history-item ${item.meta.player === 1 ? 'p1-move' : 'p2-move'}`;

            const playerLabel = item.meta.player === 1 ? i18n.t('you') : i18n.t('ai');
            const startHole = item.meta.player === 1 ? (item.move + 1) : (18 - item.move);
            const endHole = item.meta.player === 1 ? (18 - item.meta.endIdx) : (item.meta.endIdx + 1);

            let moveWord = i18n.currentLang === 'ru' ? "Ход" : (i18n.currentLang === 'kk' ? "Жүріс" : "Move");
            let actionText = `${moveWord} ${index + 1}: ${playerLabel} (${startHole} ➔ ${endHole})`;
            if (item.meta.isTuzdyq) actionText += i18n.currentLang === 'ru' ? " [Туздык!]" : (i18n.currentLang === 'kk' ? " [Тұздық!]" : " [Tuzdyq!]");
            else if (item.meta.captures > 0) actionText += ` (+${item.meta.captures})`;

            const labelSpan = document.createElement('span');
            labelSpan.innerText = actionText;
            div.appendChild(labelSpan);

            div.style.cursor = 'pointer';
            div.addEventListener('click', () => this.loadReplayState(index + 1));
            this.historyList.appendChild(div);
        });
        this.historyList.scrollTop = this.historyList.scrollHeight;
    }

    updateAnalytics() {
        let p1Score = this.game.kazan[0];
        let p2Score = this.game.kazan[1];

        for (let i = 0; i < 9; i++) p1Score += this.game.board[i] * 0.4;
        for (let i = 9; i < 18; i++) p2Score += this.game.board[i] * 0.4;

        const total = p1Score + p2Score;
        const p1Pct = total > 0 ? (p1Score / total) * 100 : 50;

        this.influenceBar.style.width = `${p1Pct}%`;
        this.p1Percent.innerText = `${Math.round(p1Pct)}%`;
        this.p2Percent.innerText = `${Math.round(100 - p1Pct)}%`;

        this.drawEvaluationChart();
    }

    drawEvaluationChart() {
        const history = this.game.moveHistory;
        if (history.length === 0) {
            const noDataMsg = i18n.currentLang === 'ru' ? "Нет данных для графика" : (i18n.currentLang === 'kk' ? "График үшін мәліметтер жоқ" : "No data for chart");
            this.evaluationChart.innerHTML = `<text x="50%" y="55%" text-anchor="middle" fill="var(--text-secondary)" font-size="12px" opacity="0.6">${noDataMsg}</text>`;
            return;
        }

        const width = this.evaluationChart.clientWidth || 300;
        const height = this.evaluationChart.clientHeight || 120;
        const padding = 15;

        const evalPoints = [0];
        history.forEach(step => {
            const p1Val = step.postState.kazan[0];
            const p2Val = step.postState.kazan[1];
            const diff = p1Val - p2Val;
            const norm = Math.max(-100, Math.min(100, (diff / 25) * 100));
            evalPoints.push(norm);
        });

        const stepX = (width - padding * 2) / Math.max(1, evalPoints.length - 1);
        const midY = height / 2;

        let pathD = "";
        let pointsString = "";

        evalPoints.forEach((val, idx) => {
            const x = padding + idx * stepX;
            const y = midY - (val / 100) * (height / 2 - padding);

            if (idx === 0) pathD += `M ${x} ${y}`;
            else pathD += ` L ${x} ${y}`;
            pointsString += `<circle cx="${x}" cy="${y}" r="3" fill="var(--accent-color)" />`;
        });

        this.evaluationChart.innerHTML = `
            <line x1="${padding}" y1="${midY}" x2="${width - padding}" y2="${midY}" stroke="var(--text-secondary)" stroke-dasharray="3,3" opacity="0.4" />
            <text x="${padding}" y="${padding + 8}" fill="#2e7d32" font-size="9px" font-weight="700">Вы +</text>
            <text x="${padding}" y="${height - padding}" fill="#c62828" font-size="9px" font-weight="700">ИИ +</text>
            <path d="${pathD}" fill="none" stroke="var(--accent-color)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            ${pointsString}
        `;
    }

    finalizeGame() {
        let msg = i18n.currentLang === 'ru' ? "Ничья!" : (i18n.currentLang === 'kk' ? "Тең ойын!" : "Draw!");
        if (this.game.winner === 1) {
            msg = i18n.currentLang === 'ru' ? "Вы победили!" : (i18n.currentLang === 'kk' ? "Сіз жеңдіңіз!" : "You won!");
            if (this.soundEnabled) gameAudio.playVictory();
        } else if (this.game.winner === 2) {
            msg = i18n.currentLang === 'ru' ? "Победа ИИ!" : (i18n.currentLang === 'kk' ? "ИИ жеңді!" : "AI won!");
            if (this.soundEnabled) gameAudio.playDefeat();
        }

        const gameFinishedText = i18n.currentLang === 'ru' ? "Игра завершена." : (i18n.currentLang === 'kk' ? "Ойын аяқталды." : "Game finished.");
        const finalScoreText = i18n.currentLang === 'ru' ? "Итоговый счёт:" : (i18n.currentLang === 'kk' ? "Қорытынды есеп:" : "Final score:");

        this.replayStatus.innerText = `${gameFinishedText} ${msg} ${finalScoreText} ${this.game.kazan[0]} - ${this.game.kazan[1]}.`;

        const gameOverWord = i18n.currentLang === 'ru' ? "Игра окончена" : (i18n.currentLang === 'kk' ? "Ойын аяқталды" : "Game over");
        this.intentText.innerText = `${gameOverWord}: ${msg}`;

        this.replaySlider.disabled = false;
        this.replaySlider.max = this.game.moveHistory.length;
        this.replaySlider.value = this.game.moveHistory.length;

        this.btnPrev.disabled = false;
        this.btnPlay.disabled = false;
        this.btnNext.disabled = false;

        this.flagKeyMoves();
    }

    flagKeyMoves() {
        this.game.moveHistory.forEach(item => {
            if (item.meta.captures > 5 || item.meta.isTuzdyq) {
                const hole = document.getElementById(`otau-${item.meta.endIdx}`);
                if (hole && !hole.querySelector('.key-move-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'key-move-badge';
                    badge.title = "Ключевой ход в этой лунке!";
                    hole.appendChild(badge);
                }
            }
        });
    }

    stepReplay(dir) {
        let nextIdx = parseInt(this.replaySlider.value) + dir;
        nextIdx = Math.max(0, Math.min(nextIdx, this.game.moveHistory.length));
        this.replaySlider.value = nextIdx;
        this.loadReplayState(nextIdx);
    }

    loadReplayState(index) {
        if (index === 0) {
            this.game.board = Array(18).fill(9);
            this.game.kazan = [0, 0];
            this.game.tuzdyq = [-1, -1];
            this.game.lastMove = null;
            this.renderAll();
            this.replayStatus.innerText = i18n.currentLang === 'ru' ? "Начало партии." : (i18n.currentLang === 'kk' ? "Партияның басы." : "Start of the game.");
            return;
        }

        const stateObj = this.game.moveHistory[index - 1];
        this.game.board = [...stateObj.postState.board];
        this.game.kazan = [...stateObj.postState.kazan];
        this.game.tuzdyq = [...stateObj.postState.tuzdyq];
        this.game.lastMove = stateObj.meta;
        this.renderAll();

        const playerLabel = stateObj.meta.player === 1 ? i18n.t('you') : i18n.t('ai');
        const startHole = stateObj.meta.player === 1 ? (stateObj.move + 1) : (18 - stateObj.move);

        let moveWord = i18n.currentLang === 'ru' ? "Ход" : (i18n.currentLang === 'kk' ? "Жүріс" : "Move");
        let fromHoleWord = i18n.currentLang === 'ru' ? "из лунки" : (i18n.currentLang === 'kk' ? "отаудан" : "from hole");
        let scoreWord = i18n.currentLang === 'ru' ? "Счёт:" : (i18n.currentLang === 'kk' ? "Есеп:" : "Score:");

        this.replayStatus.innerText = `${moveWord} ${index}/${this.game.moveHistory.length}: ${playerLabel} ${fromHoleWord} №${startHole}. ${scoreWord} ${this.game.kazan[0]} - ${this.game.kazan[1]}`;
    }

    playReplay() {
        if (this.isAnimating) return;
        let curr = parseInt(this.replaySlider.value);
        if (curr >= this.game.moveHistory.length) {
            this.replaySlider.value = 0;
            this.loadReplayState(0);
        }
        this.btnPlay.innerText = "Pause";
        this.btnPlay.onclick = () => this.pauseReplay();

        this.replayInterval = setInterval(() => {
            let val = parseInt(this.replaySlider.value);
            if (val < this.game.moveHistory.length) {
                this.stepReplay(1);
            } else {
                this.pauseReplay();
            }
        }, 1000);
    }

    pauseReplay() {
        clearInterval(this.replayInterval);
        this.btnPlay.innerText = "Play";
        this.btnPlay.onclick = () => this.playReplay();
    }
}

// Initialize UI controller on DOM load
window.addEventListener('DOMContentLoaded', () => {
    window.uiController = new TogyzkumalakUI();
});
