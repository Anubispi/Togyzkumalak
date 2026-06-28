const learningPuzzles = [
    {
        id: 1,
        type: "move",
        setup: (game) => {
            game.board = Array(18).fill(0);
            game.board[0] = 2; // Human hole 1
            game.board[10] = 1; // AI hole 2 (index 10)
        },
        goal: "capture",
        target: 2,
        hint: {
            kk: "№1 отаудан жүріңіз, соңғы құмалақ №2 отауға түсіп, оны жұп қылады.",
            ru: "Ходите из лунки №1, чтобы последний камень попал в лунку №2 и сделал её четной.",
            en: "Move from hole №1 so the last stone falls into hole №2 making it even."
        }
    },
    {
        id: 2,
        type: "move",
        setup: (game) => {
            game.board = Array(18).fill(0);
            game.board[4] = 5;
            game.board[13] = 2;
        },
        goal: "tuzdyq",
        hint: {
            kk: "Соңғы құмалақ қарсыластың отауында 3 құмалақ жинауы керек.",
            ru: "Последний камень должен довести количество камней в лунке соперника до 3.",
            en: "The last stone must bring the count in the opponent's hole to exactly 3."
        }
    }
];

class LearningManager {
    constructor() {
        this.hearts = parseInt(localStorage.getItem('togyz_hearts')) || 5;
        this.lastHeartRegen = parseInt(localStorage.getItem('togyz_last_heart')) || Date.now();
        this.currentPuzzleIndex = 0;
        this.isLearningMode = false;

        this.init();
    }

    init() {
        this.updateHeartsUI();
        setInterval(() => this.regenHearts(), 60000); // Check every minute
    }

    regenHearts() {
        if (this.hearts < 5) {
            const now = Date.now();
            const elapsed = now - this.lastHeartRegen;
            const regenPeriod = 30 * 60 * 1000; // 30 minutes per heart

            if (elapsed >= regenPeriod) {
                const newHearts = Math.floor(elapsed / regenPeriod);
                this.hearts = Math.min(5, this.hearts + newHearts);
                this.lastHeartRegen = now;
                this.save();
                this.updateHeartsUI();
            }
        }
    }

    useHeart() {
        if (this.hearts > 0) {
            this.hearts--;
            if (this.hearts === 4) this.lastHeartRegen = Date.now();
            this.save();
            this.updateHeartsUI();
            return true;
        }
        return false;
    }

    save() {
        localStorage.setItem('togyz_hearts', this.hearts);
        localStorage.setItem('togyz_last_heart', this.lastHeartRegen);
    }

    updateHeartsUI() {
        const heartsContainer = document.getElementById('hearts-container');
        if (heartsContainer) {
            heartsContainer.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('span');
                heart.innerText = i < this.hearts ? '❤️' : '🖤';
                heart.className = 'text-xl mr-1';
                heartsContainer.appendChild(heart);
            }
        }
    }

    startLearning() {
        this.isLearningMode = true;
        this.loadPuzzle(0);
    }

    loadPuzzle(index) {
        if (index >= learningPuzzles.length) {
            alert(i18n.currentLang === 'kk' ? "Құттықтаймыз! Барлық тапсырмалар орындалды." : "Поздравляем! Все задания выполнены.");
            this.isLearningMode = false;
            return;
        }
        this.currentPuzzleIndex = index;
        const puzzle = learningPuzzles[index];
        window.uiController.game.reset();
        puzzle.setup(window.uiController.game);
        window.uiController.renderAll();

        // Show hint
        const intentText = document.getElementById('intent-text');
        intentText.innerText = puzzle.hint[i18n.currentLang];
    }

    checkPuzzleSuccess(moveIdx) {
        if (!this.isLearningMode) return;

        const puzzle = learningPuzzles[this.currentPuzzleIndex];
        const game = window.uiController.game;
        const lastMove = game.lastMove;

        let success = false;
        if (puzzle.goal === "capture" && lastMove.captures >= puzzle.target) success = true;
        if (puzzle.goal === "tuzdyq" && lastMove.isTuzdyq) success = true;

        if (success) {
            alert(i18n.currentLang === 'kk' ? "Дұрыс! Келесі тапсырма." : "Правильно! Следующее задание.");
            this.loadPuzzle(this.currentPuzzleIndex + 1);
        } else {
            if (!this.useHeart()) {
                alert(i18n.currentLang === 'kk' ? "Энергия бітті! Күте тұрыңыз." : "Энергия закончилась! Подождите восстановления.");
                this.isLearningMode = false;
                window.uiController.resetGame();
            } else {
                alert(i18n.currentLang === 'kk' ? "Қате! Тағы байқап көріңіз." : "Ошибка! Попробуйте еще раз.");
                this.loadPuzzle(this.currentPuzzleIndex);
            }
        }
    }
}

const learningManager = new LearningManager();
