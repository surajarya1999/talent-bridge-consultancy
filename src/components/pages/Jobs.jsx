import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const QUICK_KEYWORDS = ['HR Intern', 'Digital Marketing Intern', 'Mern Stack developer Intern', 'React Developer'];
const QUICK_LOCATIONS = ['Gwalior', 'Indore', 'Bhopal', 'Remote'];

const TRUST_HIGHLIGHTS = [
    { label: '500+ Verified Openings', icon: 'briefcase' },
    { label: '48-Hr Profile Review', icon: 'clock' },
    { label: 'Zero Candidate Fees', icon: 'shield' },
];

const INITIAL_JOBS = [
    {
        id: 'hr-intern',
        category: 'MARKETING',
        title: 'HR Intern',
        location: 'remote',
        experience: '',
        jobType: 'Remote',
        summary:
            'Key Responsibilities Source candidates through job portals, LinkedIn, social media, and other recruitment channels. Review and screen resumes based...',
        fullDescription:
            'Assist the talent acquisition team with end-to-end candidate sourcing, screening resumes, scheduling interviews, and maintaining candidate trackers across portals and LinkedIn.',
        skills: ['Talent Sourcing', 'Resume Screening', 'LinkedIn Recruiter', 'Communication'],
    },
    {
        id: 'digital-marketing-intern',
        category: 'MARKETING',
        title: 'Digital Marketing Intern',
        location: 'Gwalior',
        experience: '',
        jobType: 'Internship',
        summary:
            'Job Description: We are looking for a creative and enthusiastic Digital Marketing Intern to support our online marketing activities. The candidate...',
        fullDescription:
            'Support social media campaigns, content calendars, basic SEO research, and performance tracking to grow brand reach and candidate engagement.',
        skills: ['Social Media', 'Content Creation', 'Campaign Tracking', 'Canva / Meta Ads'],
    },
    {
        id: 'mern-stack-intern',
        category: 'IT',
        title: 'Mern Stack developer Intern',
        location: 'Gwalior',
        experience: '0–1 Year / Freshers',
        jobType: 'Internship',
        summary:
            'We are looking for a motivated Full Stack Developer Intern to join our development team and work on real-world web applications.',
        fullDescription:
            'Collaborate with engineering mentors to build responsive UI components, integrate REST APIs, and work on MongoDB, Express, React, and Node.js modules.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React.js / Node.js', 'MongoDB and REST APIs'],
    },
];

function TrustHighlightIcon({ type }) {
    const iconClass =
        'w-4 h-4 text-[#0B2D63] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shrink-0';

    if (type === 'briefcase') {
        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        );
    }

    if (type === 'clock') {
        return (
            <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        );
    }

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

