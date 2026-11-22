import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";

/* Same font system as Home: Cormorant Garamond (headings) + Lato (body).
   Tip: move this to index.css / tailwind.config once so every page shares it. */
function AboutStyles() {
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


function About({ onOpenModal }) {

    const WHO_WE_ARE_FEATURES = [
        {
            title: 'People First',
            description: 'Prioritizing genuine cultural fit and career aspirations.',
            icon: 'heart',
        },
        {
            title: 'Integrity & Trust',
            description: 'Transparent communication at every step of hiring.',
            icon: 'shield',
        },
        {
            title: 'Rapid Sourcing',
            description: 'Quick turnaround with curated shortlists in days.',
            icon: 'bolt',
        },
        {
            title: 'End-to-End Support',
            description: 'From initial screening to seamless onboarding.',
            icon: 'check',
        },
    ];

    function WhoWeAreIcon({ type }) {
        const iconClass = 'w-5 h-5 text-[#0F2854] transition-transform duration-300 group-hover:scale-110';

        if (type === 'heart') {
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                </svg>
            );
        }

        if (type === 'shield') {
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            );
        }

        if (type === 'bolt') {
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
        }

        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    }

    const APPROACH_STEPS = [
        {
            step: 'Step 01',
            title: 'Understand',
            description: 'We analyze role requirements, company culture, and performance KPIs.',
            icon: 'search',
        },
        {
            step: 'Step 02',
            title: 'Screen & Match',
            description: 'We filter top 5% talent through deep technical & behavioral screening.',
            icon: 'users',
        },
        {
            step: 'Step 03',
            title: 'Interview',
            description: 'We coordinate interview loops, manage feedback, and ensure alignment.',
            icon: 'building',
        },
        {
            step: 'Step 04',
            title: 'Placement',
            description: 'We assist in offer rollouts, smooth onboarding, and post-hire check-ins.',
            icon: 'check',
        },
    ];

    function ApproachStepIcon({ type }) {
        const iconClass =
            'w-4 h-4 sm:w-5 sm:h-5 text-[#173568] transition-transform duration-300 group-hover:scale-110';

        if (type === 'search') {
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                </svg>
            );
        }

        if (type === 'users') {
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            );
        }

        if (type === 'building') {
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            );
        }

        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    }
    return (
        <MotionConfig reducedMotion="user">
            <div className="tb-root w-full overflow-x-clip">
                <AboutStyles />
                <ScrollExtras />

                {/* ABOUT HERO SECTION */}
                <section className="relative bg-[#F4F6F9] border-b border-slate-200/80 overflow-hidden">
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
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            {/* LEFT CONTENT */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-5 sm:space-y-6"
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3266bb]/20 bg-[#E6ECF5] text-[#17376b] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider">
                                    <svg
                                        className="w-3.5 h-3.5 text-[#3266bb] shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zM19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14z"
                                        />
                                    </svg>
                                    <span>About TalentBridge</span>
                                </div>

                                {/* Heading */}
                                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] text-slate-900 leading-[1.12] tracking-tight">
                                    Connecting Ambition With{' '}
                                    <span className="tb-shimmer-light">
                                        Opportunity.
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                                    We bridge the gap between high-performing talent and
                                    forward-thinking organizations, making recruitment
                                    fast, transparent, and people-centered.
                                </p>

                                {/* Statistics */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="inline-flex items-center bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl shadow-sm p-4 sm:p-5 max-w-full"
                                >
                                    {/* Stat 1 */}
                                    <div className="px-2.5 sm:px-5 text-center">
                                        <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#092452]"><CountUp to={8} suffix="+" /></h3>
                                        <p className="font-sans text-[10px] sm:text-xs text-slate-500 mt-1 whitespace-nowrap">
                                            Years of Trust
                                        </p>
                                    </div>

                                    <div className="w-px h-10 bg-slate-200" />

                                    {/* Stat 2 */}
                                    <div className="px-2.5 sm:px-5 text-center">
                                        <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#092452]"><CountUp to={500} suffix="+" /></h3>
                                        <p className="font-sans text-[10px] sm:text-xs text-slate-500 mt-1 whitespace-nowrap">
                                            Placements
                                        </p>
                                    </div>

                                    <div className="w-px h-10 bg-slate-200" />

                                    {/* Stat 3 */}
                                    <div className="px-2.5 sm:px-5 text-center">
                                        <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#092452]"><CountUp to={98} suffix="%" /></h3>
                                        <p className="font-sans text-[10px] sm:text-xs text-slate-500 mt-1 whitespace-nowrap">
                                            Retention Rate
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* RIGHT IMAGE */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                {/* Image Container */}
                                <div aria-hidden="true" className="absolute inset-0 translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4 rounded-2xl border-2 border-[#3266bb]/30" />
                                <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-slate-200 shadow-xl group">
                                    <img
                                        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
                                        alt="TalentBridge team collaborating"
                                        loading="lazy"
                                        className="block h-[280px] w-full object-cover object-center sm:h-[380px] lg:h-[350px] xl:h-[380px] transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Image Overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                                </div>

                                {/* Floating Talent Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -4 }}
                                    className="group/badge absolute bottom-5 left-4 sm:left-5 bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-xl shadow-xl p-3 sm:p-4 flex items-center gap-3 max-w-[240px]"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-[#092452] group-hover/badge:bg-[#2263ca] text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                                        <svg
                                            className="w-5 h-5 transition-transform duration-300 group-hover/badge:scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            viewBox="0 0 24 24"
                                        >
                                            <rect x="3" y="7" width="18" height="14" rx="2" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        <h4 className="font-display text-lg font-bold text-slate-900 whitespace-nowrap">
                                            Top 5% Talent
                                        </h4>

                                        <p className="font-sans text-[11px] text-slate-500 mt-0.5">
                                            Pre-screened &amp; vetted
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>



                {/* =========================================================
          WHO WE ARE SECTION
         ========================================================= */}
                <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        {/* Left Column: Image + 8+ Years Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -28 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                                    alt="TalentBridge Recruitment Leadership"
                                    className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

                                {/* Bottom-Right Floating Stat Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 18, scale: 0.96 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 bg-[#0B1F44]/95 backdrop-blur-md text-white px-5 py-4 sm:px-6 sm:py-5 rounded-xl shadow-2xl border border-white/10 text-center max-w-[210px]"
                                >
                                    <p className="font-display font-bold text-3xl sm:text-4xl text-white leading-none"><CountUp to={8} suffix="+" /></p>
                                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5 leading-snug">
                                        Years of Recruitment Excellence
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column: Heading + 4 Feature Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 28 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-7 space-y-5 sm:space-y-6"
                        >
                            <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                                Who We Are
                            </span>

                            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] text-slate-900 leading-[1.12] tracking-tight">
                                Recruitment is about{' '}
                                <span className="text-[#0F2854]">people, not just positions.</span>
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                                At TalentBridge, we believe every successful hire begins with deep empathy and precise
                                alignment. We take time to understand both business goals and individual aspirations.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                {WHO_WE_ARE_FEATURES.map((item, idx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 'some' }}
                                        transition={{
                                            duration: 0.45,
                                            delay: 0.12 + idx * 0.08,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        whileHover={{ y: -4 }}
                                        className="group relative overflow-hidden bg-white/90 hover:bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 hover:border-[#0F2854]/40 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-3.5"
                                    >
                                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                        <div className="w-10 h-10 rounded-lg bg-[#E9EEF6] group-hover:bg-[#0F2854]/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:-rotate-6">
                                            <WhoWeAreIcon type={item.icon} />
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* OUR MISSION & OUR VISION SECTION */}
                <section className="py-14 sm:py-20 bg-[#F5F7FA] overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                            {/* OUR MISSION CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -4 }}
                                className="group rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-slate-300 px-5 py-5 sm:px-7 sm:py-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[175px] sm:min-h-[195px]"
                            >
                                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                                    <div className="w-9 h-9 rounded-lg bg-[#E9EEF6] group-hover:bg-[#0F2854]/10 text-[#0F2854] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="9" />
                                            <circle cx="12" cy="12" r="4.5" />
                                            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                        </svg>
                                    </div>

                                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                        Our Mission
                                    </span>
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-snug tracking-[0.01em]">
                                        Empowering people &amp; building exceptional teams.
                                    </h3>

                                    <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed tracking-[0.005em]">
                                        To provide dependable, agile, and human-first talent solutions that create long-term value for growing enterprises and ambitious professionals alike.
                                    </p>
                                </div>
                            </motion.div>

                            {/* OUR VISION CARD */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -4 }}
                                className="group relative overflow-hidden [&>*]:relative before:content-[''] before:absolute before:-top-16 before:-right-16 before:w-56 before:h-56 before:rounded-full before:bg-blue-500/25 before:blur-3xl rounded-2xl bg-[#071937] hover:bg-[#091F44] border border-slate-800 hover:border-blue-500/40 px-5 py-5 sm:px-7 sm:py-6 text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[175px] sm:min-h-[195px]"
                            >
                                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                                    <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-blue-500/20 text-blue-300 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>

                                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                        Our Vision
                                    </span>
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug tracking-[0.01em]">
                                        Becoming India&apos;s most trusted recruitment partner.
                                    </h3>

                                    <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed tracking-[0.005em]">
                                        To pioneer modern hiring standards where finding top talent or ideal career roles is seamless, transparent, and founded on lasting relationships.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
                {/* =========================================================
          OUR APPROACH — 4-STEP METHODOLOGY
         ========================================================= */}
                <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5"
                        >
                            <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                                Our Approach
                            </span>

                            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[48px] text-slate-900 leading-[1.12] tracking-tight">
                                A structured formula for{' '}
                                <span className="text-[#397deb]">successful hiring.</span>
                            </h2>

                            <p className="font-sans text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed">
                                Our streamlined 4-step methodology guarantees speed, precision, and mutual satisfaction.
                            </p>
                        </motion.div>

                        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            <motion.div
                                aria-hidden="true"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="hidden lg:block absolute top-[42px] left-[12%] right-[12%] h-0.5 origin-left bg-gradient-to-r from-[#3266bb]/10 via-[#3266bb]/50 to-teal-400/50"
                            />
                            {APPROACH_STEPS.map((item, idx) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 22 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{
                                        duration: 0.48,
                                        delay: idx * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{ y: -5 }}
                                    className="group relative z-10 rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#123060]/40 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[210px] sm:min-h-[235px]"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-7 sm:mb-8">
                                            <span className="px-3 py-1 rounded-md bg-[#E6ECF5] group-hover:bg-[#173568] text-[#173568] group-hover:text-white text-xs font-bold tracking-wide transition-colors duration-300">
                                                {item.step}
                                            </span>

                                            <div className="w-9 h-9 rounded-lg bg-[#E6ECF5]/80 group-hover:bg-[#173568]/10 flex items-center justify-center transition-colors shrink-0">
                                                <ApproachStepIcon type={item.icon} />
                                            </div>
                                        </div>

                                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mb-2 tracking-tight">
                                            {item.title}
                                        </h3>

                                        <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =========================================================
          LET'S COLLABORATE — CTA BANNER
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
                            <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.2em] text-blue-100/90">
                                Let&apos;s Collaborate
                            </span>

                            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-[52px] text-white leading-tight tracking-tight">
                                Ready to transform your hiring or career?
                            </h2>

                            <p className="font-sans text-blue-100/85 text-xs sm:text-sm lg:text-base leading-relaxed">
                                Connect with our recruitment experts today and discover the right opportunities.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0"
                        >
                            <motion.a
                                href="/#jobs"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-3 rounded-lg bg-white hover:bg-slate-100 text-[#0670b8] text-xs sm:text-sm font-bold shadow-sm transition inline-flex items-center justify-center gap-2"
                            >
                                <span>Explore Jobs</span>
                                <span aria-hidden="true">→</span>
                            </motion.a>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => (onOpenModal ? onOpenModal('employerModal') : (window.location.href = '/#contact'))}
                                className="px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm transition cursor-pointer inline-flex items-center justify-center"
                            >
                                Hire Top Talent
                            </motion.button>
                        </motion.div>
                    </div>
                </section>

            </div>
        </MotionConfig>
    );
}

export default About