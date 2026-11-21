import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AKLUJ_MAP_POINTS, AKLUJ_INFO } from '../data/civicData';
import { MapPoint } from '../types';

export const AklujInteractiveMap: React.FC = () => {
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(AKLUJ_MAP_POINTS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [radarActive, setRadarActive] = useState<boolean>(true);

  const categories = [
    { label: isMr ? 'सर्व स्थाने' : 'All Locations', value: 'all' },
    { label: isMr ? 'प्रशासकीय / संपर्क' : 'Secretariat & Desk', value: 'Secretariat' },
    { label: isMr ? 'पायाभूत सुविधा' : 'Infrastructure', value: 'Infrastructure' },
    { label: isMr ? 'हरित उद्याने' : 'Parks & Gym', value: 'Recreation' },
  ];

  const filteredPoints = AKLUJ_MAP_POINTS.filter((pt) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'Secretariat') return pt.category.includes('Secretariat') || pt.category.includes('Public');
    if (activeCategoryFilter === 'Infrastructure') return pt.category.includes('Water') || pt.category.includes('Road') || pt.category.includes('Transit');
    if (activeCategoryFilter === 'Recreation') return pt.category.includes('Park') || pt.category.includes('Recreation');
    return true;
  });

  return (
    <section id="map" className="w-full py-16 sm:py-24 bg-[#FFFCF7] border-b border-gray-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-[#FF8500] text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-ping"></span>
              <span>{t('map.label')}</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight">
              {t('map.heading')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
              {t('map.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Radar Toggle Button */}
            <button
              type="button"
              onClick={() => setRadarActive(!radarActive)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                radarActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  radarActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                }`}
              ></span>
              <span>{radarActive ? 'Radar GIS: ON' : 'Radar GIS: OFF'}</span>
            </button>

            <a
              href={AKLUJ_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FF8500]">
                directions
              </span>
              <span>{t('map.directions')}</span>
            </a>
          </div>
        </div>

        {/* Quick Category Filter Pills for Map */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategoryFilter === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#172033] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Map Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* SVG Map Canvas with Radar Beam Overlay */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-700/80 relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            {/* Subtle Coordinate Gridlines & Dot Matrix */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none"></div>

            {/* Radar Sweep Animated Beam (Awwwards / Cyber Aesthetic) */}
            {radarActive && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-emerald-500/20 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-transparent rounded-full animate-radar-sweep origin-center"></div>
                <div className="absolute inset-8 rounded-full border border-emerald-500/15"></div>
                <div className="absolute inset-20 rounded-full border border-emerald-500/10"></div>
              </div>
            )}

            {/* Top Bar with Geolocation Details HUD */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/80 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#168447] shadow-[0_0_8px_#168447] animate-pulse"></span>
                <span className="font-bold text-white tracking-wide">AKLUJ, SOLAPUR DIST.</span>
                <span className="text-slate-400">({AKLUJ_INFO.coordinates})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md font-bold">
                  SATELLITE GIS V4
                </span>
                <span className="text-[11px] text-[#FF8500] font-bold px-2.5 py-0.5 rounded-md bg-orange-950/40 border border-orange-800/50">
                  {isMr ? 'प्रभाग क्र. ८ कार्यक्षेत्र' : 'Ward 8 Jurisdiction'}
                </span>
              </div>
            </div>

            {/* Stylized SVG Roads & Boundary Layout */}
            <div className="relative flex-1 my-5 flex items-center justify-center">
              <svg
                viewBox="0 0 800 450"
                className="w-full h-full max-h-[400px] drop-shadow-2xl select-none"
              >
                {/* Ward 8 Boundary Outline */}
                <path
                  d="M 120,80 L 380,50 L 680,90 L 730,280 L 620,400 L 250,420 L 100,260 Z"
                  fill="rgba(255, 133, 0, 0.08)"
                  stroke="#FF8500"
                  strokeWidth="2.5"
                  strokeDasharray="6,4"
                  opacity="0.9"
                />

                {/* Major Arterial Roads in Akluj */}
                {/* Sangam Road (Main East-West Trunk) */}
                <path
                  d="M 40,240 Q 300,220 500,240 T 780,210"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 40,240 Q 300,220 500,240 T 780,210"
                  fill="none"
                  stroke="#F8FAFC"
                  strokeWidth="1.8"
                  strokeDasharray="12,6"
                  opacity="0.8"
                />

                {/* Malshiras Bypass Corridor (North-South) */}
                <path
                  d="M 400,20 Q 420,180 390,320 T 430,440"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="7"
                  strokeLinecap="round"
                />

                {/* Shastri Nagar Arterial */}
                <path
                  d="M 320,130 L 620,170"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Old Gaothan Link */}
                <path
                  d="M 220,230 L 380,360"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Road Labels */}
                <text x="60" y="222" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  Sangam Main Road (संगम रस्ता)
                </text>
                <text x="440" y="55" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                  Malshiras Bypass Link (बायपास मार्ग)
                </text>
                <text x="450" y="150" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">
                  Shastri Nagar Arterial
                </text>

                {/* Interactive Map Pins */}
                {filteredPoints.map((pt) => {
                  const isSelected = selectedPoint.id === pt.id;
                  const x = (pt.xPercent / 100) * 800;
                  const y = (pt.yPercent / 100) * 450;

                  return (
                    <g
                      key={pt.id}
                      className="cursor-pointer transition-transform group"
                      onClick={() => setSelectedPoint(pt)}
                    >
                      {/* Glow ripple on selected */}
                      {isSelected && (
                        <>
                          <circle
                            cx={x}
                            cy={y}
                            r="24"
                            fill="#FF8500"
                            opacity="0.25"
                            className="animate-ping"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="16"
                            fill="#FF8500"
                            opacity="0.4"
                          />
                        </>
                      )}

                      {/* Pin Circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 12 : 9}
                        fill={isSelected ? '#FF8500' : '#168447'}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-all duration-300 filter drop-shadow-md group-hover:scale-125"
                      />

                      {/* Pin Label with Background Tag */}
                      <text
                        x={x}
                        y={y - 16}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={isSelected ? '12' : '10'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      >
                        {isMr ? pt.titleMr.split(' ')[0] : pt.title.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Legend HUD */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-700/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF8500] shadow-[0_0_6px_#FF8500]"></span>
                  <span className="text-slate-200 font-medium">
                    {isMr ? 'निवडलेले स्थान (Selected)' : 'Selected Landmark'}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#168447] shadow-[0_0_6px_#168447]"></span>
                  <span className="text-slate-200 font-medium">
                    {isMr ? 'नागरी सुविधा केंद्र' : 'Civic Amenity'}
                  </span>
                </span>
              </div>
              <span className="italic text-slate-400">{t('map.pinsInfo')}</span>
            </div>
          </div>

          {/* Selected Point Detail Panel */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF8500] px-3 py-1 rounded-full bg-orange-50 border border-orange-200">
                  {isMr ? selectedPoint.categoryMr : selectedPoint.category}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  {isMr ? selectedPoint.statusMr : selectedPoint.status}
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#172033] mb-2 leading-snug">
                {isMr ? selectedPoint.titleMr : selectedPoint.title}
              </h3>

              <div className="flex items-start gap-2 text-xs text-gray-600 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="material-symbols-outlined text-[18px] text-[#FF8500] shrink-0 mt-0.5">
                  location_on
                </span>
                <span className="leading-relaxed">{isMr ? selectedPoint.addressMr : selectedPoint.address}</span>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2.5 mb-6">
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  {isMr ? 'ठळक वैशिष्ट्ये व कार्य व्याप्ती:' : 'Key Infrastructure Highlights:'}
                </p>
                {selectedPoint.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-orange-50/40 border border-orange-100 text-xs text-gray-700 flex items-start gap-2.5"
                  >
                    <span className="material-symbols-outlined text-[#168447] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="leading-relaxed font-medium">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <a
                href={selectedPoint.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#E06E00] hover:from-[#DE7200] hover:to-[#C56000] text-white font-bold text-xs sm:text-sm text-center shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">map</span>
                <span>{t('map.directions')}</span>
              </a>
              <p className="text-[10px] text-gray-400 text-center font-mono">
                {isMr
                  ? 'अकलूज नगर परिषद प्रभाग क्र. ८ अधिकृत सीमांकन'
                  : 'Official Ward Demarcation — Akluj Municipal Council'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};