'use client';

import React, { useState, useEffect } from 'react';
import AsideNavbar from './components/AsideNavbar';

// Твої переклади (залишаю без змін скорочено для прикладу, встав повний об'єкт сюди)
const translations = {
  en: {
    status: "Status: Coming Soon",
    online: "Players Online:",
    heroTitle1: "New Era",
    heroTitle2: "Starts Today",
    heroDesc: "A space where fantasies become reality.",
    heroSub: "Simple vanilla mechanics. Just you and the world.",
    joinDiscord: "Join Discord",
    newsTitle: "LATEST NEWS",
    newsSubtitle: "Stay updated with server events.",
    discordTitle: "Discord Server Opened",
    discordDesc: "The official server is now live. Join to find a team.",
    telegramTitle: "Telegram Channel",
    telegramDesc: "All announcements and dev logs are now on your phone.",
    serversTitle: "GAME",
    serversTitleHighlight: "MODES",
    serverName: "Survival & Exploration",
    serverDesc: "Classic survival. Explore mechanics, build your home, survive the night. No complex mods, just the game as it is.",
    playNow: "Play Now",
    miniName: "Mini-Games",
    miniDesc: "Under development. We are working on something fun, but it needs time.",
    comingSoon: "Coming Soon",
    footerTitle: "Your adventure begins here.",
    footerSub: "Don't miss the start."
  },
  ru: {
    status: "Статус: Скоро Запуск",
    online: "Игроков Онлайн:",
    heroTitle1: "Новая Эра",
    heroTitle2: "Начинается Сегодня",
    heroDesc: "Пространство, где фантазии становятся реальностью.",
    heroSub: "Простые ванильные механики. Только ты и мир.",
    joinDiscord: "В Discord",
    newsTitle: "ПОСЛЕДНИЕ НОВОСТИ",
    newsSubtitle: "Будь в курсе событий сервера.",
    discordTitle: "Discord Открыт",
    discordDesc: "Официальный сервер работает. Заходи найти команду.",
    telegramTitle: "Telegram Канал",
    telegramDesc: "Все анонсы и новости разработки в твоем телефоне.",
    serversTitle: "ИГРОВЫЕ",
    serversTitleHighlight: "РЕЖИМЫ",
    serverName: "Выживание и Исследование",
    serverDesc: "Классическое выживание. Изучай механики, строй дом, переживи ночь. Никаких сложных модов, просто игра как она есть.",
    playNow: "Играть Сейчас",
    miniName: "Мини-игры",
    miniDesc: "В разработке. Мы работаем над этим, но нужно время.",
    comingSoon: "Скоро",
    footerTitle: "Твое приключение начинается здесь.",
    footerSub: "Не пропусти старт."
  },
  ua: {
    status: "Статус: Скоро Запуск",
    online: "Гравців Онлайн:",
    heroTitle1: "Нова Ера",
    heroTitle2: "Починається Сьогодні",
    heroDesc: "Простір, де фантазії стають реальністю.",
    heroSub: "Прості ванільні механіки. Тільки ти і світ.",
    joinDiscord: "У Discord",
    newsTitle: "ОСТАННІ НОВИНИ",
    newsSubtitle: "Будь в курсі подій сервера.",
    discordTitle: "Discord Відкрито",
    discordDesc: "Офіційний сервер працює. Заходь знайти команду.",
    telegramTitle: "Telegram Канал",
    telegramDesc: "Всі анонси та новини розробки у твоєму телефоні.",
    serversTitle: "ІГРОВІ",
    serversTitleHighlight: "РЕЖИМИ",
    serverName: "Виживання та Дослідження",
    serverDesc: "Класічне виживання. Вивчай механіки, будуй дім, переживи ніч. Ніяких складних модів, просто гра як вона є.",
    playNow: "Грати Зараз",
    miniName: "Міні-ігри",
    miniDesc: "У розробці. Ми працюємо над цим, але потрібно більше часу.",
    comingSoon: "Скоро",
    footerTitle: "Твоя пригода починається тут.",
    footerSub: "Не пропусти старт."
  },
  be: {
    status: "Статус: Хутка Запуск",
    online: "Гульцоў Анлайн:",
    heroTitle1: "Новая Эра",
    heroTitle2: "Пачынаецца Сёння",
    heroDesc: "Прастора, дзе фантазіі становяцца рэальнасцю.",
    heroSub: "Простыя ванільныя механікі. Толькі ты і свет.",
    joinDiscord: "У Discord",
    newsTitle: "АПОШНІЯ НАВІНЫ",
    newsSubtitle: "Будзь у курсе падзей сервера.",
    discordTitle: "Discord Адкрыты",
    discordDesc: "Афіцыйны сервер працуе. Заходзь знайсці каманду.",
    telegramTitle: "Telegram Канал",
    telegramDesc: "Усе анонсы і навіны распрацоўкі ў тваім тэлефоне.",
    serversTitle: "ГУЛЬНЁВЫЯ",
    serversTitleHighlight: "РЭЖЫМЫ",
    serverName: "Выжыванне і Даследаванне",
    serverDesc: "Класічнае выжыванне. Вывучай механікі, будуй дом, перажыві ноч. Ніякіх складаных модаў, проста гульня як яна ёсць.",
    playNow: "Гуляць Зараз",
    miniName: "Міні-гульні",
    miniDesc: "У распрацоўцы. Мы працуем над гэтым, але патрэбен час.",
    comingSoon: "Хутка",
    footerTitle: "Твая прыгода пачынаецца тут.",
    footerSub: "Не прапусці старт."
  }
};

