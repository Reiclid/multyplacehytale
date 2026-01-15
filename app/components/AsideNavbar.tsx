'use client'
import React, { useState, useEffect } from "react";

type Language = 'en' | 'ua' | 'ru' | 'be';

interface AsideProps {
    lang?: Language;
}

interface NavItemProps {
    href: string;
    icon: string;
    text: string;
    activeSection: string;
    id: string;
    onClick?: () => void;
}

const navTranslations = {
    en: { home: 'HOME', news: 'NEWS', servers: 'SERVERS', contact: 'CONTACT' },
    ru: { home: 'ГЛАВНАЯ', news: 'НОВОСТИ', servers: 'СЕРВЕРЫ', contact: 'КОНТАКТЫ' },
    ua: { home: 'ГОЛОВНА', news: 'НОВИНИ', servers: 'СЕРВЕРИ', contact: 'КОНТАКТИ' },
    be: { home: 'ГАЛОЎНАЯ', news: 'НАВІНЫ', servers: 'СЕРВЕРЫ', contact: 'КАНТАКТЫ' }
};

const AsideNavbar: React.FC<AsideProps> = ({ lang = 'en' }) => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const currentLang = lang || 'en';
    const t = navTranslations[currentLang] || navTranslations.en;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        const sections = document.querySelectorAll('header, section');
        sections.forEach((section) => { if (section.id) observer.observe(section); });

        return () => {
            sections.forEach((section) => { if (section.id) observer.unobserve(section); });
        };
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* ================= DESKTOP SIDEBAR (> 960px) ================= */}
            <aside className="hidden min-[960px]:flex fixed left-0 top-0 h-screen w-[5vw] hover:w-1/6 bg-[#0B0F19] border-r border-white/10 transition-all duration-300 ease-out z-50 group overflow-hidden overflow-y-auto flex-col justify-between py-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                
                {/* LOGO AREA */}
                <div className="flex items-center justify-center h-[2vw] mb-8 whitespace-nowrap">
                    <div className="flex items-center gap-6 pl-[1.4vw] w-full transition-transform duration-300">
                        <span className="text-[1.6vw] font-black tracking-widest text-white opacity-0 group-hover:opacity-100 transform transition-all duration-300 delay-100">
                            Multi<span className="text-green-500">Place</span>
                        </span>
                    </div>
                </div>

                {/* NAV */}
                <nav className="flex-1 w-full">
                    <ul className="flex flex-col gap-4 h-full">
                        <NavItem href="#home" id="home" activeSection={activeSection} icon="fa-home" text={t.home} />
                        <NavItem href="#news" id="news" activeSection={activeSection} icon="fa-newspaper" text={t.news} />
                        <NavItem href="#servers" id="servers" activeSection={activeSection} icon="fa-server" text={t.servers} />
                        <NavItem href="#contact" id="contact" activeSection={activeSection} icon="fa-envelope" text={t.contact} />
                    </ul>
                </nav>

                {/* FOOTER ICONS - BRAND COLORS ON HOVER */}
                <div className="flex flex-col items-center gap-6 mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Discord Blue Hover */}
                    <a href="https://discord.gg/SMK6CF2Etq" className="hover:text-[#5865F2] transition-colors"><i className="hover:text-[#5865F2] fab fa-discord text-[2vw] text-white"></i></a>
                    {/* Telegram Blue Hover */}
                    <a href="https://t.me/mphytale" className="hover:text-[#229ED9] transition-colors"><i className="hover:text-[#229ED9] fab fa-telegram text-[2vw] text-white"></i></a>
                </div>
            </aside>


            {/* ================= MOBILE HEADER (< 960px) ================= */}
            <div className="min-[960px]:hidden fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg">
                 <span className="text-[20px] font-black tracking-widest text-white">
                    Multi<span className="text-green-500">Place</span>
                </span>
                
                <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {/* MOBILE FULLSCREEN MENU OVERLAY */}
            <div className={`fixed inset-0 bg-[#0B0F19] z-40 flex flex-col items-center justify-center transition-transform duration-300 min-[960px]:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <nav className="flex flex-col gap-8 text-center">
                    <MobileNavItem href="#home" text={t.home} onClick={toggleMenu} />
                    <MobileNavItem href="#news" text={t.news} onClick={toggleMenu} />
                    <MobileNavItem href="#servers" text={t.servers} onClick={toggleMenu} />
                    <MobileNavItem href="#contact" text={t.contact} onClick={toggleMenu} />
                </nav>
                <div className="mt-12 flex gap-8">
                      {/* Brand colors for mobile menu too */}
                      <a href="https://discord.gg/SMK6CF2Etq" className="text-white text-3xl hover:text-[#5865F2]"><i className="fab fa-discord"></i></a>
                      <a href="https://t.me/mphytale" className="text-white text-3xl hover:text-[#229ED9]"><i className="fab fa-telegram"></i></a>
                </div>
            </div>
        </>
    );
};

// NavItem Component
const NavItem: React.FC<NavItemProps> = ({ href, id, activeSection, icon, text }) => {
    const isActive = activeSection === id;
    return (
        <li className="h-[6vw] overflow-hidden">
            <a href={href} className={`flex items-center h-full pl-[1.4vw] gap-[3vw] transition-colors relative overflow-hidden 
            ${isActive ? 'text-white bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                <span className={`absolute left-0 top-0 h-full w-1 bg-green-500 shadow-[0_0_15px_#22c55e] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></span>
                
                <div className="w-[2vw] text-center shrink-0">
                    <i className={`fas ${icon} text-[1.5vw] min-[960px]:text-[2vw] transition-all duration-300 ${isActive ? 'text-green-500 scale-110 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]' : ''}`}></i>
                </div>
                <span className={`text-[1.4vw] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transform transition-all duration-300 delay-75 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {text}
                </span>
            </a>
        </li>
    );
};

const MobileNavItem = ({ href, text, onClick }: { href: string, text: string, onClick: () => void }) => (
    <a href={href} onClick={onClick} className="text-[32px] font-bold text-white hover:text-green-500 tracking-widest uppercase transition-colors">
        {text}
    </a>
);

export default AsideNavbar;