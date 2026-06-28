const translations = {
    kk: {
        title: "AI Тоғызқұмалақ",
        subtitle: "Ұлы дала ойыны • ИИ интеллектісі",
        theme: "Тақырып:",
        themeWood: "Классикалық ағаш",
        themeLeather: "Номадтық былғары",
        themeRoyal: "Корольдік алтын",
        soundOn: "Дыбыс: Қосулы",
        soundOff: "Дыбыс: Өшірулі",
        rules: "Ойын ережелері",
        difficulty: "ИИ қиындығы",
        beginner: "Жаңадан бастаушы",
        master: "Шебер",
        grandmaster: "Гроссмейстер",
        newGame: "Жаңа ойын",
        undo: "Жүрісті қайтару",
        aiThinking: "ИИ комбинацияларды есептеуде...",
        waitingMove: "Сіздің жүрісіңізді күтуде...",
        aiKazan: "ИИ қазаны",
        yourKazan: "Сіздің қазаныңыз",
        analytics: "Позиция аналитикасы",
        influence: "Ықпал:",
        you: "Сіз",
        ai: "ИИ",
        advantageChart: "Артықшылық графигі",
        gameReview: "Партияны талдау",
        replayReady: "Ойын аяқталмады. Қайталауды белсендіру үшін партияны аяқтаңыз.",
        history: "Жүрістер тарихы",
        noMoves: "Жүрістер жоқ",
        // Rules
        rulesTitle: "Тоғызқұмалақ ойынының ережелері",
        rulesSection1Title: "1. Ойынның басталуы",
        rulesSection1Text: "Тақтада 18 отау (әр ойыншыда 9-дан) және 2 жинақтаушы қазан орналасқан. Ойын басында әр отауда 9 құмалақтан болады. Ойында барлығы 162 құмалақ бар.",
        rulesSection2Title: "2. Ойын барысы (Тарату)",
        rulesSection2Text: "Ойыншы өз отауларының кез келгенінен барлық құмалақты алып, сағат тіліне қарсы бағытта әр отауға біреуден таратады.",
        rulesSection2List1: "Егер бастапқы отауда 1-ден көп құмалақ болса, 1 құмалақ бастапқы отауда қалады, қалғандары әрі қарай таратылады.",
        rulesSection2List2: "Егер отауда тек 1 құмалақ болса, ол келесі отауға салынады, ал бастапқы отау бос қалады.",
        rulesSection3Title: "3. Құмалақтарды жеңіп алу",
        rulesSection3Text: "Егер соңғы құмалақ қарсыластың отауына түсіп, ондағы құмалақтар саны жұп (2, 4, 6...) болса, сол отаудағы барлық құмалақ жеңіп алынып, сіздің қазаныңызға салынады.",
        rulesSection4Title: "4. Тұздық алу",
        rulesSection4Text: "Егер соңғы құмалақ қарсыластың отауына түсіп, ондағы құмалақтар санын 3-ке жеткізсе, ойыншы бұл отауды өзінің тұздығы деп жариялай алады.",
        rulesSection4List1: "Әр ойыншы ойын бойы тек бір тұздық ала алады.",
        rulesSection4List2: "Қарсыластың 9-шы отауынан тұздық алуға болмайды.",
        rulesSection4List3: "Қарсылас тұздық алған нөмірлес отаудан тұздық алуға болмайды.",
        rulesSection4List4: "Тұздыққа түскен барлық құмалақтар автоматты түрде тұздық иесінің қазанына кетеді.",
        rulesSection5Title: "5. Ойынның аяқталуы және Жеңіс",
        rulesSection5Text: "Қазанына 81-ден астам құмалақ жинаған ойыншы жеңіске жетеді. Егер екеуі де 81 құмалақ жинаса, тең ойын болады. Егер ойыншының жүретін жүрісі қалмаса («атсыз қалу»), қарсыласы тақтада қалған барлық құмалақты өз қазанына жинап алады."
    },
    ru: {
        title: "AI Тоғызқұмалақ",
        subtitle: "Великая степная игра • Интеллект ИИ",
        theme: "Тема:",
        themeWood: "Классическое дерево",
        themeLeather: "Номадская кожа",
        themeRoyal: "Королевское золото",
        soundOn: "Звук: Вкл",
        soundOff: "Звук: Выкл",
        rules: "Правила игры",
        difficulty: "Сложность ИИ",
        beginner: "Новичок",
        master: "Мастер",
        grandmaster: "Гроссмейстер",
        newGame: "Новая игра",
        undo: "Отменить ход",
        aiThinking: "ИИ просчитывает комбинации...",
        waitingMove: "Ожидание вашего хода...",
        aiKazan: "Казан ИИ",
        yourKazan: "Ваш Казан",
        analytics: "Аналитика позиции",
        influence: "Влияние:",
        you: "Вы",
        ai: "ИИ",
        advantageChart: "График преимущества",
        gameReview: "Разбор партии",
        replayReady: "Игра не окончена. Завершите партию для активации повтора.",
        history: "История ходов",
        noMoves: "Нет ходов",
        // Rules
        rulesTitle: "Правила игры Тоғызқұмалақ",
        rulesSection1Title: "1. Начало игры",
        rulesSection1Text: "На доске расположено 18 лунок (отау) — по 9 у каждого игрока, и 2 накопительных казана. В начале игры в каждой лунке находится ровно по 9 камней (кумалак). Всего в игре 162 камня.",
        rulesSection2Title: "2. Ход игры (Рассеивание)",
        rulesSection2Text: "Игрок берет все камни из любой своей лунки и рассеивает их против часовой стрелки по одному в каждую следующую лунку.",
        rulesSection2List1: "Если в начальной лунке было больше 1 камня, то 1 камень оставляется в исходной лунке, а остальные раскладываются далее.",
        rulesSection2List2: "Если в лунке был ровно 1 камень, он просто перекладывается в следующую лунку, оставляя исходную пустой.",
        rulesSection3Title: "3. Захват камней",
        rulesSection3Text: "Если последний камень хода попадает в лунку соперника, и количество камней там становится четным (2, 4, 6...), то все камни из этой лунки захватываются и переносятся в ваш казан.",
        rulesSection4Title: "4. Создание Туздыка (Tuzdyq)",
        rulesSection4Text: "Если последний камень хода падает в лунку соперника и доводит число камней в ней ровно до 3, игрок может объявить эту лунку своим Туздыком.",
        rulesSection4List1: "Каждый игрок может создать только один Туздык за игру.",
        rulesSection4List2: "Нельзя создавать Туздык на 9-й лунке соперника.",
        rulesSection4List3: "Нельзя создавать Туздык на лунке с тем же номером, на котором соперник уже имеет Туздык на вашей стороне.",
        rulesSection4List4: "Любые камни, попавшие в Туздык при посевах, автоматически отправляются в казан владельца Туздыка.",
        rulesSection5Title: "5. Конец игры и Победа",
        rulesSection5Text: "Побеждает тот, кто соберет в свой казан более 81 камня. Если оба собрали по 81 камню, объявляется ничья. Если у игрока не осталось ходов («атсыз қалу»), его соперник собирает все оставшиеся на доске камни в свой казан."
    },
    en: {
        title: "AI Togyzkumalak",
        subtitle: "The Great Steppe Game • AI Intelligence",
        theme: "Theme:",
        themeWood: "Classic Wood",
        themeLeather: "Nomadic Leather",
        themeRoyal: "Royal Gold",
        soundOn: "Sound: On",
        soundOff: "Sound: Off",
        rules: "Game Rules",
        difficulty: "AI Difficulty",
        beginner: "Beginner",
        master: "Master",
        grandmaster: "Grandmaster",
        newGame: "New Game",
        undo: "Undo Move",
        aiThinking: "AI is thinking...",
        waitingMove: "Waiting for your move...",
        aiKazan: "AI Kazan",
        yourKazan: "Your Kazan",
        analytics: "Position Analytics",
        influence: "Influence:",
        you: "You",
        ai: "AI",
        advantageChart: "Advantage Chart",
        gameReview: "Game Review",
        replayReady: "Game not finished. Finish the game to enable replay.",
        history: "Move History",
        noMoves: "No moves",
        // Rules
        rulesTitle: "Togyzkumalak Game Rules",
        rulesSection1Title: "1. Game Setup",
        rulesSection1Text: "The board has 18 holes (otau) — 9 for each player, and 2 storage cauldrons (kazan). At the start, each hole contains 9 stones (kumalak). There are 162 stones in total.",
        rulesSection2Title: "2. Gameplay (Sowing)",
        rulesSection2Text: "A player takes all stones from one of their holes and sows them counter-clockwise, one by one into subsequent holes.",
        rulesSection2List1: "If the starting hole had more than 1 stone, 1 stone is left in the original hole.",
        rulesSection2List2: "If there was only 1 stone, it's moved to the next hole, leaving the original one empty.",
        rulesSection3Title: "3. Capturing Stones",
        rulesSection3Text: "If the last stone falls into an opponent's hole and makes the total count even (2, 4, 6...), all stones from that hole are captured and moved to your kazan.",
        rulesSection4Title: "4. Creating a Tuzdyq",
        rulesSection4Text: "If the last stone falls into an opponent's hole and makes the total count exactly 3, you can claim it as your Tuzdyq.",
        rulesSection4List1: "Each player can have only one Tuzdyq per game.",
        rulesSection4List2: "You cannot create a Tuzdyq on the opponent's 9th hole.",
        rulesSection4List3: "You cannot create a Tuzdyq on a hole number that the opponent already has as a Tuzdyq on your side.",
        rulesSection4List4: "Any stones falling into a Tuzdyq automatically go to its owner's kazan.",
        rulesSection5Title: "5. End of Game",
        rulesSection5Text: "The first player to collect more than 81 stones wins. 81-81 is a draw. If a player has no moves left, the opponent takes all remaining stones on the board."
    }
};

class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('togyz_lang') || 'kk';
        this.init();
    }

    init() {
        this.applyTranslations();
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('togyz_lang', lang);
        this.applyTranslations();
    }

    t(key) {
        return translations[this.currentLang][key] || key;
    }

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.innerText = this.t(key);
        });

        // Update placeholders and titles if needed
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            el.title = this.t(key);
        });
    }
}

const i18n = new I18nManager();
