import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function TopUtilityMarquee() {
    const [isPaused, setIsPaused] = useState(false);

    const items = [
        <a
            key="email"
            href="mailto:info@talentbridgehr.online"
            className="flex items-center gap-1.5 hover:text-blue-300 transition whitespace-nowrap shrink-0"
        >
            <svg className="w-3.5 h-3.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>info@talentbridgehr.online</span>
        </a>,
        <a
            key="phone"
            href="tel:+919214032912"
            className="flex items-center gap-1.5 hover:text-blue-300 transition whitespace-nowrap shrink-0"
        >
            <svg className="w-3.5 h-3.5 text-blue-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+91 92140 32912</span>
        </a>,
        <a
            key="whatsapp"
            href="https://wa.me/919214032912"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-300 font-semibold hover:text-blue-200 transition whitespace-nowrap shrink-0"
        >
            WhatsApp Direct
        </a>,
        <div
            key="location"
            className="flex items-center gap-2 text-blue-200/80 whitespace-nowrap shrink-0"
        >
            <span className="w-2 h-2 rounded-full bg-blue-300 shrink-0" />
            <span>Indore · Bhopal · Pan-India Recruitment</span>
        </div>,
    ];

    const loopedTrack = [...items, ...items, ...items, ...items];

    return (
        <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-[#092452] text-blue-100/90 text-xs py-2 border-b border-white/10 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
                <motion.div
                    key={isPaused ? 'utility-paused' : 'utility-running'}
                    initial={{ x: '0%' }}
                    animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
                    transition={
                        isPaused
                            ? { duration: 0 }
                            : {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 24,
                                ease: 'linear',
                            }
                    }
                    className="flex w-max items-center gap-6 sm:gap-10"
                >
                    {loopedTrack.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0">
                            {node}
                            <span className="text-blue-300/40 select-none">•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

const DEMO_DROPDOWNS = {
    services: {
        label: 'Services',
        items: [
        
            {
                title: 'Tech & IT Recruitment',
                desc: 'Vetted engineers, product & cloud talent',
                to: '/services',
            },
            {
                title: 'Executive Search',
                desc: 'Leadership & department head placement',
                to: '/employers',
            },
        ],
    },
    solutions: {
        label: 'Solutions',
        items: [
            {
                title: 'For Candidates',
                desc: 'Curated roles & career guidance',
                to: '/candidates',
            },
            {
                title: 'For Employers',
                desc: '48–72 hr shortlists & custom hiring plans',
                to: '/employers',
            },
            {
                title: 'Live Job Board',
                desc: 'Explore open roles across locations',
                to: '/jobs',
            },
        ],
    },
};

export default function Navbar({ onOpenModal }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            const scrolled = docHeight > 0
                ? (window.scrollY / docHeight) * 100
                : 0;

            setScrollWidth(scrolled);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setOpenDropdown(null);

        if (location.hash) {
            const sectionId = location.hash.substring(1);

            requestAnimationFrame(() => {
                document.getElementById(sectionId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [location.pathname, location.hash]);

    const closeMenu = () => {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const handleDropdownNavigate = (to) => {
        closeMenu();
        navigate(to);
    };

    const activeClass = ({ isActive }) =>
        `relative py-2 transition-colors duration-200 ${isActive
            ? 'text-[#3266bb] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-[#3266bb]'
            : 'text-slate-600 hover:text-[#17376b]'
        }`;

    return (
        <div className="w-full overflow-x-clip">
            {/* SCROLL PROGRESS BAR */}
            <div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#092452] via-[#3266bb] to-[#2263ca] z-50 transition-[width] duration-75"
                style={{ width: `${scrollWidth}%` }}
            />

            {/* TOP UTILITY BAR (RIGHT TO LEFT CONTINUOUS LOOP) */}
            <TopUtilityMarquee />

            {/* MAIN NAVBAR */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
                    {/* LOGO */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-3 shrink-0"
                    >
                        <img
                            src="/logo2.png"
                            alt="TalentBridge HR"
                            className="h-12 sm:h-14 w-auto object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';

                                if (e.currentTarget.nextElementSibling) {
                                    e.currentTarget.nextElementSibling.style.display = 'flex';
                                }
                            }}
                        />

                        <div style={{ display: 'none' }} className="items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#092452] to-[#3266bb] flex items-center justify-center text-white font-display font-extrabold text-lg">
                                TB
                            </div>

                            <div>
                                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                                    Talent<span className="text-[#3266bb]">Bridge</span>
                                </span>

                                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#3266bb] -mt-1">
                                    HR &amp; Recruitment
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* DESKTOP NAVIGATION WITH DEMO DROPDOWNS */}
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
                        <NavLink to="/" end className={activeClass}>
                            Home
                        </NavLink>

                        <NavLink to="/about" className={activeClass}>
                            About
                        </NavLink>

                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown('services')}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown((prev) => (prev === 'services' ? null : 'services'))
                                }
                                className="inline-flex items-center gap-1 py-2 text-slate-600 hover:text-[#17376b] transition-colors cursor-pointer"
                            >
                                <span>{DEMO_DROPDOWNS.services.label}</span>
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180 text-[#3266bb]' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {openDropdown === 'services' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute left-0 top-full pt-2 w-64 z-50"
                                    >
                                        <div className="rounded-xl bg-white border border-slate-200/90 shadow-xl p-2 space-y-1">
                                            {DEMO_DROPDOWNS.services.items.map((item) => (
                                                <button
                                                    key={item.title}
                                                    type="button"
                                                    onClick={() => handleDropdownNavigate(item.to)}
                                                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F6F9] transition cursor-pointer group"
                                                >
                                                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#3266bb] transition-colors">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Solutions Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown('solutions')}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown((prev) => (prev === 'solutions' ? null : 'solutions'))
                                }
                                className="inline-flex items-center gap-1 py-2 text-slate-600 hover:text-[#17376b] transition-colors cursor-pointer"
                            >
                                <span>{DEMO_DROPDOWNS.solutions.label}</span>
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'solutions' ? 'rotate-180 text-[#3266bb]' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {openDropdown === 'solutions' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 6 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute left-0 top-full pt-2 w-64 z-50"
                                    >
                                        <div className="rounded-xl bg-white border border-slate-200/90 shadow-xl p-2 space-y-1">
                                            {DEMO_DROPDOWNS.solutions.items.map((item) => (
                                                <button
                                                    key={item.title}
                                                    type="button"
                                                    onClick={() => handleDropdownNavigate(item.to)}
                                                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F4F6F9] transition cursor-pointer group"
                                                >
                                                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#3266bb] transition-colors">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink to="/jobs" className={activeClass}>
                            Jobs
                        </NavLink>

                        <NavLink to="/contact" className={activeClass}>
                            Contact
                        </NavLink>
                    </nav>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onOpenModal && onOpenModal('candidateModal')}
                            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:border-[#3266bb] hover:text-[#17376b] transition cursor-pointer"
                        >
                            Find a Job
                        </motion.button>

                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onOpenModal && onOpenModal('employerModal')}
                            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#092452] hover:bg-[#17376b] text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
                        >
                            Hire Talent
                        </motion.button>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            aria-label="Toggle Menu"
                            aria-expanded={mobileMenuOpen}
                            className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MOBILE NAVIGATION */}
                <AnimatePresence initial={false}>
                    {mobileMenuOpen && (
                        <motion.div
                            key="mobile-nav-drawer"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-1.5 text-sm font-semibold overflow-hidden"
                        >
                            <NavLink
                                to="/"
                                end
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `block py-2.5 px-3 rounded-lg transition ${isActive
                                        ? 'text-[#3266bb] bg-[#E6ECF5]/70'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/about"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `block py-2.5 px-3 rounded-lg transition ${isActive
                                        ? 'text-[#3266bb] bg-[#E6ECF5]/70'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`
                                }
                            >
                                About
                            </NavLink>

                            {/* Mobile Dropdowns */}
                            {Object.entries(DEMO_DROPDOWNS).map(([key, group]) => {
                                const isExpanded = mobileExpanded === key;

                                return (
                                    <div key={key} className="rounded-lg border border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMobileExpanded((prev) => (prev === key ? null : key))
                                            }
                                            className="w-full flex items-center justify-between py-2.5 px-3 text-slate-700 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                                        >
                                            <span>{group.label}</span>
                                            <svg
                                                className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#3266bb]' : ''
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {isExpanded && (
                                            <div className="px-3 pb-2.5 space-y-1">
                                                {group.items.map((item) => (
                                                    <button
                                                        key={item.title}
                                                        type="button"
                                                        onClick={() => handleDropdownNavigate(item.to)}
                                                        className="block w-full text-left py-1.5 px-2.5 rounded-md text-xs text-slate-600 hover:text-[#3266bb] hover:bg-[#F4F6F9] transition cursor-pointer"
                                                    >
                                                        {item.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <NavLink
                                to="/jobs"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `block py-2.5 px-3 rounded-lg transition ${isActive
                                        ? 'text-[#3266bb] bg-[#E6ECF5]/70'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`
                                }
                            >
                                Jobs
                            </NavLink>

                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `block py-2.5 px-3 rounded-lg transition ${isActive
                                        ? 'text-[#3266bb] bg-[#E6ECF5]/70'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`
                                }
                            >
                                Contact
                            </NavLink>

                            {/* MOBILE ACTION BUTTONS */}
                            <div className="pt-3 flex flex-col sm:flex-row gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        onOpenModal && onOpenModal('candidateModal');
                                    }}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                                >
                                    Find a Job
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        closeMenu();
                                        onOpenModal && onOpenModal('employerModal');
                                    }}
                                    className="flex-1 py-2.5 rounded-xl bg-[#092452] text-white text-xs font-bold cursor-pointer"
                                >
                                    Hire Talent
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </div>
    );
}