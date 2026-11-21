import React, { useState } from 'react';
import councillorPhoto from '../assets/Politician-img.jpj-1.jpeg';
import { useLanguage } from '../context/LanguageContext';

export const ABOUT_DATA = {
  councillorPhotoUrl: '/assets/Politician-img.jpj-1.jpeg',
  bjpLogoUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuANNQ1xuG306chQXuLZKn6e7CWDlaRDtI4D0FrtsTn7Wv-HXMDi0h9eYx3OdxeHpu_56NO8OlrtGRMweuMinopyfEdcDZYQRnrB6yxxBdK0gktrsrEl-qcR85wnfOYy40A2RY0eOplUsHA2UllUDGWmgs4DjVWcTefAoKLnwtohUXlsuHpkw_ztpL2_TmNlqMcQVTDzMY_a2vH6iMXajsLRNlVy4kW5wMZyX6DfJ2G-xYf5x6_KgMRx_ccBLoMME-IlL2k',
};

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isMr = language === 'mr';

  const [activeTab, setActiveTab] = useState<'journey' | 'vision' | 'values' | 'credentials'>('journey');
  const [selectedMilestone, setSelectedMilestone] = useState<number>(3); // Default to current milestone

  // Dynamic Introduction paragraphs
  const introduction = isMr
    ? [
        'महेश केशव शिंदे हे भारतीय जनता पार्टीच्या (भाजपा) माध्यमातून प्रभाग क्र. ८ चे निर्वाचित नगरसेवक म्हणून अविरतपणे कार्यरत आहेत. प्रभागातील नागरिकांशी थेट संपर्क आणि समस्या सोडवणुकीची तत्पर कार्यपद्धती ही त्यांची मुख्य ओळख आहे.',
        'स्थानिक सोसायट्या, ज्येष्ठ नागरिक आणि नागरिकांच्या सहकार्याने प्रभागामध्ये सुरळीत पाणीपुरवठा, सुरक्षित व स्वच्छ रस्ते, दर्जेदार सांडपाणी निचरा आणि मूलभूत सोयीसुविधांचे आधुनिकीकरण यावर त्यांनी विशेष भर दिला आहे.',
      ]
    : [
        'Mahesh Keshav Shinde serves as the elected Municipal Councillor for Ward No. 8 under the Bharatiya Janata Party (BJP). Rooted in daily community contact, his public service centers on bringing responsive, structured, and accountable governance to local municipal administration.',
        'Working in coordination with residential welfare associations, local community representatives, and ward families, his work emphasizes dependable civic amenities, neighborhood safety, and proactive resolution of localized civic grievances.',
      ];

  // Dynamic Public Journey Stages
  const publicJourney = [
    {
      step: '01',
      category: t('about.stage1Category'),
      title: t('about.stage1Title'),
      description: t('about.stage1Desc'),
      icon: 'volunteer_activism',
      color: '#FF8500',
      highlight: isMr ? '५००+ रक्तदान, पूरग्रस्त मदत' : '500+ Donors & Rural Aid',
    },
    {
      step: '02',
      category: t('about.stage2Category'),
      title: t('about.stage2Title'),
      description: t('about.stage2Desc'),
      icon: 'handshake',
      color: '#168447',
      highlight: isMr ? '२४x७ जल हक्क आंदोलन' : 'Water Equity Campaign',
    },
    {
      step: '03',
      category: t('about.stage3Category'),
      title: t('about.stage3Title'),
      description: t('about.stage3Desc'),
      icon: 'how_to_vote',
      color: '#0F172A',
      highlight: isMr ? 'ऐतिहासिक मताधिक्याने निवड' : 'Historic Electoral Mandate',
    },
    {
      step: '04',
      category: t('about.stage4Category'),
      title: t('about.stage4Title'),
      description: t('about.stage4Desc'),
      icon: 'account_balance',
      color: '#FF8500',
      highlight: isMr ? 'स्मार्ट प्रभाग व डिजिटल पोर्टल' : 'Digital Ward Transformation',
    },
  ];

  // Dynamic Core Values
  const coreValues = [
    {
      title: t('about.val1Title'),
      description: t('about.val1Desc'),
      icon: 'visibility',
      accentColor: '#FF8500',
      tag: '100% Open Data',
    },
    {
      title: t('about.val2Title'),
      description: t('about.val2Desc'),
      icon: 'groups',
      accentColor: '#168447',
      tag: 'People-Led',
    },
    {
      title: t('about.val3Title'),
      description: t('about.val3Desc'),
      icon: 'gavel',
      accentColor: '#0F172A',
      tag: 'Strict Audit',
    },
    {
      title: t('about.val4Title'),
      description: t('about.val4Desc'),
      icon: 'domain_add',
      accentColor: '#168447',
      tag: 'Future-Proof',
    },
  ];

  // Dynamic Vision & Priorities
  const visionGoals = isMr
    ? [
        {
          title: 'आधुनिक व मजबूत पायाभूत सुविधा',
          description:
            'पावसाळ्यात पाणी साचू नये म्हणून प्रभावी भुयारी ड्रेनेज, मजबूत काँक्रीट रस्ते आणि दर्जेदार पदपथ निर्माण करणे.',
          icon: 'construction',
          stat: '१,२०० मी. सिमेंट रस्ता',
        },
        {
          title: 'अखंडित व स्वच्छ पाणीपुरवठा',
          description:
            'प्रभागातील शेवटच्या सोसायटीपर्यंत समतोल दाबाने पाणी पोहोचवणे आणि गळती प्रतिबंधक जलवाहिन्यांची उभारणी.',
          icon: 'water_drop',
          stat: '०.८ बार दाब वाढ',
        },
        {
          title: 'स्वच्छ, सुरक्षित व उजळलेला प्रभाग',
          description:
            'दररोज १००% कचरा संकलन, घंटागाड्यांची नियमितता आणि महिला व बालकांच्या सुरक्षेसाठी अखंड पथदिवे.',
          icon: 'lightbulb',
          stat: '१४० नवीन एलईडी दिवे',
        },
        {
          title: 'सक्रिय नागरिक संवाद व पारदर्शक कामकाज',
          description:
            'नियमित जनसुनावणी, जलद डिजिटल तक्रार निवारण आणि प्रभागाच्या विकासकामांमध्ये नागरिकांचा सक्रिय सहभाग.',
          icon: 'record_voice_over',
          stat: 'पाक्षिक जनसुनावणी',
        },
      ]
    : [
        {
          title: 'Modern & Reliable Civic Infrastructure',
          description:
            'Prioritizing resilient stormwater drainage, upgraded internal roads, and underground utility sleeves to prevent seasonal flooding.',
          icon: 'construction',
          stat: '1,200m Concrete Road',
        },
        {
          title: 'Consistent & Clean Water Distribution',
          description:
            'Ensuring equal tap pressure for all residential societies and rapid replacement of aging distribution conduits.',
          icon: 'water_drop',
          stat: '+0.8 Bar Pressure Elevation',
        },
        {
          title: 'Clean, Safe & Well-Lit Neighborhoods',
          description:
            '100% daily door-to-door waste segregation audits and continuous operational coverage of smart LED luminaires.',
          icon: 'lightbulb',
          stat: '140 Energy-Saving LEDs',
        },
        {
          title: 'Empowered & Consultative Ward Community',
          description:
            'Bi-monthly open Jan Sunwai forums, rapid SLA complaint resolution, and transparent publication of tenders.',
          icon: 'record_voice_over',
          stat: 'Bi-Monthly Public Sabhas',
        },
      ];

  const imageSrc = councillorPhoto || ABOUT_DATA.councillorPhotoUrl;

  return (
    <section id="about" className="w-full py-16 lg:py-24 bg-white border-b border-gray-200/90 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* =========================================================
            TOP SECTION: PROFILE HERO & INTERACTIVE BENTO OVERVIEW
            ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-6 bg-gradient-to-b from-[#FF8500] to-[#168447] rounded-full"></span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF8500]">
              {t('about.label')}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline font-black text-3xl sm:text-4xl lg:text-[42px] text-[#0F172A] tracking-tight">
                {t('about.heading')}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#168447] mt-1">
                {t('about.subtitle')}
              </p>
            </div>

            {/* Quick Interactive Nav Tabs for About Section */}
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl border border-gray-200/90 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('journey')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeTab === 'journey'
                    ? 'bg-white text-[#FF8500] shadow-2xs font-extrabold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isMr ? 'सार्वजनिक प्रवास' : 'Public Journey'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeTab === 'vision'
                    ? 'bg-white text-[#168447] shadow-2xs font-extrabold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isMr ? '४ विकास स्तंभ' : '4 Vision Pillars'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('values')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeTab === 'values'
                    ? 'bg-white text-[#0F172A] shadow-2xs font-extrabold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isMr ? 'कार्यमूल्ये' : 'Core Values'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  activeTab === 'credentials'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isMr ? 'पात्रता व संपर्क' : 'Credentials'}
              </button>
            </div>
          </div>
        </div>

        {/* Top Profile Summary Bento Card */}
        <div className="bento-card p-6 sm:p-8 mb-10 bg-gradient-to-br from-white via-orange-50/20 to-emerald-50/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Portrait Frame with Holographic Rim */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-44 sm:w-48 aspect-[3/3.8] rounded-2xl overflow-hidden shadow-xl ring-2 ring-[#FF8500]/30 bg-slate-900 group">
                <img
                  alt="Mahesh Keshav Shinde"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  src={imageSrc}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-center">
                  <p className="font-headline font-bold text-sm text-white">{t('nav.councillorName')}</p>
                  <p className="text-[10px] text-orange-300 font-semibold">{t('nav.designation')}</p>
                </div>
              </div>
            </div>

            {/* Narrative & Civic Mandate Highlights */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3 text-gray-700 text-xs sm:text-sm leading-relaxed">
                {introduction.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* 3 Key Trust Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                <div className="p-3 rounded-xl bg-white/90 border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Party & Affiliation
                  </span>
                  <span className="font-headline font-extrabold text-xs sm:text-sm text-[#FF8500] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF8500]"></span>
                    {t('about.partyName')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/90 border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Constituency & Body
                  </span>
                  <span className="font-headline font-extrabold text-xs sm:text-sm text-[#168447] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#168447]"></span>
                    Ward 8 • Akluj Nagar Parishad
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/90 border border-gray-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Citizen Walk-In Desk
                  </span>
                  <span className="font-headline font-extrabold text-xs sm:text-sm text-[#0F172A] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Mon–Sat 10 AM – 1 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            TAB CONTENT 1: INTERACTIVE 4-STAGE PUBLIC SERVICE JOURNEY
            ========================================================= */}
        {activeTab === 'journey' && (
          <div className="animate-fade-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {publicJourney.map((item, idx) => {
                const isSelected = selectedMilestone === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedMilestone(idx)}
                    className={`bento-card p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-[#FF8500] shadow-lg -translate-y-1.5 bg-gradient-to-b from-orange-50/50 to-white'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono font-extrabold text-xs text-gray-400">
                          STAGE {item.step}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#DE7200]">
                          {item.category}
                        </span>
                      </div>

                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 shadow-xs"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>

                      <h4 className="font-headline font-bold text-sm text-[#0F172A] mb-1.5 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-[#168447]">✓ {item.highlight}</span>
                      <span className="text-gray-400">{isSelected ? '● Selected' : 'View'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB CONTENT 2: 4 STRATEGIC VISION PILLARS
            ========================================================= */}
        {activeTab === 'vision' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-5">
            {visionGoals.map((goal, idx) => (
              <div
                key={idx}
                className="bento-card p-6 flex items-start gap-4 hover:border-[#168447]/50"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 flex items-center justify-center text-[#168447] shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[26px]">{goal.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-headline font-bold text-base text-[#0F172A]">
                      {goal.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-green-50 text-emerald-800 border border-green-200">
                      {goal.stat}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================
            TAB CONTENT 3: CORE GUIDING VALUES
            ========================================================= */}
        {activeTab === 'values' && (
          <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((val, idx) => (
              <div key={idx} className="bento-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-2xs"
                      style={{
                        backgroundColor: `${val.accentColor}15`,
                        color: val.accentColor,
                      }}
                    >
                      <span className="material-symbols-outlined text-[22px]">{val.icon}</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-mono">
                      {val.tag}
                    </span>
                  </div>

                  <h4 className="font-headline font-bold text-base text-[#0F172A] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                  <span className="material-symbols-outlined text-[15px] text-[#168447]">
                    check_circle
                  </span>
                  <span>{isMr ? 'कठोर पालन' : 'Civic Standard'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================================
            TAB CONTENT 4: CREDENTIALS & SECRETARIAT ACCESS
            ========================================================= */}
        {activeTab === 'credentials' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Credentials Card */}
            <div className="bento-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">school</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-[#0F172A]">
                    {t('about.eduTitle')}
                  </h4>
                  <p className="text-xs text-gray-500">Verified Academic & Public Administration Credentials</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#FF8500]">● Graduation:</span>
                  <span className="text-gray-800 font-medium">Bachelor of Commerce (B.Com) – Savitribai Phule Pune University</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#168447]">● Diploma:</span>
                  <span className="text-gray-800 font-medium">Urban Local Self-Governance & Civic Administration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">● Representation:</span>
                  <span className="text-gray-800 font-medium">Solapur District Municipal Representation Forum</span>
                </div>
              </div>
            </div>

            {/* Secretariat Access Card */}
            <div className="bento-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-[#FF8500] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">apartment</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-[#0F172A]">
                    {t('about.secretariatTitle')}
                  </h4>
                  <p className="text-xs text-gray-500">{t('about.secretariatSub')}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FF8500] text-[16px]">location_on</span>
                  <span>Near Sangam Chowk, Main Sangam Road, Akluj 413101</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#168447] text-[16px]">schedule</span>
                  <span>Public Consultations: Monday to Saturday 10:00 AM – 1:00 PM</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[16px]">call</span>
                  <span>Direct Hotline: 02185-222008 / WhatsApp: 98220 00008</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-all active:scale-95"
                >
                  <span>{isMr ? 'थेट संदेश पाठवा' : 'Send Direct Message'}</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
