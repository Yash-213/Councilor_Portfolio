import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeSection: string;
  onOpenAdmin: () => void;
  accentMood?: 'saffron' | 'emerald' | 'navy';
  onToggleMood?: (mood: 'saffron' | 'emerald' | 'navy') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { language, toggleLanguage, t } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home', icon: 'home' },
    { name: t('nav.about'), href: '#about', icon: 'person' },
    { name: t('nav.works'), href: '#works', icon: 'construction' },
    { name: t('nav.flowchart'), href: '#flowchart', icon: 'account_tree' },
    { name: t('nav.news'), href: '#news', icon: 'campaign' },
    { name: t('nav.initiatives'), href: '#initiatives', icon: 'groups' },
    { name: t('nav.grievance'), href: '#grievance', icon: 'report_problem' },
    { name: t('nav.gallery'), href: '#gallery', icon: 'photo_library' },
    { name: t('nav.map'), href: '#map', icon: 'map' },
    { name: t('nav.contact'), href: '#contact', icon: 'mail' },
  ];

  return (
    <header
      id="main-fixed-header-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] border-b border-gray-200/80'
          : 'bg-[#FFFCF7]/95 backdrop-blur-md border-b border-gray-200/60'
      }`}
    >
      {/* 1. Ultra-smooth Scroll Progress Bar with Animated Shimmer Glow */}
      <div className="h-[3px] w-full bg-gray-100 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FFAE33] to-[#168447] shadow-[0_0_8px_rgba(255,133,0,0.5)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 2. Top Urgent Announcement & Live Status Strip (Adjusted cleanly without color circles) */}
      <div className="bg-[#0F172A] text-white text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Urgent Civic Announcement with Pulsing Live Beacon */}
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-extrabold px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase shrink-0 tracking-wider shadow-xs animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              {t('alert.tag')}
            </span>
            <span className="truncate text-slate-200 font-medium">
              {t('alert.text')}
            </span>
          </div>

          {/* Right: Circular link + Helpline + Admin Login */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#news"
              className="text-[#FF8500] hover:text-white font-bold underline transition-colors hidden sm:inline"
            >
              {t('alert.btn')}
            </a>

            {/* Live Helpline Badge */}
            <a
              href="tel:02185222008"
              className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white font-mono text-[10px] transition-colors border-l border-slate-800 pl-2.5"
              title="Ward 8 Jal Desk Hotline"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>02185-222008</span>
            </a>

            {/* Admin Console Lock Button with Animated Hover Tilt */}
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[9px] sm:text-[10px] font-mono border-l border-slate-700 pl-2.5 cursor-pointer transition-colors active:scale-95 group/admin"
              title="Admin & Developer Console"
            >
              <span className="material-symbols-outlined text-[13px] text-[#FF8500] group-hover/admin:rotate-12 transition-transform duration-300">
                lock
              </span>
              <span>ADMIN</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand Identity with Guaranteed Visibility & Animated Glowing Ring */}
        <a
          id="nav-brand-link"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          href="#home"
        >
          {/* Animated Avatar Ring with Live Dual Ping Beacon */}
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-full p-[2px] bg-gradient-to-tr from-[#FF6B00] via-[#FFAE33] to-[#168447] shadow-[0_0_12px_rgba(255,133,0,0.35)] group-hover:shadow-[0_0_20px_rgba(255,133,0,0.65)] group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center text-white font-extrabold text-xs sm:text-sm tracking-wider">
              MK
            </div>
            {/* Live Indicator Beacon */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#168447] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#168447] border-2 border-white"></span>
            </span>
          </div>

          {/* Name & Designation - ALWAYS VISIBLE with Smooth Text Hover Animation */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="whitespace-nowrap font-headline font-extrabold text-[#0F172A] text-sm sm:text-base lg:text-[17px] tracking-tight leading-tight group-hover:text-[#FF8500] transition-colors duration-300">
                {t('nav.councillorName')}
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 text-[#DE7200] text-[9px] sm:text-[10px] font-bold shadow-2xs group-hover:border-[#FF8500] transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-pulse"></span>
                {isMr ? 'भाजपा' : 'BJP'}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold whitespace-nowrap leading-tight mt-0.5">
              {t('nav.designation')}
            </span>
          </div>
        </a>

        {/* Center: Desktop Nav Links with Animated Active Indicator & Hover Pill */}
        <nav
          id="desktop-nav-menu"
          className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 h-full text-xs 2xl:text-sm font-semibold text-gray-700"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative px-2.5 py-1.5 2xl:px-3 rounded-xl transition-all duration-200 flex items-center gap-1.5 group/link ${
                  isActive
                    ? 'text-[#FF8500] bg-orange-50/90 font-bold shadow-2xs'
                    : 'text-gray-700 hover:text-[#FF8500] hover:bg-orange-50/40'
                }`}
                href={link.href}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] shadow-[0_0_6px_#FF8500] animate-pulse" />
                )}
                <span>{link.name}</span>

                {/* Animated Bottom Indicator Line on Active/Hover */}
                <span
                  className={`absolute -bottom-1 left-2.5 right-2.5 h-[2px] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FF8500] scale-x-100'
                      : 'bg-[#FF8500]/40 scale-x-0 group-hover/link:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Quick Action Buttons & Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher with Animated Icon Rotation on Hover */}
          <button
            id="language-switcher-btn"
            className="group/lang h-9 sm:h-10 px-3 sm:px-3.5 inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200/90 hover:border-[#FF8500] bg-white text-gray-800 text-xs font-bold transition-all shadow-xs hover:bg-orange-50/60 hover:shadow-[0_0_12px_rgba(255,133,0,0.15)] cursor-pointer active:scale-95"
            onClick={toggleLanguage}
            type="button"
            title="Toggle Language"
          >
            <span className="material-symbols-outlined text-[16px] text-[#FF8500] group-hover/lang:rotate-180 transition-transform duration-500">
              translate
            </span>
            <span className="font-bold tracking-wide">{t('nav.langToggle')}</span>
          </button>

          {/* Quick Action: Register Complaint Button with Shimmer Sweep Animation */}
          <a
            id="nav-quick-grievance-btn"
            className="hidden sm:inline-flex relative overflow-hidden h-9 sm:h-10 px-3.5 sm:px-4 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#E65100] hover:from-[#DE7200] hover:to-[#FF8500] text-white text-xs font-bold shadow-sm hover:shadow-[0_4px_16px_rgba(255,133,0,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 group/btn"
            href="#grievance"
          >
            {/* Shimmer sweep effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            <span className="material-symbols-outlined text-[16px] group-hover/btn:rotate-6 transition-transform">
              report_problem
            </span>
            <span className="relative z-10">{t('nav.submitGrievance')}</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            className="xl:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-gray-200 bg-white text-gray-800 hover:border-[#FF8500] hover:bg-orange-50 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[20px] text-gray-800 transition-transform duration-300">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fade-in max-h-[82vh] overflow-y-auto"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-[#FF8500] font-bold border-l-4 border-[#FF8500]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#FF8500]'
                }`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-gray-400">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#FF8500]"></span>
                )}
              </a>
            );
          })}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <a
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8500] text-white text-xs font-bold active:scale-95 shadow-md transition-transform"
              href="#grievance"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
              <span>{t('nav.submitGrievance')}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[16px] text-[#FF8500]">
                admin_panel_settings
              </span>
              <span>{t('admin.label')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};