import React, { useState } from 'react';
import councillorPhoto from '../assets/Politician-img.jpj-1.jpeg';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  accentMood?: 'saffron' | 'emerald' | 'navy';
}

export const Hero: React.FC<HeroProps> = ({ accentMood = 'saffron' }) => {
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const [activeCardTab, setActiveCardTab] = useState<'vision' | 'stats' | 'ward'>('vision');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const tickerItems = isMr
    ? [
        '४८+ विकासकामे पूर्ण',
        '₹४.८२ कोटी प्रभाग निधी विनियोग',
        '२४ तास जलसेवा नियंत्रण कक्ष',
        'पाक्षिक जनसुनावणी नागरिक सभा',
        '९४.६% तक्रार वेळेवर निवारण दर',
        '१००% स्मार्ट एलईडी पथदिवे',
        'शास्त्री नगर १२०० मी. काँक्रीट रस्ता',
        'स्वच्छ व हरित प्रभाग क्र. ८ अकलूज',
      ]
    : [
        '48+ Completed Civic Works',
        '₹4.82 Cr Ward Budget Deployed',
        '24x7 Jal Seva Pressure Monitoring',
        'Alternate Saturday Open Jan Sunwai',
        '94.6% Grievance Resolution SLA',
        '100% Smart LED Streetlight Coverage',
        'Shastri Nagar 1200m Concrete Road',
        'Clean & Green Ward No. 8, Akluj',
      ];

  // Dynamic ambient glow based on selected accent mood
  const glowColors = {
    saffron: 'from-[#FF8500]/25 via-amber-400/20 to-red-500/15',
    emerald: 'from-emerald-500/25 via-green-400/20 to-teal-500/15',
    navy: 'from-blue-600/25 via-indigo-500/20 to-cyan-500/15',
  }[accentMood];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-orange-50/20 via-[#FFFCF7] to-[#F4F5F7] pt-4 sm:pt-6 pb-8 sm:pb-12 border-b border-gray-200/90"
    >
      {/* 1. Ambient Floating Glowing Mesh Orbs (Awwwards / Designer Portfolio Vibe) */}
      <div
        className={`pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-tr ${glowColors} rounded-full blur-3xl opacity-75 animate-float-orbs`}
      ></div>
      <div
        className="pointer-events-none absolute top-1/2 -right-32 w-[480px] h-[480px] bg-gradient-to-bl from-emerald-500/15 via-[#FF8500]/15 to-transparent rounded-full blur-3xl opacity-60 animate-float-slow"
      ></div>

      {/* 2. Subtle Dot-Matrix Tech Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Floating Badge: Live Civic Beacon */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xs text-[11px] font-bold text-gray-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#168447] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#168447]"></span>
            </span>
            <span className="uppercase tracking-wider text-[#FF8500]">
              {isMr ? 'थेट नागरी सेवा मंच' : 'Civic Leadership 2.0'}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">
              {isMr ? 'प्रभाग क्र. ८ अकलूज' : 'Ward No. 8, Akluj'}
            </span>
          </div>

          {/* Prototype Notice Label */}
          <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200/80">
            {t('hero.demoNotice')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ========================================================
              LEFT COLUMN: HERO CONTENT & INTERACTIVE BENTO HUD
              ======================================================== */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            {/* Main Headline with Vibrant Gradient Accents */}
            <h1
              id="hero-main-title"
              className="font-headline font-black text-3xl sm:text-4xl lg:text-[46px] text-[#0F172A] tracking-tight leading-[1.15]"
            >
              {t('hero.titlePre')}
              <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#E65100] bg-clip-text text-transparent underline decoration-[#FF8500]/30 decoration-wavy">
                {t('hero.titleHighlight1')}
              </span>
              {t('hero.titleMid')}
              <span className="bg-gradient-to-r from-[#10B981] via-[#168447] to-[#059669] bg-clip-text text-transparent">
                {t('hero.titleHighlight2')}
              </span>
              {t('hero.titlePost')}
            </h1>

            {/* Subtitle Description with High Readability */}
            <p
              id="hero-description"
              className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal"
            >
              {t('hero.description')}
            </p>

            {/* Interactive Councillor Vision Voice-Note Simulator */}
            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/90 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8500] text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                  title={isPlayingAudio ? 'Pause Voice Statement' : 'Play Councillor Statement'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPlayingAudio ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate flex items-center gap-1.5">
                    <span>{isMr ? 'नगरसेवकांचा संकल्प संदेश' : "Councillor's Public Pledge"}</span>
                    {isPlayingAudio && (
                      <span className="text-[10px] text-[#168447] font-mono animate-pulse">
                        [Playing 0:42]
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {isMr
                      ? '“प्रत्येक घरापर्यंत पाणी, सुरक्षित रस्ते आणि त्वरित समस्या निवारण”'
                      : '"Uninterrupted water, resilient concrete roads, and transparent accountability."'}
                  </p>
                </div>
              </div>

              {/* Animated Sound Equalizer Waves */}
              <div className="flex items-end gap-1 h-6 shrink-0 px-2">
                <span
                  className={`w-1 rounded-full bg-[#FF8500] ${
                    isPlayingAudio ? 'sound-bar-1' : 'h-1.5 opacity-40'
                  }`}
                />
                <span
                  className={`w-1 rounded-full bg-[#168447] ${
                    isPlayingAudio ? 'sound-bar-2' : 'h-3 opacity-40'
                  }`}
                />
                <span
                  className={`w-1 rounded-full bg-[#FF8500] ${
                    isPlayingAudio ? 'sound-bar-3' : 'h-2 opacity-40'
                  }`}
                />
                <span
                  className={`w-1 rounded-full bg-[#0F172A] ${
                    isPlayingAudio ? 'sound-bar-4' : 'h-3.5 opacity-40'
                  }`}
                />
                <span
                  className={`w-1 rounded-full bg-[#168447] ${
                    isPlayingAudio ? 'sound-bar-5' : 'h-1.5 opacity-40'
                  }`}
                />
              </div>
            </div>

            {/* Primary Action Button Cluster */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                id="hero-cta-grievance"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#E65100] hover:from-[#DE7200] hover:to-[#FF8500] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-[0_8px_25px_rgba(255,133,0,0.35)] transition-all duration-300 active:scale-95"
                href="#grievance"
              >
                <span className="material-symbols-outlined text-[18px]">report_problem</span>
                <span>{t('hero.ctaGrievance')}</span>
              </a>

              <a
                id="hero-cta-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-[#0F172A] font-bold text-xs sm:text-sm border border-gray-300 shadow-2xs hover:border-[#168447] hover:text-[#168447] transition-all active:scale-95"
                href="#works"
              >
                <span>{t('hero.ctaWorks')}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>

              <a
                id="hero-cta-flowchart"
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-3.5 rounded-xl bg-[#0F172A] hover:bg-black text-white font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
                href="#flowchart"
              >
                <span className="material-symbols-outlined text-[16px] text-[#FF8500]">
                  account_tree
                </span>
                <span>{isMr ? 'कार्यप्रक्रिया' : 'Workflow'}</span>
              </a>
            </div>

            {/* Quick Indicators Bento HUD */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-200/80">
              {/* Indicator 1 */}
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-[#FF8500] transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-[#FF8500] shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {t('hero.wardLabel')}
                  </p>
                  <p className="font-headline font-extrabold text-[#0F172A] text-xs sm:text-sm truncate">
                    {t('hero.wardVal')}
                  </p>
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-[#168447] transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center text-[#168447] shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">account_balance</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {t('hero.repLabel')}
                  </p>
                  <p className="font-headline font-extrabold text-[#0F172A] text-xs sm:text-sm truncate">
                    {t('hero.repVal')}
                  </p>
                </div>
              </div>

              {/* Indicator 3 with Sparkline */}
              <div className="p-3.5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center text-blue-700 shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">event_repeat</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {t('hero.janSunwaiLabel')}
                  </p>
                  <p className="font-headline font-extrabold text-[#0F172A] text-xs sm:text-sm truncate">
                    {t('hero.janSunwaiVal')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: 3D HOLOGRAPHIC COUNCILLOR SHOWCASE CARD
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              {/* Outer Glowing Backdrop Border */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#FF6B00] via-amber-400 to-[#168447] rounded-3xl blur-xl opacity-40 animate-pulse-subtle"></div>

              {/* Card Container */}
              <div
                id="councillor-profile-card"
                className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-gray-200/80 overflow-hidden"
              >
                {/* Councillor Portrait Frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.3] bg-slate-900 group">
                  <img
                    alt={`${t('hero.councillorTitle')}, ${t('hero.councillorSub')}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={councillorPhoto}
                  />

                  {/* Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/25 to-transparent"></div>

                  {/* Floating Top Left Civic Badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-white text-xs font-bold text-gray-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF8500]"></span>
                    <span>BJP • {t('hero.wardVal')}</span>
                  </div>

                  {/* Floating Top Right SLA Tag */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#168447]/90 text-white backdrop-blur-md shadow-md text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[13px]">verified</span>
                    <span>94.6% Trust SLA</span>
                  </div>

                  {/* Councillor Identity Overlay on Bottom of Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#FF8500] text-white text-[9px] font-extrabold uppercase tracking-wider">
                        {t('hero.electedBadge')}
                      </span>
                      <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        {isMr ? 'सक्रिय जनसंपर्क' : 'Active Duty'}
                      </span>
                    </div>

                    <h2 className="font-headline font-black text-xl sm:text-2xl text-white tracking-tight">
                      {t('hero.councillorTitle')}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-200 font-medium mt-0.5">
                      {t('hero.councillorSub')}
                    </p>
                  </div>
                </div>

                {/* Interactive Card Micro-Tabs: Vision vs Stats vs Jurisdiction */}
                <div className="mt-3 grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-[10px] sm:text-[11px] font-bold text-gray-600">
                  <button
                    type="button"
                    onClick={() => setActiveCardTab('vision')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeCardTab === 'vision'
                        ? 'bg-white text-[#FF8500] shadow-2xs font-extrabold'
                        : 'hover:text-gray-900'
                    }`}
                  >
                    {isMr ? 'ध्येय' : 'Vision'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCardTab('stats')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeCardTab === 'stats'
                        ? 'bg-white text-[#168447] shadow-2xs font-extrabold'
                        : 'hover:text-gray-900'
                    }`}
                  >
                    {isMr ? 'आकडेवारी' : 'Track Record'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCardTab('ward')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeCardTab === 'ward'
                        ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                        : 'hover:text-gray-900'
                    }`}
                  >
                    {isMr ? 'प्रभाग' : 'Jurisdiction'}
                  </button>
                </div>

                {/* Tab Dynamic Content Preview */}
                <div className="mt-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-xs">
                  {activeCardTab === 'vision' && (
                    <div className="space-y-1 animate-fade-in">
                      <div className="flex items-center gap-1.5 font-bold text-gray-800">
                        <span className="material-symbols-outlined text-[16px] text-[#FF8500]">
                          flag
                        </span>
                        <span>{isMr ? 'आदर्श व सुसज्ज प्रभाग संकल्प' : 'Model Civic Ward Mission'}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        {isMr
                          ? 'दर्जेदार काँक्रीट रस्ते, शुद्ध २४ तास पाणीपुरवठा व थेट जनसुनावणीद्वारे लोकाभिमुख प्रशासन.'
                          : 'Modern M30 concrete roads, continuous drinking water pressure, and zero delay public hearings.'}
                      </p>
                    </div>
                  )}

                  {activeCardTab === 'stats' && (
                    <div className="grid grid-cols-2 gap-2 animate-fade-in text-[11px]">
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500 block text-[9px] uppercase font-bold">
                          Works Done
                        </span>
                        <span className="font-extrabold text-[#FF8500] text-sm">48+ Works</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500 block text-[9px] uppercase font-bold">
                          Grievance SLA
                        </span>
                        <span className="font-extrabold text-[#168447] text-sm">94.6% Closed</span>
                      </div>
                    </div>
                  )}

                  {activeCardTab === 'ward' && (
                    <div className="space-y-1 animate-fade-in">
                      <div className="flex items-center gap-1.5 font-bold text-gray-800">
                        <span className="material-symbols-outlined text-[16px] text-blue-600">
                          pin_drop
                        </span>
                        <span>{isMr ? 'प्रभाग क्र. ८, अकलूज नगर परिषद' : 'Ward No. 8, Akluj Nagar Parishad'}</span>
                      </div>
                      <p className="text-[11px] text-gray-600">
                        {isMr
                          ? 'शास्त्री नगर • सेक्टर ४ • संगम चौक • जुने गावठाण • मार्केट कॉलनी'
                          : 'Shastri Nagar • Sector 4 • Sangam Chowk • Old Gaothan • Market Colony'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Secretariat Office Hours & Live Pulse */}
                <div
                  id="councillor-office-hours-status"
                  className="mt-2.5 py-2 px-3 rounded-xl bg-white border border-gray-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5 font-semibold text-gray-700 text-[11px]">
                    <span className="material-symbols-outlined text-[16px] text-[#FF8500]">
                      schedule
                    </span>
                    <span className="truncate">{t('hero.officeHours')}</span>
                  </div>
                  <span className="flex h-2.5 w-2.5 relative shrink-0" title={t('hero.activeDesk')}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#168447] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#168447]"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. RUNNING ANIMATION TICKER BAR (CONTINUOUS LIVE MARQUEE)
            ======================================================== */}
        <div className="mt-8 pt-4 border-t border-gray-200 overflow-hidden relative">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#0F172A] to-slate-800 text-white text-[10px] font-extrabold uppercase tracking-widest shrink-0 shadow-xs z-10 border border-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-ping"></span>
              <span>LIVE CIVIC TICKER</span>
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-1 relative mask-linear">
              <div className="animate-marquee inline-flex items-center gap-8 text-xs font-semibold text-gray-700">
                {tickerItems.concat(tickerItems).map((text, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 hover:text-[#FF8500] transition-colors"
                  >
                    <span className="text-[#FF8500] text-sm">✦</span>
                    <span>{text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