export default function Jobs({ jobs = INITIAL_JOBS, onOpenModal, onSearchJobs }) {
    const [keyword, setKeyword] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [focusedField, setFocusedField] = useState(null);

    const [jobTypeFilter, setJobTypeFilter] = useState('All Types');
    const [experienceFilter, setExperienceFilter] = useState('All Experience');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [selectedJob, setSelectedJob] = useState(null);

    const jobTypeOptions = useMemo(() => {
        const types = Array.from(new Set(jobs.map((j) => j.jobType).filter(Boolean)));
        return ['All Types', ...types];
    }, [jobs]);

    const experienceOptions = useMemo(() => {
        const exps = Array.from(new Set(jobs.map((j) => j.experience).filter(Boolean)));
        return ['All Experience', ...exps];
    }, [jobs]);

    const categoryOptions = useMemo(() => {
        const cats = Array.from(new Set(jobs.map((j) => j.category).filter(Boolean)));
        return ['All Categories', ...cats];
    }, [jobs]);

    const filteredJobs = useMemo(() => {
        const qKey = keyword.trim().toLowerCase();
        const qLoc = locationQuery.trim().toLowerCase();

        return jobs.filter((job) => {
            const matchesKeyword =
                !qKey ||
                job.title.toLowerCase().includes(qKey) ||
                job.category.toLowerCase().includes(qKey) ||
                job.summary.toLowerCase().includes(qKey) ||
                (job.skills && job.skills.some((s) => s.toLowerCase().includes(qKey)));

            const matchesLocation =
                !qLoc || job.location.toLowerCase().includes(qLoc);

            const matchesType =
                jobTypeFilter === 'All Types' || job.jobType === jobTypeFilter;

            const matchesExp =
                experienceFilter === 'All Experience' || job.experience === experienceFilter;

            const matchesCat =
                categoryFilter === 'All Categories' || job.category === categoryFilter;

            return matchesKeyword && matchesLocation && matchesType && matchesExp && matchesCat;
        });
    }, [jobs, keyword, locationQuery, jobTypeFilter, experienceFilter, categoryFilter]);

    const hasActiveFilters =
        keyword.trim() !== '' ||
        locationQuery.trim() !== '' ||
        jobTypeFilter !== 'All Types' ||
        experienceFilter !== 'All Experience' ||
        categoryFilter !== 'All Categories';

    const handleResetAll = () => {
        setKeyword('');
        setLocationQuery('');
        setJobTypeFilter('All Types');
        setExperienceFilter('All Experience');
        setCategoryFilter('All Categories');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearchJobs) {
            onSearchJobs({
                keyword: keyword.trim(),
                location: locationQuery.trim(),
            });
        }
        const listEl = document.getElementById('open-positions-section');
        if (listEl) {
            listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleApplyClick = (job) => {
        if (onOpenModal) {
            onOpenModal('candidateModal', job);
        } else {
            window.location.href = '/#contact';
        }
    };

    return (
        <div className="w-full overflow-x-clip bg-[#F4F6F9]">
            {/* =========================================================
          SECTION 1: CAREER OPPORTUNITIES HERO (DOTS + LIGHT BLUR BG)
         ========================================================= */}
            <section className="relative py-14 sm:py-20 lg:py-24 bg-[#F4F6F9] overflow-hidden">
                {/* Small Dots Pattern Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-65"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(11, 45, 99, 0.16) 1.15px, transparent 1.15px)',
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Soft Light Blur Orbs */}
                <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-300/25 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-28 -right-24 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-teal-200/25 blur-3xl pointer-events-none" />
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-white/75 blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Eyebrow Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-3 sm:mb-4"
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-slate-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0B2D63] animate-pulse" />
                            Career Opportunities
                        </span>
                    </motion.div>

                    {/* Main Display Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display font-bold text-3xl sm:text-5xl lg:text-[54px] text-slate-900 leading-[1.1] tracking-tight max-w-3xl mx-auto"
                    >
                        Find a job that moves{' '}
                        <span className="text-[#123060]">your career forward.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="font-sans text-slate-500 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto mt-3.5 sm:mt-4"
                    >
                        Explore current verified opportunities from top companies looking for talented professionals
                    </motion.p>

                    {/* Dual Search Bar Capsule */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 0.58, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 sm:mt-10 max-w-4xl mx-auto bg-white/85 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/90 shadow-lg shadow-slate-900/[0.05] hover:shadow-xl hover:bg-white/95 transition-all duration-300"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
                            {/* Keyword Input */}
                            <div
                                className={`group md:col-span-5 flex items-center gap-2.5 px-3.5 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 ${focusedField === 'keyword'
                                        ? 'bg-white border-[#0B2D63] ring-2 ring-[#0B2D63]/10'
                                        : 'bg-[#F8FAFC]/90 border-slate-200/90 hover:border-slate-300'
                                    }`}
                            >
                                <svg
                                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${focusedField === 'keyword'
                                            ? 'text-[#0B2D63] scale-110'
                                            : 'text-slate-400 group-hover:text-[#0B2D63] group-hover:scale-110'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    value={keyword}
                                    onFocus={() => setFocusedField('keyword')}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Job title, skills or keywords"
                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                />

                                <AnimatePresence>
                                    {keyword && (
                                        <motion.button
                                            type="button"
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.7 }}
                                            onClick={() => setKeyword('')}
                                            aria-label="Clear keyword"
                                            className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1 cursor-pointer"
                                        >
                                            ✕
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Location Input */}
                            <div
                                className={`group md:col-span-4 flex items-center gap-2.5 px-3.5 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 ${focusedField === 'location'
                                        ? 'bg-white border-[#0B2D63] ring-2 ring-[#0B2D63]/10'
                                        : 'bg-[#F8FAFC]/90 border-slate-200/90 hover:border-slate-300'
                                    }`}
                            >
                                <svg
                                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${focusedField === 'location'
                                            ? 'text-[#0B2D63] scale-110 -translate-y-0.5'
                                            : 'text-slate-400 group-hover:text-[#0B2D63] group-hover:scale-110 group-hover:-translate-y-0.5'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    value={locationQuery}
                                    onFocus={() => setFocusedField('location')}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(e) => setLocationQuery(e.target.value)}
                                    placeholder="Location (e.g. Gwalior, Remote)"
                                    className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                                />

                                <AnimatePresence>
                                    {locationQuery && (
                                        <motion.button
                                            type="button"
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.7 }}
                                            onClick={() => setLocationQuery('')}
                                            aria-label="Clear location"
                                            className="text-slate-400 hover:text-slate-700 text-xs font-bold px-1 cursor-pointer"
                                        >
                                            ✕
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Search Button */}
                            <div className="md:col-span-3">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group w-full py-2.5 sm:py-3 px-5 rounded-xl bg-[#092452] hover:bg-[#0D3270] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2"
                                >
                                    <svg
                                        className="w-4 h-4 text-blue-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                                        />
                                    </svg>
                                    <span>Search Jobs</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.form>

                    {/* Quick Trending Roles & Cities Chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs"
                    >
                        <span className="text-slate-400 font-semibold mr-1">Popular:</span>

                        {QUICK_KEYWORDS.map((role) => (
                            <motion.button
                                key={role}
                                type="button"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setKeyword((prev) => (prev === role ? '' : role))}
                                className={`px-3 py-1 rounded-full border text-[11px] font-medium transition cursor-pointer ${keyword === role
                                        ? 'bg-[#0B2D63] text-white border-[#0B2D63]'
                                        : 'bg-white/80 hover:bg-white text-slate-600 border-slate-200/90 hover:border-[#0B2D63]/35'
                                    }`}
                            >
                                {role}
                            </motion.button>
                        ))}

                        <span className="hidden sm:inline text-slate-300 mx-1">|</span>

                        {QUICK_LOCATIONS.map((city) => (
                            <motion.button
                                key={city}
                                type="button"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setLocationQuery((prev) => (prev === city ? '' : city))}
                                className={`px-3 py-1 rounded-full border text-[11px] font-medium transition cursor-pointer ${locationQuery.toLowerCase() === city.toLowerCase()
                                        ? 'bg-[#0B2D63] text-white border-[#0B2D63]'
                                        : 'bg-white/80 hover:bg-white text-slate-600 border-slate-200/90 hover:border-[#0B2D63]/35'
                                    }`}
                            >
                                {city}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Interactive Trust Strip with Hover Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-7 pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
                    >
                        {TRUST_HIGHLIGHTS.map((item) => (
                            <motion.div
                                key={item.label}
                                whileHover={{ y: -2 }}
                                className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0B2D63] transition-colors cursor-default"
                            >
                                <span className="w-7 h-7 rounded-lg bg-white/90 border border-slate-200/90 group-hover:border-[#0B2D63]/35 group-hover:bg-[#E6ECF5] flex items-center justify-center shadow-2xs transition-colors">
                                    <TrustHighlightIcon type={item.icon} />
                                </span>
                                <span>{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* =========================================================
          SECTION 2: OPEN POSITIONS + FILTER SIDEBAR + CTA BANNER
         ========================================================= */}
            <section
                id="open-positions-section"
                className="py-10 sm:py-16 bg-[#F4F6F9] border-t border-slate-200/60 overflow-x-clip"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
                        {/* LEFT COLUMN: FILTER JOBS SIDEBAR */}
                        <motion.aside
                            initial={{ opacity: 0, x: -22 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-4 lg:sticky lg:top-24 rounded-2xl bg-white/90 border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5"
                        >
                            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                                <div>
                                    <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                                        Filter Jobs
                                    </h2>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Refine your search
                                    </p>
                                </div>

                                <AnimatePresence>
                                    {hasActiveFilters && (
                                        <motion.button
                                            type="button"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            onClick={handleResetAll}
                                            className="text-xs font-bold text-[#0B2D63] hover:text-blue-700 underline underline-offset-4 cursor-pointer"
                                        >
                                            Reset
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* JOB TYPE */}
                            <div className="group space-y-2">
                                <label
                                    htmlFor="filter-job-type"
                                    className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 group-hover:text-[#0B2D63] transition-colors"
                                >
                                    <span>Job Type</span>
                                    <svg
                                        className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B2D63] group-hover:scale-110 transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                                        />
                                    </svg>
                                </label>

                                <select
                                    id="filter-job-type"
                                    value={jobTypeFilter}
                                    onChange={(e) => setJobTypeFilter(e.target.value)}
                                    className="w-full rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none transition cursor-pointer"
                                >
                                    {jobTypeOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* EXPERIENCE */}
                            <div className="group space-y-2">
                                <label
                                    htmlFor="filter-experience"
                                    className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 group-hover:text-[#0B2D63] transition-colors"
                                >
                                    <span>Experience</span>
                                    <svg
                                        className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B2D63] group-hover:scale-110 transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </label>

                                <select
                                    id="filter-experience"
                                    value={experienceFilter}
                                    onChange={(e) => setExperienceFilter(e.target.value)}
                                    className="w-full rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none transition cursor-pointer"
                                >
                                    {experienceOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* CATEGORY */}
                            <div className="group space-y-2">
                                <label
                                    htmlFor="filter-category"
                                    className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 group-hover:text-[#0B2D63] transition-colors"
                                >
                                    <span>Category</span>
                                    <svg
                                        className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0B2D63] group-hover:scale-110 transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h7"
                                        />
                                    </svg>
                                </label>

                                <select
                                    id="filter-category"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full rounded-xl bg-[#F8FAFC] hover:bg-white border border-slate-200/90 focus:border-[#0B2D63] focus:ring-2 focus:ring-[#0B2D63]/10 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none transition cursor-pointer"
                                >
                                    {categoryOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </motion.aside>

                        {/* RIGHT COLUMN: OPEN POSITIONS + JOB CARDS + CTA BANNER */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Top Heading Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-wrap items-center justify-between gap-3"
                            >
                                <div>
                                    <span className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                                        Open Positions
                                    </span>
                                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-0.5">
                                        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
                                    </h2>
                                </div>

                                <span className="px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-[11px] font-semibold text-slate-500 shadow-2xs">
                                    Latest opportunities
                                </span>
                            </motion.div>

                            {/* Job Cards Stack */}
                            {filteredJobs.length > 0 ? (
                                <div className="space-y-4 sm:space-y-5">
                                    {filteredJobs.map((job, idx) => (
                                        <motion.article
                                            key={job.id || job.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 'some' }}
                                            transition={{
                                                duration: 0.45,
                                                delay: idx * 0.07,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            whileHover={{ y: -4 }}
                                            className="group rounded-2xl bg-white/95 hover:bg-white border border-slate-200/90 hover:border-[#0B2D63]/35 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                {/* Left Icon + Job Content */}
                                                <div className="flex items-start gap-4 min-w-0 flex-1">
                                                    <div className="w-11 h-11 rounded-xl bg-[#E8EEF7] group-hover:bg-[#0B2D63] text-[#173568] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300">
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
                                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        {/* Category Pill */}
                                                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#E8EEF7] text-[#173568] text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                                                            {job.category}
                                                        </span>

                                                        {/* Job Title */}
                                                        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                                                            {job.title}
                                                        </h3>

                                                        {/* Meta Badges */}
                                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                                            {job.location && (
                                                                <span className="group/loc inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4F6F9] border border-slate-200/80 text-[11px] font-medium text-slate-600">
                                                                    <svg
                                                                        className="w-3 h-3 text-slate-500 transition-transform duration-200 group-hover/loc:scale-110"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        />
                                                                    </svg>
                                                                    <span>{job.location}</span>
                                                                </span>
                                                            )}

                                                            {job.experience && (
                                                                <span className="group/exp inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4F6F9] border border-slate-200/80 text-[11px] font-medium text-slate-600">
                                                                    <svg
                                                                        className="w-3 h-3 text-slate-500 transition-transform duration-200 group-hover/exp:scale-110"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                                                                        />
                                                                    </svg>
                                                                    <span>{job.experience}</span>
                                                                </span>
                                                            )}

                                                            {job.jobType && (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F4F6F9] border border-slate-200/80 text-[11px] font-medium text-slate-600">
                                                                    {job.jobType}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Job Summary */}
                                                        <p className="font-sans text-slate-500 text-xs sm:text-[13px] leading-relaxed mt-3">
                                                            {job.summary}
                                                        </p>

                                                        {/* Skill Chips (if present) */}
                                                        {job.skills && job.skills.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5 mt-3.5">
                                                                {job.skills.map((skill) => (
                                                                    <span
                                                                        key={skill}
                                                                        className="px-2.5 py-1 rounded-md bg-[#F4F6F9] hover:bg-[#E8EEF7] border border-slate-200/80 text-[11px] font-medium text-slate-600 hover:text-[#173568] transition-colors"
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right Action Buttons */}
                                                <div className="flex items-center gap-2.5 shrink-0 pt-1 md:pt-0">
                                                    <motion.button
                                                        type="button"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setSelectedJob(job)}
                                                        className="group/btn px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#0B2D63]/40 text-slate-700 hover:text-[#0B2D63] text-xs font-semibold transition cursor-pointer inline-flex items-center gap-1.5"
                                                    >
                                                        <span>View Details</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                                                        >
                                                            →
                                                        </span>
                                                    </motion.button>

                                                    <motion.button
                                                        type="button"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleApplyClick(job)}
                                                        className="px-4 py-2 rounded-lg bg-[#08224E] hover:bg-[#0C2F6B] text-white text-xs font-semibold shadow-sm hover:shadow-md transition cursor-pointer"
                                                    >
                                                        Apply Now
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl bg-white border border-slate-200/90 p-8 text-center space-y-3">
                                    <p className="font-display font-bold text-lg text-slate-900">
                                        No matching roles found
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500">
                                        Try clearing a filter or searching with another keyword or location.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleResetAll}
                                        className="px-4 py-2 rounded-lg bg-[#08224E] text-white text-xs font-semibold cursor-pointer"
                                    >
                                        Show All Jobs
                                    </button>
                                </div>
                            )}

                            {/* CAN'T FIND THE RIGHT ROLE? BANNER */}
                            <motion.div
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 'some' }}
                                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -3 }}
                                className="group rounded-2xl bg-[#061B3B] hover:bg-[#08224B] border border-slate-800 hover:border-blue-400/35 p-6 sm:p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                            >
                                <div className="space-y-1.5 max-w-xl">
                                    <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                        Can&apos;t find the right role
                                    </span>

                                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                                        Submit your profile and we&apos;ll{' '}
                                        <span className="text-blue-300">keep you in mind.</span>
                                    </h3>

                                    <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed">
                                        Tell us about your skills and career goals. Our recruitment team can connect you with suitable opportunities.
                                    </p>
                                </div>

                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleApplyClick({ title: 'General Profile Submission' })}
                                    className="group/cta shrink-0 px-4 py-2.5 rounded-lg bg-[#E9EDF2] hover:bg-white text-[#061B3B] text-xs font-bold shadow-sm transition cursor-pointer inline-flex items-center justify-center gap-2"
                                >
                                    <span>Submit Your Profile</span>
                                    <span
                                        aria-hidden="true"
                                        className="transition-transform duration-300 group-hover/cta:translate-x-1"
                                    >
                                        →
                                    </span>
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          JOB DETAILS MODAL (WHEN "VIEW DETAILS" IS CLICKED)
         ========================================================= */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        key="job-detail-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedJob(null)}
                        className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-xs flex items-center justify-center p-4"
                    >
                        <motion.div
                            key="job-detail-card"
                            initial={{ opacity: 0, scale: 0.95, y: 14 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 14 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#E8EEF7] text-[#173568] text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                                        {selectedJob.category}
                                    </span>
                                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                                        {selectedJob.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {selectedJob.location}
                                        {selectedJob.experience ? ` · ${selectedJob.experience}` : ''}
                                        {selectedJob.jobType ? ` · ${selectedJob.jobType}` : ''}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedJob(null)}
                                    aria-label="Close details"
                                    className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {selectedJob.fullDescription || selectedJob.summary}
                            </p>

                            {selectedJob.skills && selectedJob.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {selectedJob.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 rounded-md bg-[#F4F6F9] border border-slate-200/80 text-[11px] font-medium text-slate-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedJob(null)}
                                    className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const jobToApply = selectedJob;
                                        setSelectedJob(null);
                                        handleApplyClick(jobToApply);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-[#08224E] hover:bg-[#0C2F6B] text-white text-xs font-semibold cursor-pointer"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}