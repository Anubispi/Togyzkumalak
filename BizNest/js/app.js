class BizNestApp {
    constructor() {
        this.currentView = 'landing';
        this.idea = '';
        this.generatedPrompt = '';
        this.clients = [];
        this.appointments = [];

        this.init();
    }

    init() {
        window.app = this;
        this.render();
    }

    setView(view) {
        this.currentView = view;
        this.render();
        window.scrollTo(0, 0);
    }

    escapeHTML(str) {
        if (!str) return '';
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }

    render() {
        const appDiv = document.getElementById('app');
        if (this.currentView === 'landing') {
            appDiv.innerHTML = this.renderLanding();
        } else {
            appDiv.innerHTML = `
                <div class="flex min-h-screen">
                    ${this.renderSidebar()}
                    <main class="flex-1 p-8 bg-slate-50">
                        ${this.renderCurrentDashboardView()}
                    </main>
                </div>
            `;
        }
    }

    renderLanding() {
        return `
            <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <nav class="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                    <div class="text-2xl font-black text-blue-600 tracking-tighter flex items-center space-x-2">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">BN</div>
                        <span>${t('brand')}</span>
                    </div>
                    <div class="hidden md:flex space-x-10 font-semibold text-slate-600">
                        <a href="#features" class="hover:text-blue-600 transition">${t('features')}</a>
                        <a href="#" class="hover:text-blue-600 transition">${t('pricing')}</a>
                        <a href="#" class="hover:text-blue-600 transition">${t('about')}</a>
                    </div>
                    <div class="flex items-center space-x-6">
                        <select onchange="setLanguage(this.value)" class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold focus:outline-none shadow-sm cursor-pointer">
                            <option value="ru" ${currentLang === 'ru' ? 'selected' : ''}>RU</option>
                            <option value="kz" ${currentLang === 'kz' ? 'selected' : ''}>KZ</option>
                        </select>
                        <button onclick="app.setView('dashboard')" class="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                            ${t('start_btn')}
                        </button>
                    </div>
                </nav>

                <header class="max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center">
                    <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-bounce">
                        <i class="fas fa-sparkles"></i>
                        <span>Новое поколение автоматизации бизнеса</span>
                    </div>
                    <h1 class="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900">
                        ${t('hero_title').split(' ').slice(0, -1).join(' ')} <span class="text-blue-600">${t('hero_title').split(' ').slice(-1)}</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl leading-relaxed">
                        ${t('hero_subtitle')}
                    </p>
                    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <button onclick="app.setView('dashboard')" class="bg-blue-600 text-white px-12 py-5 rounded-2xl text-xl font-black hover:bg-blue-700 transition shadow-2xl shadow-blue-200 transform hover:-translate-y-1">
                            ${t('start_btn')} <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                        <button class="bg-white text-slate-900 border-2 border-slate-100 px-12 py-5 rounded-2xl text-xl font-black hover:bg-slate-50 transition transform hover:-translate-y-1">
                            Смотреть демо
                        </button>
                    </div>

                    <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition duration-500">
                        <div class="flex items-center justify-center space-x-2 text-2xl font-bold"><i class="fab fa-whatsapp"></i> <span>WhatsApp</span></div>
                        <div class="flex items-center justify-center space-x-2 text-2xl font-bold"><i class="fab fa-instagram"></i> <span>Instagram</span></div>
                        <div class="flex items-center justify-center space-x-2 text-2xl font-bold"><i class="fab fa-telegram"></i> <span>Telegram</span></div>
                        <div class="flex items-center justify-center space-x-2 text-2xl font-bold"><i class="fas fa-comment-dots"></i> <span>Messenger</span></div>
                    </div>
                </header>

                <section id="features" class="max-w-7xl mx-auto px-8 py-32">
                    <div class="text-center mb-20">
                        <h2 class="text-4xl md:text-5xl font-black mb-6">Всё, что нужно для роста</h2>
                        <p class="text-xl text-slate-500">Замените десятки сервисов одной платформой BizNest</p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="group p-10 rounded-[32px] bg-white border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl transition duration-500">
                            <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition duration-500">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3 class="text-2xl font-black mb-4">${t('ai_assistant')}</h3>
                            <p class="text-slate-600 text-lg leading-relaxed">${t('ai_desc')}</p>
                            <ul class="mt-8 space-y-3 text-slate-500 font-medium">
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Ответы за 2 секунды</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Продажа ваших услуг</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Сбор контактов</li>
                            </ul>
                        </div>
                        <div class="group p-10 rounded-[32px] bg-white border border-slate-100 hover:border-green-200 shadow-sm hover:shadow-2xl transition duration-500">
                            <div class="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition duration-500">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 class="text-2xl font-black mb-4">${t('crm_title')}</h3>
                            <p class="text-slate-600 text-lg leading-relaxed">${t('crm_desc')}</p>
                            <ul class="mt-8 space-y-3 text-slate-500 font-medium">
                                <li><i class="fas fa-check text-green-500 mr-2"></i> История переписки</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Статусы сделок</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Учет платежей</li>
                            </ul>
                        </div>
                        <div class="group p-10 rounded-[32px] bg-white border border-slate-100 hover:border-purple-200 shadow-sm hover:shadow-2xl transition duration-500">
                            <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition duration-500">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <h3 class="text-2xl font-black mb-4">${t('booking_title')}</h3>
                            <p class="text-slate-600 text-lg leading-relaxed">${t('booking_desc')}</p>
                            <ul class="mt-8 space-y-3 text-slate-500 font-medium">
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Визуальное расписание</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Напоминания клиентам</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i> Аналитика занятости</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <footer class="bg-slate-900 text-slate-400 py-16">
                    <div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
                        <div class="text-2xl font-black text-white mb-8 md:mb-0">${t('brand')}</div>
                        <div class="flex space-x-8 mb-8 md:mb-0">
                            <a href="#" class="hover:text-white transition">Политика конфиденциальности</a>
                            <a href="#" class="hover:text-white transition">Условия использования</a>
                        </div>
                        <div class="flex space-x-6 text-xl">
                            <i class="fab fa-instagram hover:text-white cursor-pointer"></i>
                            <i class="fab fa-telegram hover:text-white cursor-pointer"></i>
                            <i class="fab fa-whatsapp hover:text-white cursor-pointer"></i>
                        </div>
                    </div>
                    <div class="text-center mt-12 text-sm">
                        &copy; 2024 BizNest. Все права защищены.
                    </div>
                </footer>
            </div>
        `;
    }

    renderSidebar() {
        const menuItems = [
            { id: 'dashboard', icon: 'fas fa-th-large', label: t('nav_dashboard') },
            { id: 'crm', icon: 'fas fa-users', label: t('nav_crm') },
            { id: 'calendar', icon: 'fas fa-calendar-alt', label: t('nav_calendar') },
            { id: 'settings', icon: 'fas fa-cog', label: t('nav_settings') }
        ];

        return `
            <aside class="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div class="p-6 text-2xl font-bold text-blue-600 flex items-center space-x-2">
                    <i class="fas fa-nest-egg"></i> <span>${t('brand')}</span>
                </div>
                <nav class="flex-1 px-4 py-4 space-y-2">
                    ${menuItems.map(item => `
                        <button onclick="app.setView('${item.id}')" class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${this.currentView === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}">
                            <i class="${item.icon}"></i>
                            <span class="font-medium">${item.label}</span>
                        </button>
                    `).join('')}
                </nav>
                <div class="p-6 border-t border-slate-100">
                    <button onclick="app.setView('landing')" class="flex items-center space-x-3 text-slate-500 hover:text-slate-800 transition">
                        <i class="fas fa-sign-out-alt"></i>
                        <span class="font-medium">Выход</span>
                    </button>
                </div>
            </aside>
        `;
    }

    renderCurrentDashboardView() {
        switch(this.currentView) {
            case 'dashboard': return this.renderDashboardHome();
            case 'crm': return this.renderCRM();
            case 'calendar': return this.renderCalendar();
            case 'settings': return this.renderSettings();
            default: return this.renderDashboardHome();
        }
    }

    renderDashboardHome() {
        return `
            <div class="max-w-4xl">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-3xl font-black text-slate-900">Создание вашего AI-ассистента</h2>
                    <div class="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button class="px-4 py-1.5 rounded-md text-sm font-bold bg-blue-600 text-white">Универсальный</button>
                        <button class="px-4 py-1.5 rounded-md text-sm font-bold text-slate-500 hover:bg-slate-50">Нишевый</button>
                    </div>
                </div>

                <div class="bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">${t('describe_biz')}</h3>
                            <p class="text-slate-500 text-sm font-medium">${t('describe_biz_sub')}</p>
                        </div>
                    </div>

                    <textarea id="idea-input" class="w-full h-48 p-6 border-2 border-slate-100 rounded-[24px] focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-lg leading-relaxed mb-8 bg-slate-50/50" placeholder="${t('create_idea_placeholder')}">${this.escapeHTML(this.idea)}</textarea>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="p-4 rounded-2xl border-2 border-slate-50 bg-white text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition" onclick="app.setQuickIdea('Стоматология')">🦷 Стоматология</div>
                        <div class="p-4 rounded-2xl border-2 border-slate-50 bg-white text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition" onclick="app.setQuickIdea('Салон красоты')">✂️ Салон красоты</div>
                        <div class="p-4 rounded-2xl border-2 border-slate-50 bg-white text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition" onclick="app.setQuickIdea('Автосервис')">🚗 Автосервис</div>
                        <div class="p-4 rounded-2xl border-2 border-slate-50 bg-white text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition" onclick="app.setQuickIdea('Кофейня')">☕ Кофейня</div>
                    </div>

                    <button onclick="app.generateAssistant()" class="w-full bg-blue-600 text-white py-5 rounded-[24px] text-xl font-black hover:bg-blue-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-blue-200 group">
                        <i class="fas fa-magic group-hover:rotate-12 transition"></i>
                        <span>${t('generate_btn')}</span>
                    </button>
                </div>

                ${this.generatedPrompt ? `
                    <div id="result-panel" class="mt-12 animate-slide-up">
                        <div class="bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border-2 border-green-100">
                            <div class="flex items-center justify-between mb-8">
                                <div class="flex items-center space-x-4">
                                    <div class="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl">
                                        <i class="fas fa-sparkles"></i>
                                    </div>
                                    <div>
                                <h3 class="text-xl font-black text-slate-900">${t('assistant_ready')}</h3>
                                <p class="text-slate-500 text-sm font-medium">${t('assistant_subtitle')}</p>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition"><i class="fas fa-copy"></i></button>
                                    <button class="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition"><i class="fas fa-redo"></i></button>
                                </div>
                            </div>

                            <div class="bg-slate-900 p-8 rounded-[24px] text-blue-300 font-mono text-sm leading-relaxed mb-8 max-h-64 overflow-y-auto border border-slate-800 shadow-inner">
                                <div class="text-slate-500 mb-2">// System Prompt Generated by BizNest</div>
                                ${this.escapeHTML(this.generatedPrompt)}
                            </div>

                            <div class="grid md:grid-cols-2 gap-6">
                                <button onclick="app.showTestChat()" class="bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center justify-center space-x-3">
                                    <i class="fas fa-comment"></i>
                                    <span>${t('test_chat_btn')}</span>
                                </button>
                                <button onclick="app.setView('settings')" class="bg-blue-50 text-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-100 transition flex items-center justify-center space-x-3 border border-blue-100">
                                    <i class="fab fa-telegram"></i>
                                    <span>${t('connect_tg_btn')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- Modal for Test Chat -->
            <div id="test-chat-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
                <div class="bg-white w-full max-w-lg h-[600px] rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-zoom-in">
                    <div class="p-6 bg-slate-900 text-white flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><i class="fas fa-robot"></i></div>
                            <div>
                                <div class="font-bold">BizNest Assistant</div>
                                <div class="text-[10px] text-green-400 font-bold uppercase tracking-widest"><span class="w-2 h-2 bg-green-400 inline-block rounded-full mr-1"></span> Online</div>
                            </div>
                        </div>
                        <button onclick="app.hideTestChat()" class="text-slate-400 hover:text-white transition text-xl"><i class="fas fa-times"></i></button>
                    </div>
                    <div id="chat-messages" class="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
                        <div class="flex justify-start">
                            <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-slate-700">
                                Здравствуйте! Я ваш новый AI-ассистент. Чем я могу помочь вашему бизнесу сегодня?
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-white border-t border-slate-100">
                        <div class="flex space-x-2">
                            <input id="chat-input" type="text" class="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Напишите сообщение...">
                            <button onclick="app.sendChatMessage()" class="bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-blue-700 transition shadow-lg shadow-blue-200"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCRM() {
        if (this.clients.length === 0) {
            this.clients = [
                { id: 1, name: "Арман Ибрагимов", phone: "+7 701 123 45 67", status: "Новый", service: "Консультация", date: "2024-05-20" },
                { id: 2, name: "Елена Смирнова", phone: "+7 777 987 65 43", status: "В работе", service: "Запись на прием", date: "2024-05-19" },
                { id: 3, name: "Марат Оспанов", phone: "+7 702 555 00 11", status: "Завершено", service: "Повторная продажа", date: "2024-05-18" }
            ];
        }

        return `
            <div class="max-w-6xl">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-3xl font-black text-slate-900">${t('nav_crm')}</h2>
                    <button class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition flex items-center space-x-2 shadow-lg shadow-blue-100">
                        <i class="fas fa-plus"></i>
                        <span>${t('add_client')}</span>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                        <div class="text-slate-500 text-sm font-bold uppercase mb-2">${t('stats_leads')}</div>
                        <div class="text-3xl font-black text-slate-900">${this.clients.length}</div>
                    </div>
                    <div class="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                        <div class="text-slate-500 text-sm font-bold uppercase mb-2">${t('stats_new')}</div>
                        <div class="text-3xl font-black text-blue-600">1</div>
                    </div>
                    <div class="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100">
                        <div class="text-slate-500 text-sm font-bold uppercase mb-2">${t('stats_conv')}</div>
                        <div class="text-3xl font-black text-green-600">68%</div>
                    </div>
                </div>

                <div class="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="bg-slate-50 border-b border-slate-100">
                                <th class="px-8 py-4 text-sm font-bold text-slate-500 uppercase">${t('table_client')}</th>
                                <th class="px-8 py-4 text-sm font-bold text-slate-500 uppercase">${t('table_service')}</th>
                                <th class="px-8 py-4 text-sm font-bold text-slate-500 uppercase">${t('table_status')}</th>
                                <th class="px-8 py-4 text-sm font-bold text-slate-500 uppercase">${t('table_date')}</th>
                                <th class="px-8 py-4 text-sm font-bold text-slate-500 uppercase">${t('table_actions')}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${this.clients.map(client => `
                                <tr class="hover:bg-slate-50/50 transition">
                                    <td class="px-8 py-6">
                                        <div class="font-bold text-slate-900">${client.name}</div>
                                        <div class="text-sm text-slate-500">${client.phone}</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="text-slate-700 font-medium">${client.service}</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span class="px-3 py-1 rounded-full text-xs font-bold ${
                                            client.status === 'Новый' ? 'bg-blue-100 text-blue-700' :
                                            client.status === 'В работе' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }">${client.status}</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="text-slate-500 text-sm">${client.date}</div>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="flex space-x-2">
                                            <button class="p-2 text-slate-400 hover:text-blue-600 transition"><i class="fas fa-edit"></i></button>
                                            <button class="p-2 text-slate-400 hover:text-green-600 transition"><i class="fab fa-whatsapp"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderCalendar() {
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

        return `
            <div class="max-w-6xl">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-3xl font-black text-slate-900">${t('nav_calendar')}</h2>
                    <div class="flex space-x-4">
                        <button class="bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition"><i class="fas fa-chevron-left mr-2"></i> Май 2024</button>
                        <button class="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">Записать клиента</button>
                    </div>
                </div>

                <div class="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div class="grid grid-cols-8 border-b border-slate-100">
                        <div class="p-4 bg-slate-50 border-r border-slate-100"></div>
                        ${days.map(day => `
                            <div class="p-4 bg-slate-50 text-center font-bold text-slate-500 uppercase text-xs tracking-widest border-r border-slate-100 last:border-r-0">${day}</div>
                        `).join('')}
                    </div>

                    <div class="max-h-[600px] overflow-y-auto">
                        ${times.map(time => `
                            <div class="grid grid-cols-8 border-b border-slate-50 last:border-b-0">
                                <div class="p-4 text-xs font-bold text-slate-400 text-right bg-slate-50/30 border-r border-slate-100">${time}</div>
                                ${Array(7).fill(0).map((_, i) => `
                                    <div class="p-2 border-r border-slate-50 last:border-r-0 min-h-[80px] relative hover:bg-blue-50/30 transition cursor-pointer group">
                                        ${(time === '10:00' && i === 1) ? `
                                            <div class="absolute inset-2 bg-blue-500 text-white p-2 rounded-xl text-[10px] font-bold shadow-md shadow-blue-200 z-10">
                                                <div class="truncate">Арман И.</div>
                                                <div>Консультация</div>
                                            </div>
                                        ` : ''}
                                        ${(time === '14:00' && i === 3) ? `
                                            <div class="absolute inset-2 bg-purple-500 text-white p-2 rounded-xl text-[10px] font-bold shadow-md shadow-purple-200 z-10">
                                                <div class="truncate">Елена С.</div>
                                                <div>Маникюр</div>
                                            </div>
                                        ` : ''}
                                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                            <i class="fas fa-plus-circle text-blue-300 text-xl"></i>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSettings() {
        return `
            <div class="max-w-4xl">
                <h2 class="text-3xl font-black text-slate-900 mb-8">${t('nav_settings')}</h2>

                <div class="space-y-6">
                    <!-- Telegram Integration -->
                    <div class="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
                                    <i class="fab fa-telegram"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold">Telegram Bot</h3>
                                    <p class="text-slate-500 text-sm font-medium">Подключение вашего ассистента к Telegram</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">Активен</span>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Bot Token</label>
                                <div class="flex space-x-2">
                                    <input type="password" placeholder="Введите ваш Bot Token" class="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                    <button class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- WhatsApp Integration -->
                    <div class="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 opacity-60">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl">
                                    <i class="fab fa-whatsapp"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold">WhatsApp Business</h3>
                                    <p class="text-slate-500 text-sm font-medium">Интеграция через официальный API</p>
                                </div>
                            </div>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Подключить</button>
                        </div>
                    </div>

                    <!-- Instagram Integration -->
                    <div class="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 opacity-60">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center text-2xl">
                                    <i class="fab fa-instagram"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold">Instagram DMs</h3>
                                    <p class="text-slate-500 text-sm font-medium">Автоматические ответы в директ</p>
                                </div>
                            </div>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Подключить</button>
                        </div>
                    </div>

                    <!-- AI Model Settings -->
                    <div class="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                        <h3 class="text-xl font-bold mb-6 flex items-center space-x-3">
                            <i class="fas fa-brain text-purple-600"></i>
                            <span>Настройки нейросети</span>
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="p-4 rounded-2xl border-2 border-blue-500 bg-blue-50 cursor-pointer">
                                <div class="font-bold text-blue-600">Claude 3.5 Sonnet</div>
                                <div class="text-xs text-blue-400 font-medium italic">Самая умная модель</div>
                            </div>
                            <div class="p-4 rounded-2xl border-2 border-slate-50 hover:border-blue-200 transition cursor-pointer">
                                <div class="font-bold text-slate-700">Gemini 1.5 Pro</div>
                                <div class="text-xs text-slate-400 font-medium italic">Быстрая и точная</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setQuickIdea(val) {
        const input = document.getElementById('idea-input');
        if (input) {
            input.value = `Я открываю ${val.toLowerCase()}. Мне нужен ассистент, который будет отвечать на вопросы клиентов, записывать их на свободное время и рассказывать о наших акциях.`;
            this.idea = input.value;
        }
    }

    generateAssistant() {
        const input = document.getElementById('idea-input').value;
        if (!input) return;
        this.idea = input;

        /**
         * TODO: Integrate with backend API (Gemini or Claude)
         * Example:
         * const response = await fetch('/api/generate-prompt', {
         *   method: 'POST',
         *   body: JSON.stringify({ idea: this.idea })
         * });
         */

        // Симуляция генерации промпта
        this.generatedPrompt = `ROLE: Professional Business Assistant
CONTEXT: ${input}
GOALS:
1. Provide instant, accurate support to customers.
2. Qualify leads by asking for name and phone number.
3. Book appointments into the CRM.
4. Maintain a helpful, professional, and efficient tone.
LANGUAGE: Support both Russian and Kazakh based on user input.`;

        this.render();
    }

    showTestChat() {
        const modal = document.getElementById('test-chat-modal');
        if (modal) modal.classList.remove('hidden');
    }

    hideTestChat() {
        const modal = document.getElementById('test-chat-modal');
        if (modal) modal.classList.add('hidden');
    }

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const container = document.getElementById('chat-messages');
        if (!input || !input.value) return;

        const userMsg = input.value;
        input.value = '';

        // Add user message
        const userDiv = document.createElement('div');
        userDiv.className = 'flex justify-end animate-fade-in';
        userDiv.innerHTML = `
            <div class="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-md max-w-[80%]">
                ${this.escapeHTML(userMsg)}
            </div>
        `;
        container.appendChild(userDiv);

        // Simulate AI thinking and response
        setTimeout(() => {
            container.innerHTML += `
                <div class="flex justify-start animate-fade-in">
                    <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-slate-700">
                        <i class="fas fa-circle-notch fa-spin mr-2 opacity-50"></i> Ассистент печатает...
                    </div>
                </div>
            `;
            container.scrollTop = container.scrollHeight;

            setTimeout(() => {
                container.lastElementChild.remove();
                const aiDiv = document.createElement('div');
                aiDiv.className = 'flex justify-start animate-fade-in';
                const bizName = this.idea.split(' ')[2] || 'BizNest';
                aiDiv.innerHTML = `
                    <div class="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-slate-700">
                        Принято! Как ассистент вашего бизнеса "${this.escapeHTML(bizName)}", я готов ответить на любой вопрос по этой теме. Что вас интересует?
                    </div>
                `;
                container.appendChild(aiDiv);
                container.scrollTop = container.scrollHeight;
            }, 1000);
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BizNestApp();
});
