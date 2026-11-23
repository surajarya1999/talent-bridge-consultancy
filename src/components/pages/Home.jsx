import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const HERO_SLIDES = [
    {
        badge: 'For Growing Enterprises & Startups',
        badgeColor: 'teal',
        titlePrefix: 'Close Critical Tech & Leadership Roles in',
        titleHighlight: 'Under 14 Days',
        highlightClass: 'text-teal-400',
        description:
            'We help businesses build high-performing teams through precision candidate screening, domain-focused recruitment, and dedicated HR advisory across Indore, Bhopal, and Pan-India.',
        primaryCta: {
            label: 'Request Shortlisted Profiles →',
            modal: 'employerModal',
            className: 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20',
        },
        secondaryCta: { label: 'Explore Hiring Solutions', href: '#services' },
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80',
        alt: 'Executive Recruitment Strategy',
        cardType: 'stats',
    },
    {
        badge: 'Specialized IT & Digital Talent',
        badgeColor: 'blue',
        titlePrefix: 'Build High-Performing',
        titleHighlight: 'Engineering & Product',
        titleSuffix: 'Teams',
        highlightClass: 'text-blue-400',
        description:
            'Access pre-vetted Full-Stack Developers, Cloud Architects, QA Engineers, and Product Managers screened for technical depth and long-term culture fit.',
        primaryCta: {
            label: 'Hire Vetted Tech Talent →',
            modal: 'employerModal',
            className: 'bg-blue-500 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25',
        },
        secondaryCta: { label: 'See 4-Step Screening', href: '#process' },
        image: 'https://plus.unsplash.com/premium_photo-1723802464689-411ae08ad38e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        fallbackImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
        alt: 'IT and Tech Recruitment',
        cardType: 'domains',
    },
    {
        badge: 'For Ambitious Professionals',
        badgeColor: 'teal',
        titlePrefix: 'Accelerate Your Career with',
        titleHighlight: 'Top Hiring Partners',
        highlightClass: 'text-teal-400',
        description:
            'Connect directly with verified employers in Indore, Bhopal, and remote teams across India. Zero candidate fees, transparent interview feedback, and salary negotiation support.',
        primaryCta: {
            label: 'Browse Live Openings →',
            href: '#jobs',
            className: 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20',
        },
        secondaryCta: { label: 'Submit Your CV', modal: 'candidateModal' },
        image: 'https://images.unsplash.com/photo-1758518730037-a16581a040e8?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
        fallbackImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80',
        alt: 'Career Growth Opportunities',
        cardType: 'candidate',
    },
];

const COMPANIES = [
    { name: 'NexaCloud Technologies', dot: 'bg-blue-600' },
    { name: 'FinEdge Systems', dot: 'bg-teal-500' },
    { name: 'Central India Infra Ltd', dot: 'bg-indigo-600' },
    { name: 'MediCare HealthOps', dot: 'bg-emerald-500' },
    { name: 'DataPulse Analytics', dot: 'bg-blue-700' },
    { name: 'AeroLogix Supply Chain', dot: 'bg-cyan-600' },
    { name: 'QuantumSoft Labs', dot: 'bg-teal-600' },
    { name: 'Apex Retail Group', dot: 'bg-blue-600' },
];

const SERVICES = [
    {
        num: '01',
        tag: 'Full-Time',
        title: 'Permanent Hiring',
        description:
            'Find skilled mid-to-senior professionals ready to grow with your team long term with replacement guarantee.',
        cta: 'Hire Permanent Staff →',
        accent: 'hover:border-blue-600/50',
        badgeClass: 'text-teal-600 bg-teal-50',
        iconClass: 'bg-blue-700/10 text-blue-700',
        linkClass: 'text-blue-700',
    },
    {
        num: '02',
        tag: 'Flexible',
        title: 'Contract Staffing',
        description:
            'Agile workforce solutions to scale your project teams quickly on demand with zero compliance overhead.',
        cta: 'Scale Contract Team →',
        accent: 'hover:border-teal-600/50',
        badgeClass: 'text-blue-700 bg-blue-50',
        iconClass: 'bg-teal-600/10 text-teal-700',
        linkClass: 'text-teal-700',
    },
    {
        num: '03',
        tag: 'Tech & SaaS',
        title: 'IT Recruitment',
        description:
            'Connect with vetted software engineers, full-stack developers, DevOps, and product specialists.',
        cta: 'Hire Tech Talent →',
        accent: 'hover:border-blue-600/50',
        badgeClass: 'text-teal-600 bg-teal-50',
        iconClass: 'bg-blue-700/10 text-blue-700',
        linkClass: 'text-blue-700',
    },
    {
        num: '04',
        tag: 'Advisory',
        title: 'HR Consulting',
        description:
            'Strategic HR support, compensation benchmarking, and hiring workflow optimization for growing organizations.',
        cta: 'Book HR Consultation →',
        accent: 'hover:border-teal-600/50',
        badgeClass: 'text-blue-700 bg-blue-50',
        iconClass: 'bg-teal-600/10 text-teal-700',
        linkClass: 'text-teal-700',
    },
];

