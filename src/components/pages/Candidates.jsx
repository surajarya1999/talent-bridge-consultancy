import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/* Same font system as Home: Cormorant Garamond (headings) + Lato (body).
   Tip: move this to index.css / tailwind.config once so every page shares it. */
function CandidatesStyles() {
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




const HERO_PERKS = [
    { label: '100% Free for Candidates', icon: 'shield' },
    { label: 'Direct Hiring Manager Intro', icon: 'bolt' },
    { label: 'Verified Employers Only', icon: 'target' },
];

const WHY_CHOOSE_CARDS = [
    {
        title: 'Curated Opportunities',
        description:
            'Get matched with verified openings across top startups, MNCs, and growing enterprises.',
        icon: 'target',
    },
    {
        title: 'Direct Hiring Access',
        description:
            'Skip the resume black hole with direct introduction to decision-makers and hiring leaders.',
        icon: 'users',
    },
    {
        title: 'Career & CTC Guidance',
        description:
            'Expert advice on resume benchmarking, interview preparation, and salary negotiations.',
        icon: 'trend',
    },
    {
        title: '100% Free & Confidential',
        description:
            'Zero recruitment fees for job seekers. Your details are kept completely confidential.',
        icon: 'shieldBox',
    },
];

const HOW_IT_WORKS_STEPS = [
    {
        step: '01',
        title: 'Submit Profile',
        desc: 'Upload your resume and share your preferred roles and expected CTC.',
    },
    {
        step: '02',
        title: 'Profile Review',
        desc: 'Our specialized recruiters evaluate your profile against active job pipelines.',
    },
    {
        step: '03',
        title: 'Direct Interview',
        desc: 'Get scheduled for interview rounds with full preparation support.',
    },
    {
        step: '04',
        title: 'Offer & Joining',
        desc: 'Receive offer negotiation guidance and seamless onboarding assistance.',
    },
];

function HeroPerkIcon({ type }) {
    const iconClass =
        'w-4 h-4 text-[#0B2D63] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shrink-0';

    if (type === 'shield') {
        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        );
    }

    return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function WhyChooseIcon({ type, isActive }) {
    const iconClass = `w-5 h-5 transition-transform duration-300 ${isActive
        ? 'text-white scale-110'
        : 'text-[#173568] group-hover:scale-110 group-hover:-rotate-3'
        }`;

    if (type === 'target') {
        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8.5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
        );
    }

    if (type === 'users') {
        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        );
    }

    if (type === 'trend') {
        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        );
    }

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

