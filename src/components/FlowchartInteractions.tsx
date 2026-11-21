import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CivicPoll } from '../types';
import { getStoredPoll, saveStoredPoll } from '../data/civicData';

export const FlowchartInteractions: React.FC = () => {
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [poll, setPoll] = useState<CivicPoll>(getStoredPoll());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [justVoted, setJustVoted] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('akluj_ward8_user_voted') === 'true';
    } catch {
      return false;
    }
  });

  const steps = [
    {
      step: '01',
      title: t('flowchart.step1Title'),
      desc: t('flowchart.step1Desc'),
      time: t('flowchart.step1Time'),
      icon: 'receipt_long',
      color: '#FF8500',
      badge: isMr ? 'डिजिटल नोंदणी' : 'Digital Logging',
      officer: isMr ? 'नागरी सहाय्यता कक्ष' : 'Citizen Helpdesk Counter',
      telemetry: 'AKL-SYS-LOG: Token #AKL-2025-08-984 generated. SMS confirmation sent.',
      action: isMr
        ? 'तक्रारदार नागरिकाला एसएमएस व व्हॉट्सॲपवर अधिकृत टोकन क्रमांक मिळतो.'
        : 'Citizen receives immediate SMS and WhatsApp receipt with reference token.',
    },
    {
      step: '02',
      title: t('flowchart.step2Title'),
      desc: t('flowchart.step2Desc'),
      time: t('flowchart.step2Time'),
      icon: 'engineering',
      color: '#168447',
      badge: isMr ? 'प्रत्यक्ष पाहणी' : 'Site Inspection',
      officer: isMr ? 'कनिष्ठ अभियंता व नगरसेवक प्रतिनिधी' : 'Junior Engineer (Civil) & Councillor Liaison',
      telemetry: 'FIELD-INSPECT: Geo-tagged coordinates logged at Sangam Chowk. Severity: Normal.',
      action: isMr
        ? 'घटनास्थळी प्रत्यक्ष भेट देऊन समस्येचे मोजमाप, फोटो व प्राथमिक अहवाल तयार होतो.'
        : 'On-site physical inspection to record defect dimensions and engineering report.',
    },
    {
      step: '03',
      title: t('flowchart.step3Title'),
      desc: t('flowchart.step3Desc'),
      time: t('flowchart.step3Time'),
      icon: 'fact_check',
      color: '#172033',
      badge: isMr ? 'निधी व मंजुरी' : 'Sanction',
      officer: isMr ? 'अकलूज नगर परिषद बांधकाम समिती' : 'Akluj Works & Standing Committee',
      telemetry: 'CIVIC-BUDGET: Administrative sanction cleared under Ward Maintenance head.',
      action: isMr
        ? 'तातडीच्या देखभाल निधीतून अंदाजपत्रक मंजूर करून कंत्राटदाराला वर्क ऑर्डर जारी केली जाते.'
        : 'Administrative sanction from emergency ward funds and work order issuance.',
    },
    {
      step: '04',
      title: t('flowchart.step4Title'),
      desc: t('flowchart.step4Desc'),
      time: t('flowchart.step4Time'),
      icon: 'handyman',
      color: '#FF8500',
      badge: isMr ? 'प्रत्यक्ष काम' : 'Execution',
      officer: isMr ? 'महानगरपालिका नियुक्त कंत्राटदार पथक' : 'Designated Municipal Contractor Crew',
      telemetry: 'WORK-PROGRESS: Repair team deployed on ground. Materials delivered.',
      action: isMr
        ? 'रस्ता, गटर, किंवा पथदिव्यांचे काम प्रत्यक्ष जागेवर सुरू होते; प्रगती पोर्टलवर नोंदवली जाते.'
        : 'Civil or electrical repair undertaken with real-time photographic logging.',
    },
    {
      step: '05',
      title: t('flowchart.step5Title'),
      desc: t('flowchart.step5Desc'),
      time: t('flowchart.step5Time'),
      icon: 'verified',
      color: '#168447',
      badge: isMr ? 'नागरी समाधान' : 'Resolution',
      officer: isMr ? 'तक्रारदार नागरिक व नगरसेवक' : 'Citizen Complainant & Councillor Verification',
      telemetry: 'SLA-COMPLETE: Citizen confirmed resolution via digital sign-off. Ticket closed.',
      action: isMr
        ? 'तक्रारदार नागरिकाकडून काम समाधानकारक झाल्याची पुष्टी आल्यानंतरच फाईल बंद केली जाते.'
        : 'Ticket closed only after complainant satisfaction sign-off via SMS or callback.',
    },
  ];

  // Auto-Simulation Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 2400);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, steps.length]);

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;

    const updatedOptions = poll.options.map((opt) => {
      if (opt.id === selectedOption) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });

    const updatedPoll: CivicPoll = {
      ...poll,
      totalVotes: poll.totalVotes + 1,
      options: updatedOptions,
    };

    setPoll(updatedPoll);
    saveStoredPoll(updatedPoll);
    setHasVoted(true);
    setJustVoted(true);
    try {
      localStorage.setItem('akluj_ward8_user_voted', 'true');
    } catch {
      // ignore
    }
    setTimeout(() => setJustVoted(false), 3000);
  };

  const currentStep = steps[activeStep];

  return (
    <section id="flowchart" className="w-full py-16 sm:py-24 bg-[#FFFCF7] border-b border-gray-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Simulation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-[#FF8500] text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF8500] animate-ping"></span>
              <span>{t('flowchart.label')}</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tight">
              {t('flowchart.heading')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
              {t('flowchart.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Interactive Simulator Runner Button */}
            <button
              type="button"
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95 ${
                isSimulating
                  ? 'bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-300'
                  : 'bg-gradient-to-r from-[#FF8500] to-[#E06E00] hover:from-[#DE7200] hover:to-[#C56000] text-white ring-2 ring-orange-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSimulating ? 'pause_circle' : 'play_circle'}
              </span>
              <span>
                {isSimulating
                  ? isMr
                    ? 'सिम्युलेशन थांबवा'
                    : 'Pause Simulation'
                  : isMr
                  ? '▶ कार्यप्रवाह सिम्युलेटर चालवा'
                  : '▶ Run Live Civic Simulator'}
              </span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-[#FF8500] text-xs font-bold shadow-xs">
              <span className="material-symbols-outlined text-[16px]">speed</span>
              <span>{isMr ? '३.२ दिवसांत निवारण' : 'Avg. 3.2 Days SLA'}</span>
            </span>
          </div>
        </div>

        {/* 5-Step Duration Flowchart Visualizer */}
        <div className="relative mb-8">
          {/* Connector Line behind cards with Moving Light Glow when Simulating */}
          <div className="hidden lg:block absolute top-[52px] left-10 right-10 h-2 bg-gradient-to-r from-[#FF8500] via-[#168447] to-[#172033] z-0 opacity-25 rounded-full overflow-hidden">
            {isSimulating && (
              <div className="w-1/3 h-full bg-white/80 rounded-full animate-marquee"></div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map((st, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={st.step}
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveStep(idx);
                  }}
                  onMouseEnter={() => {
                    if (!isSimulating) setActiveStep(idx);
                  }}
                  className={`group cursor-pointer transition-all duration-300 rounded-2xl p-5 border flex flex-col justify-between active:scale-95 ${
                    isSelected
                      ? 'bg-white shadow-2xl ring-2 ring-[#FF8500] -translate-y-2 border-transparent relative overflow-hidden'
                      : 'bg-white/85 hover:bg-white hover:shadow-xl hover:-translate-y-1 hover:border-[#FF8500]/60 border-gray-200'
                  }`}
                >
                  {/* Glowing Top Accent on Selected Card */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF8500] to-[#168447]"></div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-headline font-extrabold text-[11px] text-gray-400 group-hover:text-[#FF8500] transition-colors">
                        STAGE {st.step}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs"
                        style={{
                          backgroundColor: `${st.color}15`,
                          color: st.color,
                        }}
                      >
                        {st.badge}
                      </span>
                    </div>

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white shadow-md transition-all duration-300 ${
                        isSelected ? 'scale-110 shadow-lg ring-4 ring-orange-100' : 'group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: st.color }}
                    >
                      <span className="material-symbols-outlined text-[24px]">
                        {st.icon}
                      </span>
                    </div>

                    <h3 className="font-headline font-bold text-sm sm:text-base text-[#172033] mb-1.5 group-hover:text-[#FF8500] transition-colors leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {st.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                    <span className="flex items-center gap-1 font-mono text-[10px] text-gray-700">
                      <span className="material-symbols-outlined text-[14px] text-[#FF8500]">
                        schedule
                      </span>
                      {st.time}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        isSelected ? 'text-[#FF8500] flex items-center gap-1' : 'text-gray-400'
                      }`}
                    >
                      {isSelected ? '● Running' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Highlight Card for Selected Workflow Step with Live Telemetry Console */}
        <div className="mb-14 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 sm:p-7 shadow-xl border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8500]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start gap-4 relative z-10 max-w-3xl">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg ring-2 ring-white/20"
              style={{ backgroundColor: currentStep.color }}
            >
              <span className="material-symbols-outlined text-[28px]">
                {currentStep.icon}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#FF8500] uppercase tracking-wider">
                  STAGE {currentStep.step} EXECUTION DETAILS
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                  {currentStep.time}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {currentStep.badge}
                </span>
              </div>
              <h4 className="font-headline font-bold text-lg sm:text-xl text-white">
                {currentStep.title} — <span className="text-slate-300 font-medium text-base">{currentStep.officer}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {currentStep.action}
              </p>

              {/* Developer / Telemetry Console Line */}
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-slate-400 font-sans">{isMr ? 'सिस्टम लॉग:' : 'System Event:'}</span>
                <span className="truncate">{currentStep.telemetry}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 self-end md:self-center">
            <a
              href="#grievance"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#E06E00] hover:from-[#DE7200] hover:to-[#C56000] text-white text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>{isMr ? 'तक्रार दाखल करा' : 'File Grievance Now'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Participatory Budgeting Poll & Social Media Connect Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* People's Voice Poll Card with Glowing Feedback */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#168447] text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-[#168447] animate-ping"></span>
                  {t('poll.label')}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  {t('poll.totalVotes')}: <strong className="text-gray-900">{poll.totalVotes}</strong>
                </span>
              </div>

              <h3 className="font-headline font-bold text-lg sm:text-2xl text-[#172033] mb-1 leading-snug">
                {isMr ? poll.questionMr : poll.question}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                {t('poll.subtitle')}
              </p>

              {/* Poll Options */}
              <div className="space-y-3 mb-6">
                {poll.options.map((opt) => {
                  const percentage =
                    poll.totalVotes > 0
                      ? Math.round((opt.votes / poll.totalVotes) * 100)
                      : 0;
                  const isChecked = selectedOption === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => !hasVoted && setSelectedOption(opt.id)}
                      className={`relative rounded-2xl p-3.5 border transition-all overflow-hidden active:scale-98 ${
                        hasVoted
                          ? 'border-gray-200 bg-gray-50/70 cursor-default'
                          : isChecked
                          ? 'border-[#FF8500] bg-orange-50/50 cursor-pointer shadow-md ring-2 ring-orange-200'
                          : 'border-gray-200 hover:border-gray-300 bg-white cursor-pointer hover:shadow-xs'
                      }`}
                    >
                      {/* Vote Percentage Fill Bar with Saffron Gradient */}
                      {hasVoted && (
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FF8500]/20 to-amber-500/10 transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="poll-option"
                            id={opt.id}
                            checked={isChecked}
                            onChange={() => !hasVoted && setSelectedOption(opt.id)}
                            disabled={hasVoted}
                            className="text-[#FF8500] focus:ring-[#FF8500] w-4 h-4 cursor-pointer"
                          />
                          <label
                            htmlFor={opt.id}
                            className={`font-semibold cursor-pointer ${
                              isChecked ? 'text-gray-950 font-bold' : 'text-gray-800'
                            }`}
                          >
                            {isMr ? opt.labelMr : opt.label}
                          </label>
                        </div>
                        {hasVoted && (
                          <div className="flex items-center gap-2 font-mono font-bold text-[#172033] shrink-0">
                            <span className="text-sm font-extrabold text-[#FF8500]">{percentage}%</span>
                            <span className="text-[11px] text-gray-500 font-normal">
                              ({opt.votes} {isMr ? 'मते' : 'votes'})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
              {hasVoted ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#168447]">
                  <span className="material-symbols-outlined text-[20px] text-emerald-600 animate-bounce">
                    check_circle
                  </span>
                  <span>
                    {justVoted
                      ? isMr
                        ? '🎉 तुमचे मत यशस्वीरीत्या नोंदवले गेले! धन्यवाद!'
                        : '🎉 Vote successfully recorded! Thank you for participating!'
                      : t('poll.votedText')}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleVote}
                  disabled={!selectedOption}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8500] to-[#E06E00] hover:from-[#DE7200] hover:to-[#C56000] text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    how_to_vote
                  </span>
                  <span>{t('poll.voteBtn')}</span>
                </button>
              )}

              <span className="text-[11px] text-gray-400 font-mono">
                {isMr ? 'थेट पारदर्शक लोकशाही' : 'Direct Participatory Governance'}
              </span>
            </div>
          </div>

          {/* Social Media Connect Hub with Designer Visuals */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/80 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-1 bg-[#FF8500] rounded-full"></div>
                <div className="w-4 h-1 bg-[#168447] rounded-full"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                  {isMr ? 'जनसंवाद व्यासपीठ' : 'Public Connect'}
                </span>
              </div>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-white mb-2">
                {t('social.heading')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {t('social.subtitle')}
              </p>

              {/* Verified Channels List with Modern Badges */}
              <div className="space-y-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/80 hover:border-blue-500/50 transition-all flex items-center justify-between group active:scale-98 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      f
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {t('social.facebook')}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        @councillormaheshshinde.akluj
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-[18px]">
                    open_in_new
                  </span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/80 hover:border-pink-500/50 transition-all flex items-center justify-between group active:scale-98 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      IG
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                        {t('social.instagram')}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        @maheshshinde_ward8
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-[18px]">
                    open_in_new
                  </span>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/80 hover:border-red-500/50 transition-all flex items-center justify-between group active:scale-98 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      ▶
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                        {t('social.youtube')}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Akluj Ward 8 Development Channel
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-white text-[18px]">
                    open_in_new
                  </span>
                </a>

                <a
                  href="https://wa.me/919822000008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#168447]/20 hover:bg-[#168447]/30 border border-[#168447]/50 transition-all flex items-center justify-between group active:scale-98 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#168447] flex items-center justify-center text-white shadow-md">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-300 group-hover:text-white transition-colors">
                        {t('social.whatsapp')}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        +91 98220 00008 (Direct Desk)
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF8500] group-hover:underline">
                    {isMr ? 'मेसेज करा' : 'Message'} →
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>{isMr ? 'अधिकृत जनसंवाद कक्ष' : 'Official Public Desk'}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                24x7 Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};