const JOBS = [
    {
        location: 'Indore',
        department: 'IT & Engineering',
        deptClass: 'bg-blue-50 text-blue-700',
        type: 'Full Time',
        title: 'Software Developer (React / Node.js)',
        meta: 'Indore · 2–5 Years Exp · ₹6.5 – 11 LPA',
        description:
            'Build scalable web applications for a fast-growing SaaS product partner in Vijay Nagar, Indore.',
        applyRole: 'Software Developer (Indore)',
    },
    {
        location: 'Bhopal',
        department: 'Human Resources',
        deptClass: 'bg-teal-50 text-teal-700',
        type: 'Full Time',
        title: 'HR Executive & Talent Partner',
        meta: 'Bhopal · 1–4 Years Exp · ₹3.6 – 5.5 LPA',
        description:
            'Manage end-to-end talent acquisition, onboarding workflows, and employee engagement operations.',
        applyRole: 'HR Executive (Bhopal)',
    },
    {
        location: 'Remote',
        department: 'Cloud & DevOps',
        deptClass: 'bg-indigo-50 text-indigo-700',
        type: 'Remote',
        title: 'Senior DevOps Engineer (AWS)',
        meta: 'Remote / Pan-India · 4–7 Years Exp · ₹14 – 22 LPA',
        description:
            'Architect CI/CD pipelines, Kubernetes clusters, and cloud security for a FinTech enterprise.',
        applyRole: 'Senior DevOps Engineer (Remote)',
    },
];

const JOB_FILTERS = [
    { key: 'All', label: 'All Roles' },
    { key: 'Indore', label: 'Indore' },
    { key: 'Bhopal', label: 'Bhopal' },
    { key: 'Remote', label: 'Remote / Hybrid' },
];

const PROCESS_STEPS = [
    {
        step: 'STEP 01',
        title: 'Understand',
        summary: 'We map your role requirements, team dynamic and growth goals.',
        highlight: 'Clear hiring brief, skill matrix & compensation alignment within 24 hours.',
        icon: 'search',
    },
    {
        step: 'STEP 02',
        title: 'Identify',
        summary: 'We screen and shortlist high-caliber talent from our network.',
        highlight: 'Technical & behavioral vetting across active and passive candidate pools.',
        icon: 'users',
    },
    {
        step: 'STEP 03',
        title: 'Connect',
        summary: 'We coordinate interviews and ensure mutual culture fit.',
        highlight: 'Seamless interview scheduling, structured scorecards & fast feedback loops.',
        icon: 'handshake',
    },
    {
        step: 'STEP 04',
        title: 'Place',
        summary: 'We guide final offers, onboarding and post-placement success.',
        highlight: 'Offer negotiation support, joining follow-ups & retention check-ins.',
        icon: 'document',
    },
];

const WHY_POINTS = [
    {
        text: 'Industry-focused recruitment expertise',
        focusMetric: 'impact',
        detail: 'Deep domain specialization across IT, SaaS, FinTech, and enterprise operations.',
    },
    {
        text: 'Thorough candidate screening',
        focusMetric: 'careers',
        detail: 'Multi-stage skill, communication, and culture-fit evaluation before submission.',
    },
    {
        text: 'Fast and transparent communication',
        focusMetric: 'companies',
        detail: 'Real-time updates, honest feedback loops, and predictable hiring timelines.',
    },
    {
        text: 'Long-term client relationships',
        focusMetric: 'impact',
        detail: 'Dedicated post-hiring partnership focused on retention and team scaling.',
    },
];

function StepIcon({ type, isActive }) {
    const baseClass = `w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-blue-700' : 'text-slate-600 group-hover:scale-110 group-hover:text-blue-700'
        }`;

    if (type === 'search') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
        );
    }

    if (type === 'users') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        );
    }

    if (type === 'handshake') {
        return (
            <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l4.5-4.5a2.121 2.121 0 013 0L18 10m-11 1l-3 3a2 2 0 000 2.828l1.172 1.172a2 2 0 002.828 0L12 15m-5-4l4 4m6-5l3 3a2 2 0 010 2.828l-1.172 1.172a2 2 0 01-2.828 0L12 15" />
            </svg>
        );
    }

    return (
        <svg className={baseClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};


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

    return (
        <span ref={ref}>
            {val}
            {suffix}
        </span>
    );
}

