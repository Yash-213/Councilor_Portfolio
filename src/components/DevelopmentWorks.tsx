import React, { useState, useEffect } from 'react';
import { getStoredWorks } from '../data/civicData';
import { WorkItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { useLanguage } from '../context/LanguageContext';

export const DevelopmentWorks: React.FC = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [transformationMode, setTransformationMode] = useState<'after' | 'before'>('after');
  const [activeSpotlight, setActiveSpotlight] = useState<number>(0);

  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  useEffect(() => {
    setWorks(getStoredWorks());
  }, []);

  const categories = [
    { label: t('works.allTab'), value: 'all', icon: 'apps' },
    { label: t('works.waterTab'), value: 'Water Supply', icon: 'water_drop' },
    { label: t('works.roadsTab'), value: 'Roads & Drainage', icon: 'add_road' },
    { label: t('works.lightsTab'), value: 'Street Lighting', icon: 'lightbulb' },
    { label: t('works.gardensTab'), value: 'Gardens & Spaces', icon: 'park' },
    { label: t('works.sanitationTab'), value: 'Sanitation', icon: 'recycling' },
    { label: t('works.facilitiesTab'), value: 'Public Facilities', icon: 'domain' },
  ];

  const statuses = [
    { label: t('works.statusAll'), value: 'all' },
    { label: t('works.statusCompleted'), value: 'Completed' },
    { label: t('works.statusInProgress'), value: 'In Progress' },
    { label: t('works.statusProposed'), value: 'Proposed' },
  ];

  const getStatusText = (status: string) => {
    if (status === 'Completed') return t('works.statusCompleted');
    if (status === 'In Progress') return t('works.statusInProgress');
    return t('works.statusProposed');
  };

  // Transformation Spotlights Data (Before vs After)
  const spotlightTransformations = [
    {
      titleEn: 'Shastri Nagar 1,200m M-30 Concrete Road & Closed Box Culvert',
      titleMr: 'शास्त्री नगर १,२०० मी. एम-३० काँक्रीट रस्ता व बंदिस्त बॉक्स गटार',
      locationEn: 'Ward No. 8 Main Spine (Near Sangam Chowk)',
      locationMr: 'प्रभाग क्र. ८ मुख्य मार्ग (संगम चौक परिसर)',
      budget: '₹1.85 Cr',
      beforeImg:
        'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
      beforeDescEn:
        'Severely waterlogged unpaved dirt lane with overflowing open drains, causing seasonal monsoon blockages, pedestrian accidents, and mosquito breeding.',
      beforeDescMr:
        'पावसाळ्यात गुडघाभर पाणी साचणारा चिखलमय कच्चा रस्ता, उघड्या गटारांची दुर्गंधी आणि नागरिकांना ये-जा करताना होणारा प्रचंड त्रास.',
      afterImg:
        'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
      afterDescEn:
        'Delivered 1,200-meter dual carriage M-30 reinforced concrete roadway with covered RCC box stormwater culverts, dual-arm LED lights, and designated pedestrian walk.',
      afterDescMr:
        '१,२०० मीटर लांबीचा उच्च दर्जाचा एम-३० काँक्रीट रस्ता, सुरक्षित भूमिगत बंदिस्त गटारे आणि ४२ दुहेरी एलईडी पथदिव्यांसह १००% जलमुक्त मार्ग.',
      metrics: [
        { labelEn: 'Durability', labelMr: 'आयुर्मान', val: '25+ Yrs' },
        { labelEn: 'Drainage Flow', labelMr: 'पाणी निचरा', val: '4,500 L/s' },
        { labelEn: 'Direct Citizens', labelMr: 'लाभार्थी नागरिक', val: '4,200+' },
      ],
    },
    {
      titleEn: 'Jijau Udyan Eco-Park & Open Fitness Gymnasium',
      titleMr: 'जिजाऊ उद्यान हरित पर्यावरण पार्क व ओपन जिम',
      locationEn: 'Sector 4 Green Belt, Ward 8, Akluj',
      locationMr: 'सेक्टर ४ हरित पट्टा, प्रभाग ८, अकलूज',
      budget: '₹68 Lakhs',
      beforeImg:
        'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      beforeDescEn:
        'Barren waste-dumping wasteland prone to unauthorized encroachments, nil night illumination, and zero recreational space for senior citizens and children.',
      beforeDescMr:
        'कचरा व रानटी झुडपांचे साम्राज्य असलेली पडीक जागा, अंधार आणि ज्येष्ठ नागरिक व लहान मुलांसाठी फिरण्यास सुरक्षित जागेचा अभाव.',
      afterImg:
        'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80',
      afterDescEn:
        'Transformed into a vibrant 1.2-acre landscaped civic park with 12 outdoor gym machines, paved 400m rubberized track, native trees, and 100% solar lighting.',
      afterDescMr:
        '१.२ एकर विस्तीर्ण निसर्गरम्य उद्यान, १२ अत्याधुनिक ओपन जिम उपकरणे, ४०० मीटर जॉगिंग ट्रॅक, हिरवळ आणि संपूर्ण सौर ऊर्जा पथदिवे.',
      metrics: [
        { labelEn: 'Green Cover', labelMr: 'हरित क्षेत्र', val: '1.2 Acres' },
        { labelEn: 'Daily Visitors', labelMr: 'दैनंदिन नागरिक', val: '850+ Citizens' },
        { labelEn: 'Solar Lighting', labelMr: 'सौर पथदिवे', val: '100% Solar' },
      ],
    },
  ];

  const currentSpotlight = spotlightTransformations[activeSpotlight];

  const filteredWorks = works.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchStatus = activeStatus === 'all' || item.status === activeStatus;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.titleMr && item.titleMr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  return (
    <section
      id="works"
      className="w-full py-16 sm:py-24 bg-[#FFFCF7] border-t border-b border-gray-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Designer Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-[#FF8500] text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-ping"></span>
              <span>{t('works.label')}</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight">
              {t('works.heading')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
              {t('works.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              id="official-register-badge"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs font-bold shadow-xs hover:border-[#168447] transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#168447] shadow-[0_0_8px_rgba(22,132,71,0.6)]"></span>
              <span>{isMr ? 'अधिकृत सार्वजनिक नोंदवही (C-Audit)' : 'Audited Public Register (C-Audit)'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-mono font-semibold">
              <span className="text-[#FF8500] font-bold">{works.length}</span>
              <span>{isMr ? 'नोंदणीकृत कामे' : 'Registered Works'}</span>
            </span>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 1: INTERACTIVE CIVIC TRANSFORMATION SPOTLIGHT (BEFORE VS AFTER)
            Gives the site an ultra-impressive UI/UX designer portfolio feel!
           ========================================================================= */}
        <div className="mb-14 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-5 sm:p-8 lg:p-10 shadow-2xl border border-slate-700/80 relative overflow-hidden group">
          {/* Ambient Glow in Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8500]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF8500]/25 transition-all duration-700"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#168447]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Spotlight Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/70 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8500] to-amber-600 flex items-center justify-center shadow-lg text-white font-bold">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF8500]">
                      {isMr ? 'थेट परिवर्तन दर्शन' : 'Interactive Civic Transformation'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/40">
                      LIVE COMPARISON
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-lg sm:text-xl text-white">
                    {isMr ? currentSpotlight.titleMr : currentSpotlight.titleEn}
                  </h3>
                </div>
              </div>

              {/* Selector for Spotlight 1 vs 2 */}
              <div className="flex items-center gap-2">
                {spotlightTransformations.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSpotlight(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeSpotlight === idx
                        ? 'bg-white text-[#0F172A] shadow-md scale-105'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {isMr ? `प्रकल्प ०${idx + 1}` : `Project 0${idx + 1}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Spotlight Interactive Viewport */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left / Top: Interactive Image Viewer with Slider / Toggle */}
              <div className="lg:col-span-7">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
                  {/* Image Render */}
                  <img
                    src={
                      transformationMode === 'after'
                        ? currentSpotlight.afterImg
                        : currentSpotlight.beforeImg
                    }
                    alt={
                      transformationMode === 'after'
                        ? 'Delivered Civic Transformation'
                        : 'Before Construction State'
                    }
                    className="w-full h-full object-cover transition-all duration-700 ease-out transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Top Floating State Indicator Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1.5 ${
                        transformationMode === 'after'
                          ? 'bg-emerald-500/90 text-white ring-2 ring-emerald-300'
                          : 'bg-rose-600/90 text-white ring-2 ring-rose-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span>
                        {transformationMode === 'after'
                          ? isMr
                            ? '✅ पूर्ण झालेले परिवर्तन (AFTER)'
                            : '✅ DELIVERED RESULT (AFTER)'
                          : isMr
                          ? '⚠️ जुनी बिकट स्थिती (BEFORE)'
                          : '⚠️ OLD CONDITION (BEFORE)'}
                      </span>
                    </span>
                  </div>

                  {/* Top Right Budget Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="font-mono text-xs font-bold px-3 py-1 bg-black/70 backdrop-blur-md text-amber-300 rounded-lg border border-white/10">
                      {isMr ? 'मंजूर निधी: ' : 'Budget: '}
                      {currentSpotlight.budget}
                    </span>
                  </div>

                  {/* Bottom Interactive Switcher Control Bar */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-white/15 flex items-center justify-between gap-3 shadow-2xl">
                    <div className="text-[11px] text-slate-300 font-medium truncate flex items-center gap-1.5 pl-2">
                      <span className="material-symbols-outlined text-[16px] text-[#FF8500]">
                        pin_drop
                      </span>
                      <span className="truncate">
                        {isMr ? currentSpotlight.locationMr : currentSpotlight.locationEn}
                      </span>
                    </div>

                    {/* Dual Mode Switch Buttons */}
                    <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl shrink-0">
                      <button
                        type="button"
                        onClick={() => setTransformationMode('before')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          transformationMode === 'before'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {isMr ? 'पूर्वीची स्थिती' : 'Before (Old)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTransformationMode('after')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          transformationMode === 'after'
                            ? 'bg-[#168447] text-white shadow-sm ring-1 ring-emerald-300'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {isMr ? 'प्रत्यक्ष निकाल' : 'After (Delivered)'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right / Bottom: Transformation Story & Engineering Impact */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    {isMr ? 'ग्राउंड रिपोर्ट व प्रभाव' : 'GROUND IMPACT REPORT'}
                  </span>
                  <h4 className="text-xl font-headline font-bold text-white mt-1">
                    {transformationMode === 'after'
                      ? isMr
                        ? 'नागरिकांसाठी सुखकर व शाश्वत सुविधा'
                        : 'Engineered for 25-Year Reliability'
                      : isMr
                      ? 'नागरिकांची अनेक वर्षांची गैरसोय व संघर्ष'
                      : 'Severe Waterlogging & Infrastructure Deficit'}
                  </h4>
                  <p className="text-sm text-slate-300 mt-2.5 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
                    {transformationMode === 'after'
                      ? isMr
                        ? currentSpotlight.afterDescMr
                        : currentSpotlight.afterDescEn
                      : isMr
                      ? currentSpotlight.beforeDescMr
                      : currentSpotlight.beforeDescEn}
                  </p>
                </div>

                {/* Impact Metrics HUD */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {currentSpotlight.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-center"
                    >
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {isMr ? m.labelMr : m.labelEn}
                      </div>
                      <div className="font-mono font-bold text-sm sm:text-base text-emerald-400 mt-1">
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Verification Note */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs">
                  <span className="material-symbols-outlined text-[18px] text-emerald-400 shrink-0">
                    verified
                  </span>
                  <span>
                    {isMr
                      ? 'गुणवत्ता नियंत्रण चाचणी व सार्वजनिक सार्वजनिक ऑडिट अहवाल उत्तीर्ण.'
                      : 'Quality Control M-30 cube compression test & municipal audit passed.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FEATURE 2: SEARCH + CATEGORY FILTER CONTROLS + STATUS HUD
           ========================================================================= */}
        <div className="space-y-4 mb-8">
          {/* Top Search + Status Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isMr
                    ? 'प्रकल्प नाव, परिसर किंवा कोड द्वारे शोधा...'
                    : 'Search project by name, lane, or code...'
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs bg-gray-100/80 p-1.5 rounded-xl border border-gray-200">
              {statuses.map((st) => {
                const isActive = activeStatus === st.value;
                return (
                  <button
                    key={st.value}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#172033] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                    }`}
                    onClick={() => setActiveStatus(st.value)}
                    type="button"
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div
            id="works-filters"
            className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              const count =
                cat.value === 'all'
                  ? works.length
                  : works.filter((w) => w.category === cat.value).length;

              return (
                <button
                  key={cat.value}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF8500] to-[#E06E00] text-white shadow-md font-bold'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-50/50 hover:border-orange-200'
                  }`}
                  onClick={() => setActiveCategory(cat.value)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State if Search/Filter finds nothing */}
        {filteredWorks.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
              travel_explore
            </span>
            <p className="text-gray-700 font-bold">
              {isMr ? 'या निकषाशी जुळणारे कोणतेही काम आढळले नाही' : 'No development works match your criteria.'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {isMr ? 'कृपया शोध शब्द किंवा फिल्टर बदलून पहा.' : 'Try adjusting your search query or filter pills.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setActiveStatus('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#172033] text-white text-xs font-bold hover:bg-[#FF8500] transition-colors"
            >
              {isMr ? 'सर्व फिल्टर रीसेट करा' : 'Reset All Filters'}
            </button>
          </div>
        )}

        {/* Works Grid with Modern Glass & Glow Aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredWorks.map((work) => {
            const isCompleted = work.status === 'Completed';
            const isInProgress = work.status === 'In Progress';

            return (
              <div
                key={work.id}
                id={`work-card-${work.id}`}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:border-[#FF8500]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <div>
                  {/* Project Image Frame with Overlaid Badges */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                    <img
                      src={
                        work.image ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuAWU8LBZ-p4hyeHgcjUjM3PH1a1o4zqFLo4YhqmZyy9Z9mPR0F2phhoQHpSACKkViAQt23g4hsxUyshPedpMwl4E5-qIpo0lCoUZsPDujf9P1-gIOmgfH86N8VmQdwzeYvXNKUzOfeZiVLlF_FQbgHFWCPbTDx7gdLmXDeD_yvdPDVLqCEnqZQCbzd_EOU3M3-wQcsSgCFqWzG759x4rViKkz4KgVww-S2kMfHnZJK3WOZCIf304yLPiA'
                      }
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Floating Category Badge Top Left */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#172033] shadow-md border border-white/20">
                        {work.category}
                      </span>
                    </div>

                    {/* Floating Status Badge Top Right */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isInProgress
                            ? 'bg-[#FF8500] text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCompleted
                              ? 'bg-white'
                              : isInProgress
                              ? 'bg-white animate-ping'
                              : 'bg-white'
                          }`}
                        ></span>
                        {getStatusText(work.status)}
                      </span>
                    </div>

                    {/* Code & Budget Strip on Bottom of Image */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                      <span className="font-mono bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-md font-bold text-orange-300 border border-white/10">
                        {work.code}
                      </span>
                      {work.fullDetails?.estimatedBudget && (
                        <span className="font-mono font-bold bg-white/95 text-gray-900 px-2.5 py-0.5 rounded-md shadow-md">
                          {work.fullDetails.estimatedBudget}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-headline font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#FF8500] transition-colors leading-snug">
                      {isMr && work.titleMr ? work.titleMr : work.title}
                    </h3>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {isMr && work.descriptionMr ? work.descriptionMr : work.description}
                    </p>

                    {/* Location Metadata with Saffron Map Pin */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
                      <span className="material-symbols-outlined text-[16px] text-[#FF8500] shrink-0">
                        location_on
                      </span>
                      <span className="truncate">
                        {isMr && work.locationMr ? work.locationMr : work.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between group-hover:bg-orange-50/30 transition-colors">
                  <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-gray-400">
                      calendar_today
                    </span>
                    {work.fullDetails?.targetCompletion || 'Municipal Register'}
                  </span>

                  <button
                    className="text-xs font-bold text-[#168447] group-hover:text-[#FF8500] flex items-center gap-1 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWork(work);
                    }}
                    type="button"
                  >
                    <span>{t('works.viewDetails')}</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedWork && (
        <ProjectModal
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
        />
      )}
    </section>
  );
};