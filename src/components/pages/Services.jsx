import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/* Same font system as Home: Cormorant Garamond (headings) + Lato (body).
   Tip: move this to index.css / tailwind.config once so every page shares it. */
function ServicesStyles() {
    return (
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;500;600;700;800&display=swap');
          html { scroll-behavior: smooth; }
          ::selection { background: rgba(45, 212, 191, 0.3); }
          .tb-root, .tb-root .font-sans { font-family: 'Lato', sans-serif; }
          .tb-root .font-display { font-family: 'Cormorant Garamond', serif; letter-spacing: -0.01em; }
          @keyframes tb-shine { to { background-position: -200% 0; } }
          .tb-shimmer-light { background-image: linear-gradient(90deg, #3266bb, #0F2854 50%, #3266bb); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: tb-shine 5s linear infinite; }
          @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .tb-shimmer-light { animation: none; } }
        `}</style>
    );
}

function CountUp({ to, suffix = '', duration = 1.6 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduce = useReducedMotion();
    const [val, setVal] = useState(reduce ? to : 0);

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, to, duration, reduce]);

    return <span ref={ref}>{val}{suffix}</span>;
}

function ScrollExtras() {
    const [showTop, setShowTop] = useState(false);
    const { scrollYProgress } = useScroll();
    const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 600);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.div
                aria-hidden="true"
                style={{ scaleX: progressX }}
                className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-teal-400 via-[#3266bb] to-blue-600"
            />
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        type="button"
                        aria-label="Back to top"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-[#092452] hover:bg-blue-700 text-white shadow-lg shadow-slate-900/25 flex items-center justify-center cursor-pointer transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}




const SERVICE_PILLS = [
    {
        label: 'Permanent Hiring',
        note: 'Full-cycle mid-to-senior hiring with replacement assurance.',
    },
    {
        label: 'Contract Staffing',
        note: 'Agile project & on-demand workforce scaling with zero compliance friction.',
    },
    {
        label: 'IT & Tech',
        note: 'Vetted engineering, cloud, product, and digital talent.',
    },
    {
        label: 'Executive Search',
        note: 'Confidential leadership & high-impact strategic roles.',
    },
];

const OFFERINGS = [
    {
        num: '01',
        title: 'Permanent Recruitment',
        description:
            'End-to-end talent acquisition for full-time roles, connecting you with committed professionals tailored to your culture.',
        bullets: [
            'Multi-tier skill & culture screening',
            'Comprehensive reference verification',
        ],
        icon: 'briefcase',
    },
    {
        num: '02',
        title: 'Contract Staffing',
        description:
            'Agile, on-demand workforce solutions that let you scale your project teams quickly without administrative overhead.',
        bullets: [
            'Rapid deployment within 48–72 hrs',
            'Flexible short & long-term models',
        ],
        icon: 'users',
    },
    {
        num: '03',
        title: 'Tech & IT Recruitment',
        description:
            'Specialized hiring for software engineers, cloud architects, product managers, and niche technical leads.',
        bullets: [
            'Hands-on technical assessment',
            'Access to passive tech talent pools',
        ],
        icon: 'code',
    },
    {
        num: '04',
        title: 'Executive Search',
        description:
            'Discreet and targeted headhunting for Director, VP, and C-level leadership positions that drive organizational vision.',
        bullets: [
            '100% confidential search process',
            'Deep leadership track-record vetting',
        ],
        icon: 'exec',
    },
    {
        num: '05',
        title: 'HR Consulting',
        description:
            'Strategic guidance on organizational restructuring, compensation benchmarking, performance systems, and retention.',
        bullets: [
            'Workforce & policy optimization',
            'Retention & culture alignment',
        ],
        icon: 'clipboard',
    },
    {
        num: '06',
        title: 'Payroll & Compliance',
        description:
            'Reliable payroll management and statutory compliance support, eliminating legal risks and administrative burdens.',
        bullets: [
            'Statutory tax & labor compliance',
            'Seamless employee documentation',
        ],
        icon: 'document',
    },
];

const ADVANTAGE_ITEMS = [
    {
        title: 'Top 5% Pre-Vetted Talent',
        description: 'Every candidate undergoes multi-stage technical and behavioral evaluation.',
        icon: 'bolt',
    },
    {
        title: 'Fast Turnaround Times',
        description: 'Receive benchmarked shortlists within 48 to 72 hours of requirement sign-off.',
        icon: 'clock',
    },
    {
        title: '90-Day Placement Guarantee',
        description: 'Complete peace of mind with our complimentary replacement guarantee.',
        icon: 'shield',
    },
];

function AdvantageIcon({ type, isActive }) {
    const baseClass = `w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive ? 'text-white scale-105' : 'text-[#173568] group-hover:scale-110'
        }`;

    if (type === 'bolt') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        );
    }

    if (type === 'clock') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        );
    }

    return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        </svg>
    );
}

function OfferingIcon({ type, isActive }) {
    const baseClass = `w-5 h-5 transition-transform duration-300 ${isActive ? 'text-white scale-105' : 'text-[#173568] group-hover:scale-110'
        }`;

    if (type === 'briefcase') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        );
    }

    if (type === 'users') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        );
    }

    if (type === 'code') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        );
    }

    if (type === 'exec') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zm8-3l2 2m0 0l-2 2m2-2h-4"
                />
            </svg>
        );
    }

    if (type === 'clipboard') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
            </svg>
        );
    }

    return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
    );



}

export default function ServicesPage({ onOpenModal, onSelectService }) {
    const [activePill, setActivePill] = useState(0);
    const [activeOffering, setActiveOffering] = useState(0);
    const [activeAdvantage, setActiveAdvantage] = useState(0);

    const currentService = SERVICE_PILLS[activePill];

    return (
        <MotionConfig reducedMotion="user">
            <div className="tb-root w-full overflow-x-clip bg-[#F4F6F9]">
                <ServicesStyles />
                <ScrollExtras />
                {/* =========================================================
                SECTION 1: SERVICES HERO (OUR RECRUITMENT SOLUTIONS)
               ========================================================= */}
                <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F4F6F9] border-b border-slate-200/80 overflow-hidden">
                    {/* Jobs Page Style Subtle Dot Matrix Background */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {/* Soft Ambient Blur Glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-[#3266bb]/10 blur-3xl"
                    />

                    <motion.div
                        aria-hidden="true"
                        animate={{ x: [0, 40, 0], y: [0, -24, 0] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                        className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl"
                    />
                    <motion.div
                        aria-hidden="true"
                        animate={{ x: [0, -36, 0], y: [0, 28, 0] }}
                        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
                        className="pointer-events-none absolute -top-16 right-0 w-96 h-96 rounded-full bg-[#3266bb]/10 blur-3xl"
                    />
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 space-y-5 sm:space-y-6"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6ECF5] border border-[#3266bb]/20 text-[#17376b] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider"
                            >
                                <svg
                                    className="w-3.5 h-3.5 text-[#3266bb] shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                </svg>
                                <span>Our Recruitment Solutions</span>
                            </motion.div>

                            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-[66px] text-slate-900 leading-[1.08] tracking-tight">
                                Strategic Talent Solutions for{' '}
                                <span className="tb-shimmer-light">Modern Businesses.</span>
                            </h1>

                            <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                                From full-cycle permanent hiring to specialized tech recruitment and executive search, we deliver top-tier candidates with speed, precision, and guaranteed retention.
                            </p>

                            {/* Quick Service Chips */}
                            <div className="flex flex-wrap gap-2.5 pt-1">
                                {SERVICE_PILLS.map((pill, idx) => {
                                    const isSelected = activePill === idx;

                                    return (
                                        <motion.button
                                            key={pill.label}
                                            type="button"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onMouseEnter={() => {
                                                setActivePill(idx);
                                                setActiveOffering(idx);
                                            }}
                                            onClick={() => {
                                                setActivePill(idx);
                                                setActiveOffering(idx);
                                                if (onSelectService) onSelectService(pill.label);
                                            }}
                                            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'bg-white text-[#17376b] border-[#3266bb]/45 shadow-sm'
                                                : 'bg-white/85 text-slate-700 border-slate-200/90 hover:bg-white hover:border-[#3266bb]/30'
                                                }`}
                                        >
                                            {pill.label}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <motion.p key={activePill} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="font-sans text-xs sm:text-sm text-slate-500 font-medium pt-0.5">
                                <span className="font-bold text-[#17376b]">{currentService.label}:</span>{' '}
                                {currentService.note}
                            </motion.p>
                        </motion.div>

                        {/* Right Column: Feature Photo + Floating Stat Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6"
                        >
                            <div className="relative">
                                <div aria-hidden="true" className="absolute inset-0 translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4 rounded-2xl border-2 border-[#3266bb]/30" />
                                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
                                    <img
                                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80"
                                        alt="Strategic Talent Consultation"
                                        className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

                                    {/* Floating Match Accuracy Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 'some' }}
                                        transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -3 }}
                                        className="group/badge absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:px-4 sm:py-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3.5 max-w-sm"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-[#092452] group-hover/badge:bg-[#2263ca] text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover/badge:scale-110"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                                                <CountUp to={98} suffix="%" /> Match Accuracy
                                            </p>
                                            <p className="font-sans text-[11px] text-slate-500 mt-0.5 truncate">
                                                Pre-screened &amp; benchmarked talent
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 2: WHAT WE OFFER (6 SERVICE CARDS)
         ========================================================= */}
                <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5"
                        >
                            <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                                What We Offer
                            </span>

                            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[52px] text-slate-900 leading-[1.12] tracking-tight">
                                Comprehensive solutions for{' '}
                                <span className="text-[#3375e0]">every hiring need.</span>
                            </h2>

                            <p className="font-sans text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Whether you are scaling a fast-growing startup or hiring for specialized enterprise roles, we deliver high-caliber talent
                            </p>
                        </motion.div>

                        {/* 6-Card Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {OFFERINGS.map((item, idx) => {
                                const isActive = activeOffering === idx;

                                return (
                                    <motion.div
                                        key={item.num}
                                        initial={{ opacity: 0, y: 22 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 'some' }}
                                        transition={{
                                            duration: 0.48,
                                            delay: idx * 0.07,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        whileHover={{ y: -5 }}
                                        onMouseEnter={() => setActiveOffering(idx)}
                                        onClick={() => setActiveOffering(idx)}
                                        className={`group relative overflow-hidden rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${isActive
                                            ? 'bg-white border-[#123060]/45 shadow-lg shadow-slate-900/5'
                                            : 'bg-white/85 hover:bg-white border-slate-200/90 hover:border-[#123060]/35 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                        <div>
                                            {/* Top Row: Icon + Number */}
                                            <div className="flex items-center justify-between gap-3 mb-6">
                                                <div
                                                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:-rotate-6 ${isActive
                                                        ? 'bg-[#0B2D63] shadow-sm'
                                                        : 'bg-[#E6ECF5] group-hover:bg-[#0B2D63]'
                                                        }`}
                                                >
                                                    <OfferingIcon type={item.icon} isActive={isActive} />
                                                </div>

                                                <span className="font-display text-3xl font-bold text-slate-300 group-hover:text-[#3266bb] transition-colors duration-300">
                                                    {item.num}
                                                </span>
                                            </div>

                                            {/* Title & Description */}
                                            <h3 className="font-display font-bold text-2xl sm:text-[28px] text-slate-900 mb-2 tracking-tight">
                                                {item.title}
                                            </h3>

                                            <p className="font-sans text-slate-500 text-sm sm:text-[15px] leading-relaxed">
                                                {item.description}
                                            </p>

                                            {/* Divider + Bullet Points */}
                                            <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2.5">
                                                {item.bullets.map((bullet) => (
                                                    <div
                                                        key={bullet}
                                                        className="flex items-start gap-2.5 text-sm text-slate-600 font-medium"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 text-[#123060] shrink-0 mt-0.5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        <span>{bullet}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Enquire Now CTA */}
                                        <div className="mt-6 pt-1">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (onSelectService) onSelectService(item.title);
                                                    if (onOpenModal) {
                                                        onOpenModal('employerModal');
                                                    } else {
                                                        window.location.href = '/#contact';
                                                    }
                                                }}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2D63] hover:text-blue-700 transition cursor-pointer"
                                            >
                                                <span>Enquire Now</span>
                                                <span
                                                    aria-hidden="true"
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                >
                                                    →
                                                </span>
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 3: THE TALENTBRIDGE ADVANTAGE
         ========================================================= */}
                <section className="py-12 sm:py-24 bg-[#F4F6F9] border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left Column: Meeting Image + 72-Hour Delivery Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -26 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                                    alt="TalentBridge Recruitment Strategy Session"
                                    className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

                                {/* Bottom-Left Floating Stat Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.48, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:px-4 sm:py-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3.5 max-w-xs"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#0B2D63] text-white flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                                            72-Hour Delivery
                                        </p>
                                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                                            Average initial shortlist delivery
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column: Heading + 3 Advantage Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 26 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.58, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 space-y-4 sm:space-y-5"
                        >
                            <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                The TalentBridge Advantage
                            </span>

                            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[46px] text-slate-900 leading-[1.18] tracking-tight">
                                Hiring with{' '}
                                <span className="text-[#123060]">precision, speed &amp; certainty.</span>
                            </h2>

                            <p className="font-sans text-slate-500 text-xs sm:text-[13.5px] leading-relaxed max-w-xl">
                                We eliminate the guesswork in recruitment. Our structured assessment model and dedicated industry recruiters ensure you only meet candidates who fit your requirements
                            </p>

                            <div className="space-y-3 pt-1">
                                {ADVANTAGE_ITEMS.map((item, idx) => {
                                    const isActive = activeAdvantage === idx;

                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 'some' }}
                                            transition={{
                                                duration: 0.45,
                                                delay: 0.12 + idx * 0.08,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{ x: 4 }}
                                            onMouseEnter={() => setActiveAdvantage(idx)}
                                            onClick={() => setActiveAdvantage(idx)}
                                            className={`group relative overflow-hidden rounded-xl p-3.5 sm:p-4 border transition-all duration-300 cursor-pointer flex items-start gap-3 sm:gap-3.5 ${isActive
                                                ? 'bg-white border-[#123060]/45 shadow-md'
                                                : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-[#123060]/30 shadow-sm'
                                                }`}
                                        >
                                            <span aria-hidden="true" className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3266bb] to-teal-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                            <div
                                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${isActive
                                                    ? 'bg-[#0B2D63] shadow-sm'
                                                    : 'bg-[#E6ECF5] group-hover:bg-[#0B2D63]'
                                                    }`}
                                            >
                                                <AdvantageIcon type={item.icon} isActive={isActive} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                                                    {item.title}
                                                </h3>
                                                <p className="font-sans text-slate-500 text-[11.5px] sm:text-xs mt-0.5 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 4: FOR JOB SEEKERS & FOR EMPLOYERS CARDS
         ========================================================= */}
                <section className="py-12 sm:py-16 bg-white border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">
                            {/* FOR JOB SEEKERS CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -5 }}
                                className="group rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#0B2D63]/35 p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[225px] sm:min-h-[250px]"
                            >
                                <div className="space-y-2.5 sm:space-y-3">
                                    <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#0B2D63] transition-colors">
                                        For Job Seekers
                                    </span>

                                    <h3 className="font-display font-bold text-3xl sm:text-[34px] text-slate-900 leading-snug tracking-tight">
                                        Looking for your next career breakthrough?
                                    </h3>

                                    <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                                        Explore verified job openings across leading tech, finance, and enterprise companies. Get personalized guidance throughout your interview cycle.
                                    </p>
                                </div>

                                <div className="pt-6">
                                    <motion.a
                                        href="/#jobs"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            if (onSelectService) onSelectService('Job Seeker');
                                        }}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#092452] hover:bg-[#0D316E] text-white text-xs sm:text-[13px] font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <span>Explore Open Jobs</span>
                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </motion.a>
                                </div>
                            </motion.div>

                            {/* FOR EMPLOYERS CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -5 }}
                                className="group relative overflow-hidden [&>*]:relative before:content-[''] before:absolute before:-top-16 before:-right-16 before:w-56 before:h-56 before:rounded-full before:bg-blue-500/25 before:blur-3xl rounded-2xl bg-[#071937] hover:bg-[#0A2148] border border-slate-800 hover:border-blue-400/35 p-6 sm:p-8 lg:p-9 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[225px] sm:min-h-[250px]"
                            >
                                <div className="space-y-2.5 sm:space-y-3">
                                    <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-300 transition-colors">
                                        For Employers
                                    </span>

                                    <h3 className="font-display font-bold text-3xl sm:text-[34px] text-white leading-snug tracking-tight">
                                        Need high-performing talent to scale faster?
                                    </h3>

                                    <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                                        Tell us your role specifications and let our specialized recruitment consultants deliver top candidates matched to your exact business goals.
                                    </p>
                                </div>

                                <div className="pt-6">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            if (onSelectService) onSelectService('Employer Shortlist');
                                            if (onOpenModal) {
                                                onOpenModal('employerModal');
                                            } else {
                                                window.location.href = '/#contact';
                                            }
                                        }}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16366B] hover:bg-[#1E4484] border border-white/10 text-white text-xs sm:text-[13px] font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                                    >
                                        <span>Request Talent Shortlist</span>
                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 5: GET STARTED TODAY CTA BANNER
         ========================================================= */}
                <section className="relative py-12 sm:py-16 bg-[#0670b8] text-white overflow-hidden">
                    {/* Background Decoration */}
                    <motion.div aria-hidden="true" animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-32 -right-20 w-80 h-80 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
                    {/* Square Grid Background */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{
                            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.45) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(255,255,255,0.45) 2px, transparent 2px)
            `,
                            backgroundSize: '45px 45px',
                        }}
                    />
                    <motion.div aria-hidden="true" animate={{ x: [0, 50, 0], y: [0, -26, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-cyan-300/15 blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-2 max-w-2xl"
                        >
                            <span className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-100/90">
                                Get Started Today
                            </span>

                            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[50px] text-white leading-tight tracking-tight">
                                Let&apos;s build your dream team together.
                            </h2>

                            <p className="font-sans text-blue-100/85 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                                Partner with TalentBridge for reliable, fast, and high-impact hiring solutions
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="shrink-0"
                        >
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    if (onOpenModal) {
                                        onOpenModal('employerModal');
                                    } else {
                                        window.location.href = '/#contact';
                                    }
                                }}
                                className="group w-full sm:w-auto px-5 py-3 rounded-lg bg-[#E9EDF2] hover:bg-white text-[#0B2D63] text-xs sm:text-[13px] font-bold shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                <span>Contact Our Consultants</span>
                                <span
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </div>
        </MotionConfig>
    );
}