function JobCard({ job, onApplyRole, className = '', animated = false }) {
    const motionProps = animated
        ? {
            layout: true,
            initial: { opacity: 0, y: 20, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, scale: 0.96 },
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }
        : {};

    return (
        <motion.article
            {...motionProps}
            whileHover={{ y: -4 }}
            className={`group shrink-0 bg-white/95 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#3266bb]/45 shadow-2xs hover:shadow-xl transition-[box-shadow,border-color,background-color] duration-300 flex flex-col justify-between ${className}`}
        >
            <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${job.deptClass}`}>
                        {job.department}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{job.type}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-snug">{job.title}</h3>
                <p className="font-sans text-[11.5px] sm:text-xs font-medium text-slate-500 mt-1">{job.meta}</p>
                <p className="font-sans text-[11.5px] sm:text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                    {job.description}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onApplyRole && onApplyRole(job.applyRole)}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#092452] hover:bg-[#17376b] active:scale-[0.98] text-white text-xs font-bold shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
                <span>Quick Apply Now</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
        </motion.article>
    );
}

export default function Home({ onOpenModal, onApplyRole }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [activeStep, setActiveStep] = useState(0);
    const [activeWhyIndex, setActiveWhyIndex] = useState(0);
    const [showTop, setShowTop] = useState(false);
    const { scrollYProgress } = useScroll();
    const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 600);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isPaused]);

    const activeSlide = HERO_SLIDES[currentSlide];
    const visibleJobs =
        selectedLocation === 'All'
            ? JOBS
            : JOBS.filter((job) => job.location === selectedLocation);
    const currentProcess = PROCESS_STEPS[activeStep];
    const activeWhy = WHY_POINTS[activeWhyIndex];

    return (
        <MotionConfig reducedMotion="user">
            <div className="tb-root w-full overflow-x-clip">
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
                {/* =========================================================
          SECTION 1: HERO CAROUSEL
         ========================================================= */}
                <section
                    id="heroSection"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
                    onTouchEnd={(e) => {
                        const diff = e.changedTouches[0].screenX - touchStartX;
                        if (Math.abs(diff) > 50) {
                            if (diff < 0) {
                                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
                            } else {
                                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
                            }
                        }
                    }}
                    className="relative bg-[#172138] text-white overflow-hidden hero-font-body"
                >
                    <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;500;600;700;800&display=swap');

          .hero-font-body {
            font-family: 'Lato', sans-serif;
          }

          .hero-font-display {
            font-family: 'Cormorant Garamond', serif;
          }
          html { scroll-behavior: smooth; }
          ::selection { background: rgba(45, 212, 191, 0.3); }
          .tb-root, .tb-root .font-sans { font-family: 'Lato', sans-serif; }
          .tb-root .font-display, .tb-root .hero-font-display { font-family: 'Cormorant Garamond', serif; letter-spacing: -0.01em; }
          @keyframes tb-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes tb-shine { to { background-position: -200% 0; } }
          .tb-float { animation: tb-float 6s ease-in-out infinite; }
          .text-teal-400.tb-shimmer { --c: #2dd4bf; }
          .text-blue-400.tb-shimmer { --c: #60a5fa; }
          .tb-shimmer { background-image: linear-gradient(90deg, var(--c), #fff 50%, var(--c)); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: tb-shine 5s linear infinite; }
          @keyframes tb-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes tb-jobs { from { transform: translateX(0); } to { transform: translateX(-25%); } }
          @keyframes tb-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          .tb-marquee { animation: tb-marquee 40s linear infinite; width: max-content; }
          .tb-jobs { animation: tb-jobs 38s linear infinite; width: max-content; }
          .tb-pause:hover .tb-marquee, .tb-pause:hover .tb-jobs { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .tb-marquee, .tb-jobs, .tb-float, .tb-shimmer { animation: none; }
          }
        `}</style>

                    <div className="relative min-h-[540px] sm:min-h-[600px] lg:min-h-[640px]">
                        {HERO_SLIDES.map((slide, idx) => {
                            const isActive = idx === currentSlide;

                            return (
                                <div
                                    key={slide.badge}
                                    className={`hero-slide transition-opacity duration-700 flex items-center ${isActive
                                        ? 'opacity-100 relative min-h-[540px] sm:min-h-[600px] lg:min-h-[640px]'
                                        : 'opacity-0 pointer-events-none absolute inset-0'
                                        }`}
                                >
                                    <motion.img
                                        src={slide.image}
                                        alt={slide.alt}
                                        loading={idx === 0 ? 'eager' : 'lazy'}
                                        animate={{ scale: isActive ? 1.08 : 1 }}
                                        transition={{ duration: isActive ? 7 : 0.8, ease: 'linear' }}
                                        className="absolute inset-0 w-full h-full object-cover will-change-transform"
                                        onError={(e) => {
                                            e.currentTarget.src = slide.fallbackImage;
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1324]/60 via-[#0F172A]/60 to-[#0F172A]/60" />
                                    <motion.div
                                        aria-hidden="true"
                                        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-teal-400/15 blur-3xl"
                                    />
                                    <motion.div
                                        aria-hidden="true"
                                        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute -bottom-28 right-0 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl"
                                    />

                                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
                                        {/* Hero Content */}
                                        <motion.div
                                            key={`content-${currentSlide}`}
                                            initial={{ opacity: 0, y: 18 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                            className="lg:col-span-7 space-y-5 sm:space-y-6"
                                        >
                                            <span
                                                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider ${slide.badgeColor === 'blue'
                                                    ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
                                                    : 'bg-teal-500/15 border border-teal-400/30 text-teal-300'
                                                    }`}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full ${slide.badgeColor === 'blue' ? 'bg-blue-400' : 'bg-teal-400'
                                                        }`}
                                                />
                                                {slide.badge}
                                            </span>

                                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="hero-font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
                                                {slide.titlePrefix}{' '}
                                                <span className={`${slide.highlightClass} tb-shimmer`}>
                                                    {slide.titleHighlight}
                                                </span>
                                                {slide.titleSuffix ? ` ${slide.titleSuffix}` : ''}
                                            </motion.h1>

                                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                                                {slide.description}
                                            </motion.p>

                                            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                                                {slide.primaryCta.modal ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => onOpenModal && onOpenModal(slide.primaryCta.modal)}
                                                        className={`px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-center ${slide.primaryCta.className}`}
                                                    >
                                                        {slide.primaryCta.label}
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={slide.primaryCta.href}
                                                        className={`px-5 sm:px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] text-center ${slide.primaryCta.className}`}
                                                    >
                                                        {slide.primaryCta.label}
                                                    </a>
                                                )}

                                                {slide.secondaryCta.modal ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => onOpenModal && onOpenModal(slide.secondaryCta.modal)}
                                                        className="px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer text-center"
                                                    >
                                                        {slide.secondaryCta.label}
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={slide.secondaryCta.href}
                                                        className="px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] text-center"
                                                    >
                                                        {slide.secondaryCta.label}
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Right Side Cards */}
                                        <motion.div
                                            key={`card-${currentSlide}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                            className="lg:col-span-5"
                                        >
                                            {slide.cardType === 'stats' && (
                                                <div className="tb-float bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl">
                                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4 mb-5">
                                                        <div>
                                                            <p className="text-xs uppercase tracking-wider text-teal-300 font-bold">
                                                                Recruitment Impact
                                                            </p>
                                                            <h3 className="hero-font-display font-semibold text-xl sm:text-2xl text-white leading-tight">
                                                                Verified Delivery Benchmarks
                                                            </h3>
                                                        </div>

                                                        <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold">
                                                            2026 Verified
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-3.5 sm:p-4">
                                                            <p className="hero-font-display font-bold text-2xl sm:text-4xl text-teal-400">
                                                                95%
                                                            </p>
                                                            <p className="text-xs text-slate-300 mt-1">
                                                                Offer-to-Join Success Rate
                                                            </p>
                                                        </div>

                                                        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-3.5 sm:p-4">
                                                            <p className="hero-font-display font-bold text-2xl sm:text-4xl text-white">
                                                                10+ Yrs
                                                            </p>
                                                            <p className="text-xs text-slate-300 mt-1">
                                                                Consultancy Excellence
                                                            </p>
                                                        </div>

                                                        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-3.5 sm:p-4">
                                                            <p className="hero-font-display font-bold text-2xl sm:text-4xl text-white">
                                                                500+
                                                            </p>
                                                            <p className="text-xs text-slate-300 mt-1">
                                                                Professionals Placed
                                                            </p>
                                                        </div>

                                                        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-3.5 sm:p-4">
                                                            <p className="hero-font-display font-bold text-2xl sm:text-4xl text-blue-400">
                                                                120+
                                                            </p>
                                                            <p className="text-xs text-slate-300 mt-1">
                                                                Active Hiring Partners
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {slide.cardType === 'domains' && (
                                                <div className="tb-float bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4">
                                                    <p className="text-xs uppercase tracking-wider text-blue-300 font-bold">
                                                        Ready-to-Deploy Talent Pool
                                                    </p>

                                                    <h3 className="hero-font-display font-semibold text-xl sm:text-2xl text-white leading-tight">
                                                        Pre-Screened Domains
                                                    </h3>

                                                    <div className="space-y-3 text-xs sm:text-sm">
                                                        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3">
                                                            <span>Full-Stack &amp; Frontend (React / Node)</span>
                                                            <span className="text-teal-400 font-bold">48h Turnaround</span>
                                                        </div>

                                                        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3">
                                                            <span>HR, Operations &amp; Leadership</span>
                                                            <span className="text-teal-400 font-bold">72h Turnaround</span>
                                                        </div>

                                                        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3">
                                                            <span>Contract &amp; Project Staffing</span>
                                                            <span className="text-teal-400 font-bold">On-Demand</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {slide.cardType === 'candidate' && (
                                                <div className="tb-float bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-4">
                                                    <p className="text-xs uppercase tracking-wider text-teal-300 font-bold">
                                                        Candidate Advantage
                                                    </p>

                                                    <h3 className="hero-font-display font-semibold text-xl sm:text-2xl text-white leading-tight">
                                                        Why Professionals Choose Us
                                                    </h3>

                                                    <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="text-teal-400 font-bold">✓</span>
                                                            <span>Direct interview scheduling with decision-makers</span>
                                                        </li>

                                                        <li className="flex items-start gap-2.5">
                                                            <span className="text-teal-400 font-bold">✓</span>
                                                            <span>100% free placement assistance for candidates</span>
                                                        </li>

                                                        <li className="flex items-start gap-2.5">
                                                            <span className="text-teal-400 font-bold">✓</span>
                                                            <span>Roles across IT, HR, Finance, Sales &amp; Operations</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}

                        {!isPaused && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
                                <div
                                    key={currentSlide}
                                    className="h-full origin-left bg-teal-400"
                                    style={{ animation: 'tb-progress 5500ms linear forwards' }}
                                />
                            </div>
                        )}

                        {/* Carousel Navigation */}
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                            }
                            aria-label="Previous slide"
                            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white backdrop-blur-sm transition cursor-pointer"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
                            }
                            aria-label="Next slide"
                            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white backdrop-blur-sm transition cursor-pointer"
                        >
                            ›
                        </button>

                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
                            {HERO_SLIDES.map((slide, idx) => (
                                <button
                                    key={slide.badge}
                                    type="button"
                                    onClick={() => setCurrentSlide(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${idx === currentSlide
                                        ? 'w-8 bg-teal-400'
                                        : 'w-2.5 bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 2: COMPANY MARQUEE & ABOUT OUR APPROACH
         ========================================================= */}
                <section className="bg-white border-b border-slate-200 py-5 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Trusted by 120+ Growing Companies &amp; Enterprises
                        </p>
                        <span className="text-xs font-medium text-teal-600">
                            IT · FinTech · Manufacturing · Healthcare · SaaS
                        </span>
                    </div>
                    <div className="tb-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <div className="tb-marquee flex items-center gap-4 sm:gap-6">
                            {[...COMPANIES, ...COMPANIES].map((company, index) => (
                                <div
                                    key={`${company.name}-${index}`}
                                    className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 font-sans font-bold text-xs sm:text-sm whitespace-nowrap"
                                >
                                    <span className={`w-2.5 h-2.5 rounded-full ${company.dot}`} />
                                    {company.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="scroll-mt-20 py-16 sm:py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 relative pb-4 sm:pb-0"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                                alt="TalentBridge HR Advisory"
                                loading="lazy"
                                className="rounded-2xl shadow-xl w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80';
                                }}
                            />
                            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-6 bg-[#0F172A] text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-800 inline-block">
                                <p className="font-display font-bold text-3xl sm:text-4xl text-teal-400">10+ Years</p>
                                <p className="text-xs text-slate-300 mt-0.5">of Recruitment Excellence</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 space-y-5 sm:space-y-6"
                        >
                            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
                                About Our Approach
                            </span>
                            <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 leading-tight">
                                Recruitment That Puts People &amp;{' '}
                                <span className="text-[#3266bb]">Cultural Alignment</span> First
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                At <strong>TalentBridge</strong>, we go beyond resume forwarding. We connect ambitious
                                professionals with high-performing companies through tailored, reliable HR and
                                recruitment solutions built for long-term retention and organizational growth.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
                                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                                    <p className="font-sans font-bold text-slate-900 text-sm">Curated Network</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Pre-vetted active &amp; passive talent across India.
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                                    <p className="font-sans font-bold text-slate-900 text-sm">Precision Matching</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Technical &amp; behavioral screening before interviews.
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                                    <p className="font-sans font-bold text-slate-900 text-sm">HR Advisory</p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        End-to-end offer, compensation &amp; onboarding support.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
                SECTION 3: SERVICES (WHAT WE DO)
               ========================================================= */}
                <section id="services" className="scroll-mt-20 relative py-16 sm:py-20 bg-white border-y border-slate-200/80 overflow-hidden">
                    {/* Subtle Small Dot Matrix Background */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-65"
                        style={{
                            backgroundImage: 'radial-gradient(#cbd5e1 0.75px, transparent 0.75px)',
                            backgroundSize: '18px 18px',
                        }}
                    />

                    {/* Soft Ambient Blur Glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#3266bb]/10 blur-3xl"
                    />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4"
                        >
                            <div>
                                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3266bb]">
                                    What We Do
                                </span>
                                <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 mt-2 tracking-tight">
                                    Recruitment Solutions Built for{' '}
                                    <span className="text-[#3266bb]">Your Needs</span>
                                </h2>
                            </div>

                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onOpenModal && onOpenModal('employerModal')}
                                className="group w-full sm:w-auto self-start md:self-auto px-5 py-3 rounded-xl bg-[#092452] hover:bg-[#0D3270] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                <span>Request Custom Hiring Plan</span>
                                <span
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </motion.button>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 'some' }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
                        >
                            {SERVICES.map((service) => (
                                <motion.div
                                    key={service.num}
                                    variants={cardVariants}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.25 }}
                                    className={`group relative overflow-hidden bg-[#F4F6F9]/85 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-[#3266bb]/35 ${service.accent} hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
                                >
                                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <span
                                                className={`w-11 h-11 rounded-xl font-sans font-extrabold text-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${service.iconClass}`}
                                            >
                                                {service.num}
                                            </span>
                                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${service.badgeClass}`}>
                                                {service.tag}
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-2 leading-snug">
                                            {service.title}
                                        </h3>
                                        <p className="font-sans text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => onOpenModal && onOpenModal('employerModal')}
                                        className={`mt-6 inline-flex items-center gap-1.5 text-xs font-bold ${service.linkClass} group-hover:translate-x-1 transition cursor-pointer text-left`}
                                    >
                                        {service.cta}
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
                SECTION 4: LIVE JOB BOARD (CONTINUOUS RIGHT TO LEFT LOOP)
               ========================================================= */}
                <section
                    id="jobs"
                    className="tb-pause scroll-mt-20 py-16 sm:py-20 bg-[#F4F6F9] border-t border-slate-200/80 overflow-x-clip"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                            <div>
                                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3266bb]">
                                    Current Openings
                                </span>
                                <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 mt-1.5 tracking-tight">
                                    Find Your Next{' '}
                                    <span className="text-[#3266bb]">Career Opportunity</span>
                                </h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {JOB_FILTERS.map((btn) => {
                                    const isActive = selectedLocation === btn.key;
                                    return (
                                        <button
                                            key={btn.key}
                                            type="button"
                                            onClick={() => setSelectedLocation(btn.key)}
                                            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                                                ? 'bg-[#092452] text-white shadow-sm'
                                                : 'bg-white/95 hover:bg-white text-slate-600 hover:text-[#092452] border border-slate-200/90 hover:border-[#3266bb]/45'
                                                }`}
                                        >
                                            {btn.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {visibleJobs.length < 3 ? (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div layout className="flex flex-wrap justify-center gap-5 sm:gap-6">
                                <AnimatePresence mode="popLayout">
                                    {visibleJobs.map((job) => (
                                        <JobCard
                                            key={job.title}
                                            job={job}
                                            onApplyRole={onApplyRole}
                                            animated
                                            className="w-full sm:w-[350px] lg:w-[380px]"
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="relative w-full overflow-hidden py-3">
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#F4F6F9] to-transparent z-10" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#F4F6F9] to-transparent z-10" />

                            <div key={`jobs-track-${selectedLocation}`} className="tb-jobs flex">
                                {[0, 1, 2, 3].map((copyIndex) => (
                                    <div
                                        key={`set-${copyIndex}`}
                                        aria-hidden={copyIndex > 0}
                                        className="flex gap-5 sm:gap-6 pr-5 sm:pr-6 shrink-0"
                                    >
                                        {visibleJobs.map((job) => (
                                            <JobCard
                                                key={`${copyIndex}-${job.title}`}
                                                job={job}
                                                onApplyRole={onApplyRole}
                                                className="w-[84vw] sm:w-[350px] lg:w-[380px]"
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* =========================================================
          SECTION 5: HOW IT WORKS (4-STEP INTERACTIVE PROCESS)
         ========================================================= */}
                <section id="process" className="scroll-mt-20 py-16 sm:py-20 bg-white border-t border-slate-200/80 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5"
                        >
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                                How It Works
                            </span>
                            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] text-slate-900 leading-tight">
                                A simpler way to <span className="text-blue-700">find the right match.</span>
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm lg:text-base">
                                Our streamlined 4-step process keeps recruitment fast, focused and transparent.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {PROCESS_STEPS.map((item, idx) => {
                                const isActive = activeStep === idx;

                                return (
                                    <motion.div
                                        key={item.step}
                                        initial={{ opacity: 0, y: 22 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 'some' }}
                                        transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -5 }}
                                        onMouseEnter={() => setActiveStep(idx)}
                                        onClick={() => setActiveStep(idx)}
                                        className={`group rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${isActive
                                            ? 'bg-blue-50/40 border-blue-600 shadow-lg shadow-blue-700/10'
                                            : 'bg-slate-50/80 border-slate-200/90 hover:bg-white hover:border-blue-500/50 hover:shadow-md'
                                            }`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-6">
                                                <span
                                                    className={`px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase transition ${isActive
                                                        ? 'bg-blue-700 text-white'
                                                        : 'bg-slate-200/80 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-800'
                                                        }`}
                                                >
                                                    {item.step}
                                                </span>

                                                <span
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                                        ? 'bg-blue-100 ring-2 ring-blue-600/20'
                                                        : 'bg-slate-200/70 group-hover:bg-blue-50'
                                                        }`}
                                                >
                                                    <StepIcon type={item.icon} isActive={isActive} />
                                                </span>
                                            </div>

                                            <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {item.summary}
                                            </p>
                                        </div>

                                        <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold">
                                            <span className={isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-blue-700'}>
                                                {isActive ? 'Selected Step' : 'View Details'}
                                            </span>
                                            <span className={`transition-transform duration-300 ${isActive ? 'translate-x-1 text-blue-700' : 'text-slate-400 group-hover:translate-x-1'}`}>
                                                →
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Interactive Step Detail Box */}
                        <motion.div
                            key={currentProcess.step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 sm:mt-8 rounded-2xl bg-slate-50 border border-slate-200/90 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <div className="flex items-start sm:items-center gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <StepIcon type={currentProcess.icon} isActive={true} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                        {currentProcess.step} · {currentProcess.title}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                                        {currentProcess.highlight}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => onOpenModal && onOpenModal('employerModal')}
                                className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer text-center"
                            >
                                Start With {currentProcess.title} →
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 6: WHY TALENTBRIDGE (LONG-TERM PARTNER & IMPACT)
         ========================================================= */}
                <section id="why-talentbridge" className="py-16 sm:py-24 bg-slate-100/80 border-t border-slate-200/80 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left Column: Heading, Interactive Checklist & CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 space-y-6"
                        >
                            <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">
                                Why TalentBridge
                            </span>

                            <h2 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 leading-[1.08] tracking-tight">
                                More than recruitment.{' '}
                                <span className="text-blue-800 block sm:inline">A long-term partner.</span>
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
                                Whether you are hiring top talent or taking the next step in your career, we make recruitment seamless.
                            </p>

                            <div className="space-y-3 pt-1">
                                {WHY_POINTS.map((point, idx) => {
                                    const isSelected = activeWhyIndex === idx;

                                    return (
                                        <motion.button
                                            key={point.text}
                                            type="button"
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.99 }}
                                            onMouseEnter={() => setActiveWhyIndex(idx)}
                                            onClick={() => setActiveWhyIndex(idx)}
                                            className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${isSelected
                                                ? 'bg-white border-blue-600/60 shadow-sm'
                                                : 'bg-transparent border-transparent hover:bg-white/70 hover:border-slate-200'
                                                }`}
                                        >
                                            <span
                                                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected
                                                    ? 'bg-blue-700 text-white'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>

                                            <div className="min-w-0 flex-1">
                                                <p className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                                                    {point.text}
                                                </p>
                                                {isSelected && (
                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                                        {point.detail}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            <div className="pt-2">
                                <motion.a
                                    href="#about"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0B1F44] hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-md transition"
                                >
                                    <span>Learn more about us</span>
                                    <span aria-hidden="true">→</span>
                                </motion.a>
                            </div>
                        </motion.div>


                        {/* Right Column: Image with Floating Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                            className="lg:col-span-6"
                        >
                            <div className="relative sm:pb-10 sm:pr-5">

                                {/* Main Image */}
                                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt="TalentBridge Infrastructure and Recruitment Operations"
                                        loading="lazy"
                                        className="w-full h-[280px] sm:h-[365px] object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                                </div>

                                {/* Our Impact - Top Right */}
                                <motion.div
                                    animate={activeWhy.focusMetric === 'impact'
                                        ? { y: -4, scale: 1.02 }
                                        : { y: 0, scale: 1 }
                                    }
                                    transition={{ duration: 0.35 }}
                                    onClick={() => setActiveWhyIndex(0)}
                                    className={`absolute sm:top-[-20px] lg:top-[-65px] right-0 z-20
                hidden sm:block w-64 rounded-2xl bg-white
                p-6 shadow-xl border cursor-pointer
                ${activeWhy.focusMetric === 'impact'
                                            ? 'border-blue-600 ring-2 ring-blue-600/15'
                                            : 'border-slate-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs text-slate-500">
                                            Our impact
                                        </span>

                                        <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                                            ✓
                                        </span>
                                    </div>

                                    <p className="text-4xl font-bold text-blue-950"><CountUp to={95} suffix="%" /></p>

                                    <p className="text-xs text-slate-500 mt-1">
                                        successful placement rate
                                    </p>

                                    <div className="mt-7 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                                        <div className="h-full w-[95%] rounded-full bg-blue-900" />
                                    </div>
                                </motion.div>

                                {/* Companies Trust Us - Bottom Left */}
                                <motion.div
                                    animate={activeWhy.focusMetric === 'companies'
                                        ? { y: -4, scale: 1.02 }
                                        : { y: 0, scale: 1 }
                                    }
                                    transition={{ duration: 0.35 }}
                                    onClick={() => setActiveWhyIndex(2)}
                                    className={`absolute bottom-0 left-[-25px] z-20
                hidden sm:block w-40 rounded-xl bg-white
                p-5 shadow-xl border cursor-pointer
                ${activeWhy.focusMetric === 'companies'
                                            ? 'border-blue-600 ring-2 ring-blue-600/15'
                                            : 'border-slate-200'
                                        }`}
                                >
                                    <p className="text-2xl font-bold text-blue-950"><CountUp to={120} suffix="+" /></p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Companies trust us
                                    </p>
                                </motion.div>

                                {/* Careers Started - Bottom Right */}
                                <motion.div
                                    animate={activeWhy.focusMetric === 'careers'
                                        ? { y: -4, scale: 1.02 }
                                        : { y: 0, scale: 1 }
                                    }
                                    transition={{ duration: 0.35 }}
                                    onClick={() => setActiveWhyIndex(1)}
                                    className={`absolute bottom-[-45px] right-5 z-20
                hidden sm:block w-40 rounded-xl bg-white
                p-5 shadow-xl border cursor-pointer
                ${activeWhy.focusMetric === 'careers'
                                            ? 'border-blue-600 ring-2 ring-blue-600/15'
                                            : 'border-slate-200'
                                        }`}
                                >
                                    <p className="text-2xl font-bold text-blue-950"><CountUp to={500} suffix="+" /></p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Careers started
                                    </p>
                                </motion.div>

                                {/* Mobile Stats */}
                                <div className="grid grid-cols-2 gap-3 mt-4 sm:hidden">
                                    <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200">
                                        <p className="text-2xl font-bold text-blue-950"><CountUp to={95} suffix="%" /></p>
                                        <p className="text-xs text-slate-500">Successful placements</p>
                                    </div>

                                    <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200">
                                        <p className="text-2xl font-bold text-blue-950"><CountUp to={120} suffix="+" /></p>
                                        <p className="text-xs text-slate-500">Companies trust us</p>
                                    </div>

                                    <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 col-span-2">
                                        <p className="text-2xl font-bold text-blue-950"><CountUp to={500} suffix="+" /></p>
                                        <p className="text-xs text-slate-500">Careers started</p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                    </div>
                </section>

                {/* =========================================================
          SECTION 7: NEXT PAGE / SECTION YAHAN ADD HOGA
         ========================================================= */}


                <section
                    id="current-openings"
                    className="w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Section Heading */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
                            <div>
                                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-blue-800 mb-5 inline-block">
                                    Talent Network
                                </span>

                                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight">
                                    Your next career move{" "}
                                    <span className="text-blue-800">
                                        starts here.
                                    </span>
                                </h2>
                            </div>

                            <a
                                href="/jobs"
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-800 transition-colors group w-fit"
                            >
                                View all jobs
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </a>
                        </div>

                        {/* Talent Network Banner */}
                        <div className="relative min-h-[400px] sm:min-h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">

                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Team collaboration"
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/20" />

                            <div className="relative z-10 min-h-[400px] sm:min-h-[430px] flex items-center px-5 py-12 sm:px-10 lg:px-10">

                                <motion.div
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full max-w-md bg-slate-950/75 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl"
                                >

                                    <h3 className="text-white font-display font-bold text-2xl sm:text-3xl mb-3">
                                        Join Our Talent Network
                                    </h3>

                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                                        Connect with leading employers and find roles matching your skills.
                                    </p>

                                    <a
                                        href="/jobs"
                                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-[#0B1F44] hover:bg-blue-800 text-white text-sm font-semibold shadow-lg transition-all"
                                    >
                                        Explore Roles
                                        <span>→</span>
                                    </a>

                                </motion.div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* =========================================================
          SECTION 8: TESTIMONIALS (SLIDER)
         ========================================================= */}

                {/* CLIENT STORIES SECTION */}
                <section className="relative bg-slate-100/80 py-16 sm:py-20 lg:py-24 overflow-hidden">

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Section Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto mb-12"
                        >
                            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-800">
                                Client Stories
                            </span>

                            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-5 leading-tight">
                                Trusted by teams that{" "}
                                <span className="text-blue-800">
                                    value great people.
                                </span>
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base mt-5 leading-relaxed">
                                Here is what our partner companies and hiring managers say about working with us.
                            </p>
                        </motion.div>

                        {/* Testimonials Data */}
                        {(() => {
                            const testimonials = [
                                {
                                    name: "Rahul Kapoor",
                                    role: "HR Manager · Tech Enterprise",
                                    initials: "RK",
                                    color: "bg-blue-700",
                                    review: "TalentBridge understood our exact hiring needs and helped us close key roles rapidly with top talent."
                                },
                                {
                                    name: "Priya Sharma",
                                    role: "Founder · High Growth Startup",
                                    initials: "PS",
                                    color: "bg-purple-700",
                                    review: "Smooth, transparent process from start to finish. We found candidate fits much faster than expected."
                                },
                                {
                                    name: "Arjun Mehta",
                                    role: "Operations Head · Global Services",
                                    initials: "AM",
                                    color: "bg-cyan-700",
                                    review: "They genuinely prioritize long-term cultural alignment and quality over simply closing open spots."
                                }
                            ];

                            return (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

                                    {testimonials.map((item, index) => (
                                        <motion.div
                                            key={item.initials}
                                            initial={{ opacity: 0, y: 35 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{
                                                duration: 0.55,
                                                delay: index * 0.15
                                            }}
                                            whileHover={{
                                                y: -8,
                                                transition: { duration: 0.25 }
                                            }}
                                            className="group bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                                        >

                                            {/* Rating & Quote Icon */}
                                            <div className="flex items-center justify-between mb-5">

                                                <div className="flex items-center gap-1 text-amber-500">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg
                                                            key={star}
                                                            className="w-4 h-4 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5z" />
                                                        </svg>
                                                    ))}
                                                </div>

                                                <svg
                                                    className="w-5 h-5 text-slate-300 group-hover:text-blue-700 transition-colors"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8 11h.01M12 11h.01M16 11h.01M21 12c0 4.4-4 8-9 8a10 10 0 01-4-.8L3 21l1.2-4A7.5 7.5 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z"
                                                    />
                                                </svg>

                                            </div>

                                            {/* Review */}
                                            <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed min-h-[85px]">
                                                "{item.review}"
                                            </p>

                                            {/* Divider */}
                                            <div className="border-t border-slate-100 my-5" />

                                            {/* Client Details */}
                                            <div className="flex items-center gap-3">

                                                <div className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                                                    {item.initials}
                                                </div>

                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-bold text-slate-900">
                                                        {item.name}
                                                    </h4>

                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {item.role}
                                                    </p>
                                                </div>

                                                <div className="ml-auto text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M7 17L17 7M7 7h10v10"
                                                        />
                                                    </svg>
                                                </div>

                                            </div>

                                        </motion.div>
                                    ))}

                                </div>
                            );
                        })()}

                    </div>
                </section>



                {/* =========================================================
          SECTION 9: TESTIMONIALS (SLIDER)
         ========================================================= */}
                {/* BOTTOM CALL TO ACTION SECTION */}
                <section className="relative bg-[#0670b8] py-14 sm:py-16 md:py-16 overflow-hidden">

                    {/* Background Decoration */}
                    <div className="absolute -top-32 -right-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
                    {/* Square Grid Background */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.12]"
                        style={{
                            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.45) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,0.45) 2px, transparent 2px)
        `,
                            backgroundSize: "45px 45px",
                        }}
                    />
                    <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-cyan-300/10 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-7"
                            >

                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-white/10 text-white text-xs font-semibold mb-6">

                                    <svg
                                        className="w-4 h-4 text-cyan-200"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 12l3 3 5-6m5 3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    Work with us
                                </div>

                                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-4xl text-white leading-tight">
                                    Ready to find the{" "}
                                    <span className="text-blue-200">
                                        right match?
                                    </span>
                                </h2>

                                <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed mt-5 max-w-xl">
                                    Whether you're looking for exceptional talent or your next career opportunity, we're here to make the right connection.
                                </p>

                            </motion.div>


                            {/* Right Action Cards */}
                            <div className="lg:col-span-5 grid grid-cols-1 gap-4">

                                {/* Find a Job */}
                                <motion.a
                                    href="/jobs"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    whileHover={{ x: -5 }}
                                    className="group flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                                >

                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-100 group-hover:bg-white group-hover:text-blue-900 transition-all shrink-0">

                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m6-10a4 4 0 100-8 4 4 0 000 8zm8-3v6m3-3h-6"
                                            />
                                        </svg>

                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-base">
                                            Find a Job
                                        </h3>
                                        <p className="text-blue-100/70 text-xs mt-1">
                                            Browse open roles near you
                                        </p>
                                    </div>

                                    <svg
                                        className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14m-7-7 7 7-7 7"
                                        />
                                    </svg>

                                </motion.a>


                                {/* Hire Talent */}
                                <motion.a
                                    href="/contact"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.25 }}
                                    whileHover={{ x: -5 }}
                                    className="group flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white text-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300"
                                >

                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all shrink-0">

                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m6-10a4 4 0 100-8 4 4 0 000 8zm7-5h4m-2-2v4"
                                            />
                                        </svg>

                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-base">
                                            Hire Talent
                                        </h3>
                                        <p className="text-slate-500 text-xs mt-1">
                                            Find the right people for your team
                                        </p>
                                    </div>

                                    <svg
                                        className="w-5 h-5 text-blue-800 group-hover:translate-x-1 transition-transform shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14m-7-7 7 7-7 7"
                                        />
                                    </svg>

                                </motion.a>

                            </div>

                        </div>
                    </div>
                </section>


                <span className="sr-only">{activeSlide.badge}</span>
            </div>
        </MotionConfig>
    );
}