function CandidateRegistrationForm({ onRegisterCandidate }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '1–3 Years',
        desiredRole: '',
        preferredCity: '',
        summary: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errorMsg) setErrorMsg('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (!file) return;

        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        const isValidExt = /\.(pdf|doc|docx)$/i.test(file.name);

        if (!validTypes.includes(file.type) && !isValidExt) {
            setErrorMsg('Please upload a PDF, DOC, or DOCX resume file.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrorMsg('Resume file size must be 5MB or less.');
            return;
        }

        setErrorMsg('');
        setResumeFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFileChange({ target: { files: e.dataTransfer.files } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.desiredRole.trim() ||
            !resumeFile
        ) {
            setErrorMsg('Please fill all required fields (*) and attach your resume.');
            return;
        }

        if (onRegisterCandidate) {
            onRegisterCandidate({ ...formData, resumeFile });
        }

        setSubmitted(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white/95 border border-slate-200/90 p-5 sm:p-8 shadow-sm"
        >
            {submitted ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-3"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>
                    <h3 className="font-display font-bold text-3xl text-slate-900">
                        Profile Submitted Successfully
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                        Thank you, {formData.fullName}. Our recruitment team will review your profile for {formData.desiredRole} and reach out shortly.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSubmitted(false);
                            setResumeFile(null);
                            setFormData({
                                fullName: '',
                                email: '',
                                phone: '',
                                experience: '1–3 Years',
                                desiredRole: '',
                                preferredCity: '',
                                summary: '',
                            });
                        }}
                        className="px-4 py-2 rounded-lg bg-[#092452] text-white text-xs font-semibold cursor-pointer"
                    >
                        Submit Another Profile
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Full Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                placeholder="e.g. Priya Sharma"
                                autoComplete="name"
                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Email Address <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="priya@example.com"
                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Phone Number <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="tel"
                                autoComplete="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="e.g. +91 98765 43210"
                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                            />
                        </div>

                        {/* Total Experience */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Total Experience
                            </label>
                            <select
                                value={formData.experience}
                                onChange={(e) => handleChange('experience', e.target.value)}
                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 focus:outline-none transition cursor-pointer"
                            >
                                <option value="Fresher (0–1 Year)">Fresher (0–1 Year)</option>
                                <option value="1–3 Years">1–3 Years</option>
                                <option value="3–5 Years">3–5 Years</option>
                                <option value="5–8 Years">5–8 Years</option>
                                <option value="8+ Years">8+ Years</option>
                            </select>
                        </div>

                        {/* Desired Role / Title */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Desired Role / Title <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.desiredRole}
                                onChange={(e) => handleChange('desiredRole', e.target.value)}
                                placeholder="e.g. Full Stack Developer"
                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                            />
                        </div>

                        {/* Preferred City / Remote */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Preferred City / Remote
                            </label>
                            <input
                                type="text"
                                value={formData.preferredCity}
                                onChange={(e) => handleChange('preferredCity', e.target.value)}
                                placeholder="e.g. Bengaluru / Remote"
                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                            />
                        </div>

                        {/* Upload Resume */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Upload Resume (.pdf, .doc, .docx) <span className="text-rose-500">*</span>
                            </label>
                            <label
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={`group flex items-center gap-3 w-full h-[76px] rounded-xl border border-dashed hover:border-[#0B2D63] px-4 transition cursor-pointer ${dragOver ? 'bg-blue-50 border-[#0B2D63]' : resumeFile ? 'bg-emerald-50/60 border-emerald-400' : 'bg-[#F4F6F9] hover:bg-blue-50/50 border-slate-300'}`}
                            >
                                <svg
                                    className="w-5 h-5 text-[#173568] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>

                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-slate-800 truncate">
                                        {resumeFile ? resumeFile.name : 'Click or drag your resume here'}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                        PDF, DOC, DOCX up to 5MB
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="sr-only"
                                />
                            </label>
                        </div>

                        {/* Key Skills & Summary */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-slate-800">
                                Key Skills &amp; Summary (Optional)
                            </label>
                            <textarea
                                rows={3}
                                value={formData.summary}
                                onChange={(e) => handleChange('summary', e.target.value)}
                                placeholder="Briefly highlight your top skills, current CTC, notice period..."
                                className="w-full h-[76px] rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition resize-none"
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {errorMsg && (
                            <motion.p
                                key={errorMsg}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                                exit={{ opacity: 0, y: -4 }}
                                className="text-xs font-semibold text-rose-600"
                            >
                                {errorMsg}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        className="group w-full py-3.5 px-6 rounded-xl bg-[#092452] hover:bg-[#0D3270] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                        <span>Submit Profile for Review</span>
                        <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                            →
                        </span>
                    </motion.button>
                </form>
            )}
        </motion.div>
    );
}

export default function Candidates({ onOpenModal, onBrowseJobs, onRegisterCandidate }) {
    const [activeCard, setActiveCard] = useState(1);

    const handleUploadClick = () => {
        const formSection = document.getElementById('candidate-registration-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
        if (onOpenModal) {
            onOpenModal('candidateModal');
        } else {
            window.location.href = '/contact';
        }
    };

    const handleBrowseClick = () => {
        if (onBrowseJobs) {
            onBrowseJobs();
        } else {
            window.location.href = '/jobs';
        }
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="tb-root w-full overflow-x-clip bg-[#F4F6F9]">
                <CandidatesStyles />
                <ScrollExtras />
                {/* =========================================================
                SECTION 1: FOR JOB SEEKERS & PROFESSIONALS HERO
               ========================================================= */}
                <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F4F6F9] overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-65"
                        style={{ backgroundImage: 'radial-gradient(rgba(11, 45, 99, 0.16) 1.15px, transparent 1.15px)', backgroundSize: '20px 20px' }}
                    />
                    <motion.div
                        aria-hidden="true"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-300/25 blur-3xl"
                    />
                    <motion.div
                        aria-hidden="true"
                        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
                        className="pointer-events-none absolute -bottom-28 -right-24 w-96 h-96 rounded-full bg-teal-200/25 blur-3xl"
                    />
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 space-y-5 sm:space-y-6"
                        >
                            {/* Pill Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6ECF5] border border-[#0B2D63]/10 text-[#0B2D63] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider"
                            >
                                <svg
                                    className="w-3.5 h-3.5 text-[#0B2D63] shrink-0"
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
                                <span>For Job Seekers &amp; Professionals</span>
                            </motion.div>

                            {/* Main Heading */}
                            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-[64px] text-slate-900 leading-[1.09] tracking-tight">
                                Find Careers Where{' '}
                                <span className="tb-shimmer-light">You Truly Belong.</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                                Connect with India&apos;s top employers, explore high-growth job roles, and accelerate your career with personalized recruiter guidance.
                            </p>

                            {/* Primary & Secondary Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleUploadClick}
                                    className="group px-5 py-3 rounded-lg bg-[#092452] hover:bg-[#0D3270] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
                                >
                                    <span>Upload Resume / Apply</span>
                                    <span
                                        aria-hidden="true"
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    >
                                        →
                                    </span>
                                </motion.button>

                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleBrowseClick}
                                    className="px-5 py-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#0B2D63]/35 text-slate-700 hover:text-[#0B2D63] text-xs sm:text-sm font-semibold shadow-2xs transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                                >
                                    Browse Active Jobs
                                </motion.button>
                            </div>

                            {/* Trust Items Row */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-2">
                                {HERO_PERKS.map((perk) => (
                                    <motion.div
                                        key={perk.label}
                                        whileHover={{ y: -2 }}
                                        className="group inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-[#0B2D63] transition-colors cursor-default"
                                    >
                                        <HeroPerkIcon type={perk.icon} />
                                        <span>{perk.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Column: Candidate Portrait + Floating Stat Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 relative"
                        >
                            <div aria-hidden="true" className="absolute inset-0 translate-x-3 -translate-y-3 sm:translate-x-4 sm:-translate-y-4 rounded-2xl border-2 border-[#3266bb]/30" />
                            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group">
                                <img
                                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80"
                                    alt="Confident Candidate Ready for New Career Opportunities"
                                    className="w-full h-[310px] sm:h-[390px] lg:h-[430px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

                                {/* Bottom-Left Floating Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.48, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="absolute bottom-4 left-4 right-4 sm:right-auto sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3.5 max-w-xs"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#143d7e] text-white flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-tight">
                                            <CountUp to={500} suffix="+" /> Hires Placed
                                        </p>
                                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                                            Top tech &amp; corporate roles
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* =========================================================
                SECTION 2: WHY CHOOSE TALENTBRIDGE (4 FEATURE CARDS)
               ========================================================= */}
                <section className="relative py-16 sm:py-20 bg-white border-t border-slate-200/70 overflow-hidden">
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
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5"
                        >
                            <span className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3266bb]">
                                Why Choose TalentBridge
                            </span>

                            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[52px] text-slate-900 leading-[1.14] tracking-tight">
                                More opportunities.{' '}
                                <span className="text-[#3266bb]">Zero hassle.</span>
                            </h2>

                            <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
                                We take the frustration out of job hunting by connecting you directly with companies looking for your specific skills.
                            </p>
                        </motion.div>

                        {/* 4-Card Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {WHY_CHOOSE_CARDS.map((card, idx) => {
                                const isActive = activeCard === idx;

                                return (
                                    <motion.div
                                        key={card.title}
                                        initial={{ opacity: 0, y: 22 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 'some' }}
                                        transition={{
                                            duration: 0.48,
                                            delay: idx * 0.08,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        whileHover={{ y: -5 }}
                                        onMouseEnter={() => setActiveCard(idx)}
                                        onClick={() => setActiveCard(idx)}
                                        className={`group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-start min-h-[215px] sm:min-h-[235px] cursor-pointer ${isActive
                                            ? 'bg-white border-[#3266bb]/45 shadow-lg shadow-slate-900/[0.06]'
                                            : 'bg-white/90 hover:bg-white border-slate-200/90 hover:border-[#3266bb]/35 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${isActive
                                                ? 'bg-[#092452] shadow-sm'
                                                : 'bg-[#E6ECF5] group-hover:bg-[#2263ca]'
                                                }`}
                                        >
                                            <WhyChooseIcon type={card.icon} isActive={isActive} />
                                        </div>

                                        <h3 className="font-display font-bold text-2xl text-slate-900 mb-2 leading-snug tracking-tight">
                                            {card.title}
                                        </h3>

                                        <p className="font-sans text-slate-500 text-sm leading-relaxed">
                                            {card.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =========================================================
                SECTION 3: HOW IT WORKS (4 STEPS) & CANDIDATE REGISTRATION
               ========================================================= */}
                <section className="py-16 sm:py-20 bg-[#F4F6F9] border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* HOW IT WORKS HEADER */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2"
                        >
                            <span className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-500">
                                How It Works
                            </span>

                            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[52px] text-slate-900 leading-[1.14] tracking-tight">
                                Your path to a{' '}
                                <span className="text-[#2860bb]">better job in 4 steps.</span>
                            </h2>
                        </motion.div>

                        {/* 4 STEP CARDS */}
                        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16 sm:mb-20">
                            <motion.div
                                aria-hidden="true"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="hidden lg:block absolute top-[34px] left-[12%] right-[12%] h-0.5 origin-left bg-gradient-to-r from-[#3266bb]/10 via-[#3266bb]/50 to-teal-400/50"
                            />
                            {HOW_IT_WORKS_STEPS.map((item, idx) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{
                                        duration: 0.46,
                                        delay: idx * 0.08,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{ y: -4 }}
                                    className="group relative z-10 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#123060]/35 p-5 sm:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 min-h-[165px]"
                                >
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#E6ECF5] group-hover:bg-[#0B2D63] text-[#173568] group-hover:text-white text-[11px] font-bold tracking-wide transition-colors duration-300 mb-4">
                                        {item.step}
                                    </span>

                                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-1.5">
                                        {item.title}
                                    </h3>

                                    <p className="font-sans text-slate-500 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* REGISTER AS A CANDIDATE FORM BLOCK */}
                        <div id="candidate-registration-section" className="max-w-4xl mx-auto scroll-mt-24">
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center mb-8 sm:mb-10 space-y-2"
                            >
                                <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[52px] text-slate-900 tracking-tight">
                                    Register as a <span className="text-[#2c61b6]">Candidate</span>
                                </h2>
                                <p className="font-sans text-slate-500 text-sm sm:text-base">
                                    Upload your details once and get matched with verified career opportunities from top employers.
                                </p>
                            </motion.div>

                            <CandidateRegistrationForm onRegisterCandidate={onRegisterCandidate} />

                            {/* BOTTOM ACTIVE JOBS STRIP */}
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-5 rounded-xl bg-white/90 border border-slate-200/90 px-4 sm:px-6 py-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                            >
                                <div className="group inline-flex items-center gap-2 text-xs text-slate-600">
                                    <svg
                                        className="w-4 h-4 text-[#0B2D63] transition-transform duration-300 group-hover:scale-110 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span>Looking for immediate active job vacancies?</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleBrowseClick}
                                    className="group/link inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2D63] hover:text-blue-700 transition cursor-pointer"
                                >
                                    <span>Explore Active Job Openings</span>
                                    <span
                                        aria-hidden="true"
                                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                                    >
                                        →
                                    </span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </MotionConfig>
    );
}