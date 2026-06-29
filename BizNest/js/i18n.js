const translations = {
    ru: {
        brand: "BizNest",
        hero_title: "Ваш бизнес на автопилоте с AI",
        hero_subtitle: "Создайте AI-ассистента для WhatsApp, Instagram и Telegram за 5 минут. CRM и онлайн-запись уже внутри.",
        start_btn: "Начать работу",
        features: "Возможности",
        pricing: "Тарифы",
        about: "О нас",
        ai_assistant: "AI-Ассистент",
        ai_desc: "Отвечает клиентам, принимает заявки и записывает на услуги 24/7.",
        crm_title: "Простая CRM",
        crm_desc: "Учет клиентов, оплат и напоминаний без лишних сложностей.",
        booking_title: "Онлайн-запись",
        booking_desc: "Удобный календарь и автоматические уведомления для клиентов.",
        create_idea_placeholder: "Опишите вашу идею бизнеса (например: Стоматология 'Улыбка', лечим зубы без боли...)",
        generate_btn: "Создать ассистента",
        nav_dashboard: "Дашборд",
        nav_crm: "CRM",
        nav_calendar: "Календарь",
        nav_settings: "Настройки",
        add_client: "Добавить клиента",
        stats_leads: "Всего лидов",
        stats_new: "Новые заявки",
        stats_conv: "Конверсия",
        table_client: "Клиент",
        table_service: "Услуга",
        table_status: "Статус",
        table_date: "Дата",
        table_actions: "Действия",
        assistant_ready: "Интеллект настроен!",
        assistant_subtitle: "Ваш ассистент готов к работе",
        test_chat_btn: "Протестировать в чате",
        connect_tg_btn: "Подключить Telegram",
        describe_biz: "Опишите ваш бизнес",
        describe_biz_sub: "Чем подробнее описание, тем умнее будет ассистент"
    },
    kz: {
        brand: "BizNest",
        hero_title: "AI көмегімен бизнесіңізді автопилотқа қойыңыз",
        hero_subtitle: "5 минут ішнде WhatsApp, Instagram және Telegram үшін AI-ассистент жасаңыз. CRM және онлайн-жазылу жүйесі қосылған.",
        start_btn: "Жұмысты бастау",
        features: "Мүмкіндіктер",
        pricing: "Тарифтер",
        about: "Біз туралы",
        ai_assistant: "AI-Ассистент",
        ai_desc: "Клиенттерге жауап береді, өтінімдер қабылдайды және 24/7 жазуды жүзеге асырады.",
        crm_title: "Қарапайым CRM",
        crm_desc: "Клиенттерді, төлемдерді және ескертулерді артық қиындықсыз есепке алу.",
        booking_title: "Онлайн-жазылу",
        booking_desc: "Ыңғайлы күнтізбе және клиенттерге арналған автоматты хабарламалар.",
        create_idea_placeholder: "Бизнес идеяңызды сипаттаңыз (мысалы: 'Күлкі' стоматологиясы, тістерді ауыртпай емдейміз...)",
        generate_btn: "Ассистентті жасау",
        nav_dashboard: "Дашборд",
        nav_crm: "CRM",
        nav_calendar: "Күнтізбе",
        nav_settings: "Баптаулар",
        add_client: "Клиент қосу",
        stats_leads: "Барлық лидтер",
        stats_new: "Жаңа өтінімдер",
        stats_conv: "Конверсия",
        table_client: "Клиент",
        table_service: "Қызмет",
        table_status: "Мәртебе",
        table_date: "Күні",
        table_actions: "Әрекеттер",
        assistant_ready: "Интеллект бапталды!",
        assistant_subtitle: "Сіздің ассистентіңіз жұмысқа дайын",
        test_chat_btn: "Чатта тексеру",
        connect_tg_btn: "Telegram-ды қосу",
        describe_biz: "Бизнесіңізді сипаттаңыз",
        describe_biz_sub: "Сипаттама неғұрлым егжей-тегжейлі болса, ассистент соғұрлым ақылды болады"
    }
};

let currentLang = 'ru';

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    if (window.app) window.app.render();
}