type Language = 'en' | 'ua' | 'ru' | 'be';

export default function Home() {
  const [lang, setLang] = useState<Language>('ru'); 
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const fetchDiscordOnline = async () => {
      try {
        const GUILD_ID = '1444370880686981142'; 
        if (GUILD_ID === '1444370880686981142') return; // Заглушка з твого коду
        const response = await fetch(`https://discord.com/api/guilds/${GUILD_ID}/widget.json`);
        const data = await response.json();
        if (data && data.presence_count) setOnlineCount(data.presence_count);
      } catch (error) { console.error(error); }
    };
    fetchDiscordOnline();
  }, []);

  const changeLang = (l: Language) => setLang(l);
  
  const handleCopyEmail = () => {
    const email = "admin@hytale.ru"; 
    navigator.clipboard.writeText(email).then(() => alert(`Email copied: ${email}`)).catch(console.error);
  };

  return (
    <div className={`w-full min-[960px]:pl-[5vw] transition-all duration-300`}>
      <AsideNavbar lang={lang} />

      {/* LANGUAGE SWITCHER */}
      {/* Адаптація: на мобільному він менший і трохи нижче через Header */}
      <div className="fixed top-20 right-4 min-[960px]:top-8 min-[960px]:right-8 z-40 glass-card px-4 py-2 min-[960px]:px-6 min-[960px]:py-3 rounded-full flex gap-3 min-[960px]:gap-4 text-[14px] min-[960px]:text-[20px] font-bold tracking-widest text-gray-400">
        {(['ru', 'en', 'ua', 'be'] as Language[]).map((l, index, arr) => (
            <React.Fragment key={l}>
                <button onClick={() => changeLang(l)} className={`hover:text-white transition-colors ${lang === l ? 'text-hytale-accent' : ''}`}>
                    {l.toUpperCase()}
                </button>
                {index < arr.length - 1 && <span className="w-[1px] bg-white/20"></span>}
            </React.Fragment>
        ))}
      </div>

      {/* --- HERO SECTION --- */}
      <header 
        id="home" 
        className="h-screen flex flex-col justify-center relative px-6 min-[960px]:px-24 overflow-hidden"
        style={{
           backgroundImage: `linear-gradient(to right, rgba(11, 15, 25, 0.4) 0%, rgba(11, 15, 25, 0.2) 100%), url('/bg-content.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
        }}
      >
        <div className="max-w-6xl z-10 animate-fade-in-up mt-20 min-[960px]:mt-0">
          <div className="mb-6 min-[960px]:mb-10 inline-flex items-center gap-4 border-l-4 border-hytale-accent pl-4 min-[960px]:pl-6 bg-black/40 backdrop-blur-sm py-2 pr-6">
            <span className="text-[16px] min-[960px]:text-[24px] font-bold tracking-[0.2em] text-hytale-accent uppercase">
              {t.status}
            </span>
          </div>
          
          {onlineCount !== null && (
            <div className="mb-6 min-[960px]:mb-8 flex items-center gap-2 animate-fade-in-up delay-75">
               <span className="w-2 h-2 min-[960px]:w-3 min-[960px]:h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
               <span className="text-[16px] min-[960px]:text-[20px] font-mono text-gray-300 tracking-wider">
                  {t.online} <span className="text-white font-bold">{onlineCount}</span>
               </span>
            </div>
          )}

          <h1 className="text-[40px] min-[960px]:text-[110px] font-display font-black text-white mb-6 min-[960px]:mb-8 leading-[0.9] uppercase drop-shadow-2xl">
            {t.heroTitle1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              {t.heroTitle2}
            </span>
          </h1>
          <p className="text-[20px] min-[960px]:text-[36px] text-gray-300 mb-10 min-[960px]:mb-16 max-w-4xl font-light leading-tight drop-shadow-lg">
            {t.heroDesc} <br />
            <span className="text-white font-bold">{t.heroSub}</span>
          </p>
        </div>

        {/* BOTTOM STATUS BAR (Тільки на ПК) */}
        <div className="hidden min-[960px]:flex absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-6 border-t border-white/10 justify-between items-center text-[20px] font-mono text-gray-400">
            <span>SYS.VER. 0.0.1-BETA</span>
            <span>HYPIXEL STUDIOS / FAN PROJECT</span>
            <span>RUSSIAN REGION</span>
        </div>
      </header>

      {/* --- NEWS SECTION --- */}
      <section id="news" className="py-20 min-[960px]:py-32 px-6 min-[960px]:px-24 bg-[#0B0F19] relative border-b border-white/5 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col min-[960px]:flex-row items-start min-[960px]:items-end justify-between mb-12 min-[960px]:mb-24 gap-4 min-[960px]:gap-8 border-b border-white/10 pb-8">
          <h2 className="text-[48px] min-[960px]:text-[96px] font-display font-bold text-white leading-none">{t.newsTitle}</h2>
          <p className="text-[18px] min-[960px]:text-[28px] text-gray-500 max-w-xl min-[960px]:text-right">{t.newsSubtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-8 min-[960px]:gap-12">
          {/* Discord */}
          <article className="glass-card p-8 min-[960px]:p-12 group relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><i className="fab fa-discord text-[120px] min-[960px]:text-[200px] text-[#5865F2]"></i></div>
            <h3 className="text-[32px] min-[960px]:text-[44px] font-bold text-white mb-4 min-[960px]:mb-6 group-hover:text-[#5865F2] transition-colors">{t.discordTitle}</h3>
            <p className="text-gray-300 text-[18px] min-[960px]:text-[28px] mb-6 min-[960px]:mb-10 font-light">{t.discordDesc}</p>
            <a href="https://discord.gg/SMK6CF2Etq" className="text-[20px] min-[960px]:text-[24px] font-bold text-white border-b-2 border-[#5865F2] hover:text-[#5865F2]">Link <i className="fas fa-arrow-right"></i></a>
          </article>
          {/* Telegram */}
          <article className="glass-card p-8 min-[960px]:p-12 group relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><i className="fab fa-telegram text-[120px] min-[960px]:text-[200px] text-[#229ED9]"></i></div>
            <h3 className="text-[32px] min-[960px]:text-[44px] font-bold text-white mb-4 min-[960px]:mb-6 group-hover:text-[#229ED9] transition-colors">{t.telegramTitle}</h3>
            <p className="text-gray-300 text-[18px] min-[960px]:text-[28px] mb-6 min-[960px]:mb-10 font-light">{t.telegramDesc}</p>
            <a href="https://t.me/mphytale" className="text-[20px] min-[960px]:text-[24px] font-bold text-white border-b-2 border-[#229ED9] hover:text-[#229ED9]">Link <i className="fas fa-arrow-right"></i></a>
          </article>
        </div>
      </section>

      {/* --- SERVERS SECTION --- */}
      <section id="servers" className="py-20 min-[960px]:py-32 px-6 min-[960px]:px-24 bg-[#0f1421] relative overflow-hidden min-h-screen flex flex-col justify-center">
        <h2 className="text-[48px] min-[960px]:text-[96px] font-display font-bold text-white mb-12 min-[960px]:mb-24 text-center">
          {t.serversTitle} <span className="text-hytale-accent">{t.serversTitleHighlight}</span>
        </h2>
        <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-12 min-[960px]:gap-16 max-w-7xl mx-auto">
            {/* Card 1 */}
            <div className="glass-card p-8 min-[960px]:p-12 border-t-4 border-hytale-accent flex flex-col relative group">
                <div className="absolute -top-8 min-[960px]:-top-10 left-8 min-[960px]:left-10 w-16 h-16 min-[960px]:w-20 min-[960px]:h-20 bg-black border-2 border-hytale-accent flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.4)] z-10">
                    <i className="fas fa-compass text-[30px] min-[960px]:text-[40px] text-hytale-accent"></i>
                </div>
                <h3 className="text-[32px] min-[960px]:text-[40px] font-bold text-white mt-8 mb-4 min-[960px]:mb-6">{t.serverName}</h3>
                <p className="text-[18px] min-[960px]:text-[24px] text-gray-400 mb-6 min-[960px]:mb-8 font-light leading-relaxed flex-grow">{t.serverDesc}</p>
                <div className="pt-6 min-[960px]:pt-8 border-t border-white/10">
                    <span className="inline-block px-4 py-2 bg-green-900/30 text-green-400 border border-green-500/30 rounded text-sm font-bold tracking-wider uppercase">Online</span>
                </div>
            </div>
             {/* Card 2 */}
            <div className="glass-card p-8 min-[960px]:p-12 border-t-4 border-gray-700 opacity-75 flex flex-col relative grayscale">
                 <div className="absolute -top-8 min-[960px]:-top-10 left-8 min-[960px]:left-10 w-16 h-16 min-[960px]:w-20 min-[960px]:h-20 bg-black border-2 border-gray-600 flex items-center justify-center rounded-lg z-10">
                    <i className="fas fa-lock text-[24px] min-[960px]:text-[30px] text-gray-400"></i>
                </div>
                <h3 className="text-[32px] min-[960px]:text-[40px] font-bold text-gray-300 mt-8 mb-4 min-[960px]:mb-6">{t.miniName}</h3>
                <p className="text-[18px] min-[960px]:text-[24px] text-gray-500 mb-6 min-[960px]:mb-8 font-light leading-relaxed flex-grow">{t.miniDesc}</p>
                <div className="pt-6 min-[960px]:pt-8 border-t border-white/5">
                    <span className="inline-block px-4 py-2 bg-gray-800 text-gray-400 border border-gray-600 rounded text-sm font-bold tracking-wider uppercase">{t.comingSoon}</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 min-[960px]:py-32 bg-[#05080f] border-t border-white/10 px-6 min-[960px]:px-24 min-h-[50vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-12 min-[960px]:gap-24">
          <div>
            <div className="text-[48px] min-[960px]:text-[64px] font-display font-black text-white tracking-widest mb-6 min-[960px]:mb-10 leading-none">
              HYTALE<span className="text-hytale-accent">RU</span>
            </div>
            <p className="text-[20px] min-[960px]:text-[32px] text-gray-500 mb-8 min-[960px]:mb-16 max-w-2xl leading-tight">
              {t.footerTitle} <br /> {t.footerSub}
            </p>
          </div>
          <div className="flex flex-col justify-end items-start min-[960px]:items-end">
            <button onClick={handleCopyEmail} className="text-[32px] min-[960px]:text-[56px] font-bold text-white hover:text-hytale-accent transition-colors mb-4 min-[960px]:mb-6 break-all text-left min-[960px]:text-right leading-none">
              multiplacehytalecontact@gmail.com
            </button>
            <p className="text-[18px] min-[960px]:text-[28px] text-gray-600 uppercase tracking-widest">Administration Contact</p>
          </div>
        </div>
      </section>
    </div>
  );
}