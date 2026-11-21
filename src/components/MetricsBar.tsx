import React, { useState } from 'react';
import { CIVIC_METRICS } from '../data/civicData';
import { useLanguage } from '../context/LanguageContext';

export const MetricsBar: React.FC = () => {
  const [showLiveCounts, setShowLiveCounts] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState('Just now');
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const handleSimulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 700);
  };

  return (
    <section id="metrics-bar" className="w-full py-12 sm:py-16 bg-[#FFFCF7] border-b border-gray-200/90 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-6 bg-gradient-to-b from-[#FF8500] to-[#DE7200] rounded-full"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF8500]">
                {isMr ? 'पारदर्शक प्रगती अहवाल' : 'Civic Dashboard & Impact'}
              </span>
            </div>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
              {t('metrics.heading')}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Data Simulation Sync Button */}
            <button
              onClick={handleSimulateRefresh}
              disabled={isRefreshing}
              className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-2xs hover:border-[#FF8500] hover:text-[#FF8500] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Sync with Municipal Audit Desk"
            >
              <span
                className={`material-symbols-outlined text-[16px] text-[#168447] ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
              >
                sync
              </span>
              <span>{isRefreshing ? (isMr ? 'अपडेट होत आहे...' : 'Syncing...') : `${isMr ? 'थेट समक्रमण' : 'Live Sync'}: ${lastSynced}`}</span>
            </button>

            {/* Toggle Audit Mode */}
            <button
              id="toggle-audit-view-btn"
              onClick={() => setShowLiveCounts(!showLiveCounts)}
              className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl shadow-2xs hover:border-[#FF8500] hover:text-[#FF8500] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-[#FF8500]">
                {showLiveCounts ? 'visibility' : 'analytics'}
              </span>
              <span>{showLiveCounts ? t('metrics.liveView') : t('metrics.auditView')}</span>
            </button>

            <span className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-2xs hidden lg:inline">
              {isMr ? CIVIC_METRICS.auditPeriodMr : CIVIC_METRICS.auditPeriod}
            </span>
          </div>
        </div>

        {/* Bento Grid Layout for Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Completed Works with Progress Arc */}
          <div className="bento-card p-6 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-gray-500">
                {t('works.allTab')}
              </span>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF8500] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">construction</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-headline font-black text-4xl text-[#0F172A] tracking-tight">
                  {showLiveCounts ? `${CIVIC_METRICS.worksCompleted}+` : '--'}
                </span>
                <span className="text-xs font-bold text-[#168447] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  +18% YoY
                </span>
              </div>
              <p className="font-bold text-gray-900 text-sm">{t('metrics.completedWorks')}</p>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF8500] to-[#E65100] h-full w-[80%] rounded-full"></div>
              </div>

              <p className="text-xs text-gray-500 mt-2.5 flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[#FF8500] text-[16px]">verified</span>
                <span>{t('metrics.verified')}</span>
              </p>
            </div>
          </div>

          {/* Card 2: In-Progress Works with Pulse Wave */}
          <div className="bento-card p-6 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-gray-500">
                {t('works.statusInProgress')}
              </span>
              <div className="w-10 h-10 rounded-xl bg-green-50 text-[#168447] flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">engineering</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-headline font-black text-4xl text-[#0F172A] tracking-tight">
                  {showLiveCounts ? `${CIVIC_METRICS.projectsInProgress}` : '--'}
                </span>
                <span className="text-xs font-bold text-[#FF8500] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8500] animate-ping"></span>
                  Active
                </span>
              </div>
              <p className="font-bold text-gray-900 text-sm">{t('metrics.inProgressWorks')}</p>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-[#168447] to-emerald-400 h-full w-[65%] rounded-full"></div>
              </div>

              <p className="text-xs text-gray-500 mt-2.5 flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[#168447] text-[16px]">route</span>
                <span>{t('metrics.onSchedule')}</span>
              </p>
            </div>
          </div>

          {/* Card 3: Grievance Redressal SLA with Sparkline */}
          <div className="bento-card p-6 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-gray-500">
                {t('metrics.resolutionSpeed')}
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">task_alt</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-headline font-black text-4xl text-[#0F172A] tracking-tight">
                  {showLiveCounts ? `${CIVIC_METRICS.grievancesAddressed}+` : '--'}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {CIVIC_METRICS.averageResolutionDays} SLA
                </span>
              </div>
              <p className="font-bold text-gray-900 text-sm">{t('metrics.grievancesResolved')}</p>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-[#168447] h-full w-[94.6%] rounded-full"></div>
              </div>

              <p className="text-xs text-[#168447] font-bold mt-2.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">speed</span>
                <span>{CIVIC_METRICS.slaSatisfactionRate} Resolution Rate</span>
              </p>
            </div>
          </div>

          {/* Card 4: Ward Fund Deployment Breakdown */}
          <div className="bento-card p-6 flex flex-col justify-between group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-extrabold text-gray-500">
                {t('metrics.fundsAllocated')}
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-headline font-black text-4xl text-[#0F172A] tracking-tight">
                  {showLiveCounts ? CIVIC_METRICS.fundsAllocated : '--'}
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  100% Utilized
                </span>
              </div>
              <p className="font-bold text-gray-900 text-sm">
                {isMr ? 'मंजूर प्रभाग विकास निधी' : 'Sanctioned Ward Budget'}
              </p>

              {/* Multi-color Fund Segment Bar */}
              <div className="mt-3 flex h-1.5 w-full rounded-full overflow-hidden bg-gray-100">
                <div className="bg-[#FF8500] w-[45%]" title="Roads & Drainage (45%)"></div>
                <div className="bg-[#168447] w-[30%]" title="Water Supply (30%)"></div>
                <div className="bg-blue-500 w-[15%]" title="Street Lighting (15%)"></div>
                <div className="bg-amber-400 w-[10%]" title="Parks & Sanitation (10%)"></div>
              </div>

              <p className="text-xs text-gray-500 mt-2.5 flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-blue-600 text-[16px]">groups</span>
                <span>{CIVIC_METRICS.communityInitiatives}+ {t('metrics.citizensJoined')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
