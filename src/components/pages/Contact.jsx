import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/* Same font system as Home: Cormorant Garamond (headings) + Lato (body).
   Tip: move this to index.css / tailwind.config once so every page shares it. */
function ContactStyles() {
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



/* Live status for the Working Hours card: Mon–Sat, 9:30 AM – 6:30 PM IST */
function OpenStatus() {
    const compute = () => {
        const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const day = ist.getDay();
        const mins = ist.getHours() * 60 + ist.getMinutes();
        return day >= 1 && day <= 6 && mins >= 9 * 60 + 30 && mins < 18 * 60 + 30;
    };
    const [open, setOpen] = useState(compute);

    useEffect(() => {
        const id = setInterval(() => setOpen(compute()), 60000);
        return () => clearInterval(id);
    }, []);

    return (
        <span
            className={`mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${open ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
        >
            <span className="relative flex w-2 h-2">
                {open && <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />}
                <span className={`relative inline-flex w-2 h-2 rounded-full ${open ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            </span>
            {open ? 'We are open now' : 'Currently closed'}
        </span>
    );
}


const FAQ_ITEMS = [
    {
        question: 'How can I apply for a job?',
        answer:
            'You can browse our current job openings and apply directly from the relevant job details page. You can also submit your profile through our Candidates page.',
    },
    {
        question: 'Can companies contact you for recruitment?',
        answer:
            'Yes! Employers and hiring managers can submit their open role requirements through our Employers page or reach out directly via email or phone for dedicated recruitment support.',
    },
    {
        question: 'Do you offer contract staffing?',
        answer:
            'Yes, we provide flexible contract and temporary staffing solutions alongside permanent recruitment, specialized tech hiring, and executive headhunting.',
    },
    {
        question: 'How quickly will I receive a response?',
        answer:
            'Our talent acquisition and candidate support team responds to all inquiries within 24 business hours (Monday to Saturday, 9:30 AM – 6:30 PM IST).',
    },
];

export default function Contact({ onNavigate, onSubmitMessage }) {
    const [openFaq, setOpenFaq] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errorMsg) setErrorMsg('');
    };

    const handleRoute = (path) => {
        if (onNavigate) {
            onNavigate(path);
        } else {
            window.location.href = path;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()
        ) {
            setErrorMsg('Please fill all required fields (*) before sending your message.');
            return;
        }

        if (onSubmitMessage) {
            onSubmitMessage(formData);
        }
        setSubmitted(true);
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="tb-root w-full overflow-x-clip bg-[#F4F6F9]">
                <ContactStyles />
                <ScrollExtras />
                {/* =========================================================
          SECTION 1: CONTACT HERO + INFO CARDS & MESSAGE FORM
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
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Page Intro Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-2xl mb-10 sm:mb-12 space-y-2.5"
                        >
                            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-[64px] text-slate-900 leading-[1.12] tracking-tight">
                                Let&apos;s start a{' '}
                                <span className="tb-shimmer-light">conversation.</span>
                            </h1>
                            <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
                                Whether you&apos;re looking for your next opportunity or building your team, our recruitment specialists are here to help.
                            </p>
                        </motion.div>

                        {/* 2-Column Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                            {/* LEFT COLUMN: CONTACT CARDS & QUICK LINKS */}
                            <div className="lg:col-span-5 space-y-4">
                                {/* Email Us Card */}
                                <motion.a
                                    href="mailto:info@talentbridgehr.online"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="group relative overflow-hidden block rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#3266bb]/40 p-5 shadow-2xs hover:shadow-md transition-all duration-300"
                                >
                                    <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1 origin-top scale-y-0 group-hover:scale-y-100 bg-gradient-to-b from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#E6ECF5] group-hover:bg-[#2263ca] text-[#17376b] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0 mt-0.5">
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.9"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>

                                        <div className="min-w-0">
                                            <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                                Email Us
                                            </span>
                                            <p className="font-display font-bold text-xl sm:text-[22px] text-slate-900 mt-0.5 truncate">
                                                info@talentbridgehr.online
                                            </p>
                                            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#2263ca] group-hover:text-[#17376b] transition">
                                                <span>Send an email</span>
                                                <span
                                                    aria-hidden="true"
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                >
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.a>

                                {/* Call Us Card */}
                                <motion.a
                                    href="tel:+919305765097"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="group relative overflow-hidden block rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#3266bb]/40 p-5 shadow-2xs hover:shadow-md transition-all duration-300"
                                >
                                    <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1 origin-top scale-y-0 group-hover:scale-y-100 bg-gradient-to-b from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#E6ECF5] group-hover:bg-[#2263ca] text-[#17376b] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0 mt-0.5">
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.9"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                        </div>

                                        <div className="min-w-0">
                                            <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                                Call Us
                                            </span>
                                            <p className="font-display font-bold text-xl sm:text-[22px] text-slate-900 mt-0.5">
                                                +91 93057 65097
                                            </p>
                                            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#2263ca] group-hover:text-[#17376b] transition">
                                                <span>Speak directly with team</span>
                                                <span
                                                    aria-hidden="true"
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                >
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.a>

                                {/* Working Hours Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3 }}
                                    className="group relative overflow-hidden rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#3266bb]/40 p-5 shadow-2xs hover:shadow-md transition-all duration-300"
                                >
                                    <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1 origin-top scale-y-0 group-hover:scale-y-100 bg-gradient-to-b from-[#3266bb] to-teal-400 transition-transform duration-500" />
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#E6ECF5] group-hover:bg-[#2263ca] text-[#17376b] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0 mt-0.5">
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.9"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>

                                        <div className="min-w-0">
                                            <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                                                Working Hours
                                            </span>
                                            <p className="font-display font-bold text-xl sm:text-[22px] text-slate-900 mt-0.5">
                                                Monday – Saturday
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                9:30 AM – 6:30 PM IST
                                            </p>
                                            <OpenStatus />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Quick Link: Looking for a job? */}
                                <motion.button
                                    type="button"
                                    onClick={() => handleRoute('/jobs')}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -2 }}
                                    className="group w-full text-left rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#3266bb]/40 px-5 py-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="w-9 h-9 rounded-lg bg-[#E6ECF5] group-hover:bg-[#2263ca] text-[#17376b] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-display font-bold text-lg sm:text-xl text-slate-900">
                                                Looking for a job?
                                            </p>
                                            <p className="text-xs sm:text-sm text-slate-500 truncate">
                                                Explore current opportunities
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="text-slate-400 group-hover:text-[#2263ca] text-sm transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                                    >
                                        →
                                    </span>
                                </motion.button>

                                {/* Quick Link: Looking to hire? */}
                                <motion.button
                                    type="button"
                                    onClick={() => handleRoute('/employers')}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 'some' }}
                                    transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -2 }}
                                    className="group w-full text-left rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#3266bb]/40 px-5 py-4 shadow-2xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="w-9 h-9 rounded-lg bg-[#E6ECF5] group-hover:bg-[#2263ca] text-[#17376b] group-hover:text-white flex items-center justify-center transition-colors duration-300 shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-display font-bold text-lg sm:text-xl text-slate-900">
                                                Looking to hire?
                                            </p>
                                            <p className="text-xs sm:text-sm text-slate-500 truncate">
                                                Share your hiring requirement
                                            </p>
                                        </div>
                                    </div>

                                    <span
                                        aria-hidden="true"
                                        className="text-slate-400 group-hover:text-[#2263ca] text-sm transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                                    >
                                        →
                                    </span>
                                </motion.button>
                            </div>

                            {/* RIGHT COLUMN: SEND A MESSAGE FORM */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="lg:col-span-7 rounded-2xl bg-white/95 border border-slate-200/90 p-5 sm:p-8 shadow-sm"
                            >
                                {/* Form Header */}
                                <div className="pb-5 mb-6 border-b border-slate-200/80 space-y-1">
                                    <span className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3266bb]">
                                        Send a Message
                                    </span>
                                    <h2 className="font-display font-bold text-3xl sm:text-[36px] text-slate-900 tracking-tight">
                                        How can we help?
                                    </h2>
                                    <p className="font-sans text-sm sm:text-base text-slate-500">
                                        Fill out the details below and we&apos;ll get back to you shortly.
                                    </p>
                                </div>

                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-10 text-center space-y-3"
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
                                            Message Sent Successfully
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                                            Thank you, {formData.fullName}. Our recruitment specialist will review your inquiry and reply shortly.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSubmitted(false);
                                                setFormData({
                                                    fullName: '',
                                                    email: '',
                                                    phone: '',
                                                    subject: '',
                                                    message: '',
                                                });
                                            }}
                                            className="px-4 py-2 rounded-lg bg-[#092452] text-white text-xs font-semibold cursor-pointer"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                                                    placeholder="Your full name"
                                                    autoComplete="name"
                                                    className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#3266bb] focus:ring-2 focus:ring-[#3266bb]/15 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
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
                                                    placeholder="you@example.com"
                                                    className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#3266bb] focus:ring-2 focus:ring-[#3266bb]/15 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-800">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    autoComplete="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    placeholder="Your phone number"
                                                    className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#3266bb] focus:ring-2 focus:ring-[#3266bb]/15 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition"
                                                />
                                            </div>

                                            {/* Subject */}
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-slate-800">
                                                    Subject <span className="text-rose-500">*</span>
                                                </label>
                                                <select
                                                    required
                                                    value={formData.subject}
                                                    onChange={(e) => handleChange('subject', e.target.value)}
                                                    className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#3266bb] focus:ring-2 focus:ring-[#3266bb]/15 px-4 py-2.5 text-base sm:text-sm text-slate-800 focus:outline-none transition cursor-pointer"
                                                >
                                                    <option value="" disabled>
                                                        Select subject
                                                    </option>
                                                    <option value="Hiring / Talent Requirement">
                                                        Hiring / Talent Requirement
                                                    </option>
                                                    <option value="Job Application & Career Support">
                                                        Job Application &amp; Career Support
                                                    </option>
                                                    <option value="Contract / Bulk Staffing">
                                                        Contract / Bulk Staffing
                                                    </option>
                                                    <option value="Partnership / General Inquiry">
                                                        Partnership / General Inquiry
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-bold text-slate-800">
                                                Message <span className="text-rose-500">*</span>
                                            </label>
                                            <textarea
                                                rows={4}
                                                maxLength={1000}
                                                required
                                                value={formData.message}
                                                onChange={(e) => handleChange('message', e.target.value)}
                                                placeholder="Tell us what you need..."
                                                className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200/90 focus:border-[#3266bb] focus:ring-2 focus:ring-[#3266bb]/15 px-4 py-2.5 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition resize-none"
                                            />
                                            <p className="text-right text-[11px] text-slate-400">{formData.message.length}/1000</p>
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
                                            <span>Send Message</span>
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
                        </div>
                    </div>
                </section>

                {/* =========================================================
          SECTION 2: FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================= */}
                <section className="py-16 sm:py-20 bg-[#ffffff] border-t border-slate-200/70 overflow-x-clip">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center mb-10 sm:mb-12 space-y-2"
                        >
                            <span className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#3266bb]">
                                Quick Answers
                            </span>
                            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[52px] text-slate-900 tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </motion.div>

                        {/* Accordion Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-2xl bg-[#F4F6F9]/75 border border-slate-200/90 divide-y divide-slate-200/80 overflow-hidden shadow-2xs"
                        >
                            {FAQ_ITEMS.map((item, idx) => {
                                const isOpen = openFaq === idx;

                                return (
                                    <div key={item.question} className={`relative transition-colors duration-200 hover:bg-white/70 ${isOpen ? 'bg-white/80' : ''}`}>
                                        <span aria-hidden="true" className={`absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[#3266bb] to-teal-400 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                                            aria-expanded={isOpen}
                                            className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                                        >
                                            <span className="font-display font-bold text-lg sm:text-xl text-blue-900">
                                                {item.question}
                                            </span>

                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.25 }}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#092452] text-white' : 'bg-[#E6ECF5] text-[#17376b]'}`}
                                            >
                                                +
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="px-5 sm:px-6 pb-5 pt-0.5 font-sans text-sm sm:text-[15px] text-slate-500 leading-relaxed">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>
            </div>
        </MotionConfig>
    );
}