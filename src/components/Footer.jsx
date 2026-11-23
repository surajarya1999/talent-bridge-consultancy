import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = ({ onOpenModal }) => {
    const companyLinks = [
        { name: "About Us", to: "/about" },
        { name: "Services", to: "/services" },
        { name: "Current Jobs", to: "/jobs" },
        { name: "Contact", to: "/contact" },
    ];

    const userLinks = [
        { name: "For Candidates", to: "/candidates" },
        { name: "For Employers", to: "/employers" },
        { name: "Find a Job", to: "/jobs" },
    ];

    const specializationLinks = [
        { name: "Tech & Engineering", to: "/jobs" },
        { name: "FinTech & SaaS", to: "/services" },
        { name: "Healthcare & Ops", to: "/services" },
        { name: "Leadership Search", to: "/employers" },
    ];

    const socialLinks = [
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.37V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                </svg>
            ),
        },
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.2H7.5V13h2.8v8h3.2z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="relative bg-[#092452] text-white border-t border-white/10 overflow-hidden">
            {/* Subtle Dot Matrix Background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "radial-gradient(#93c5fd 0.75px, transparent 0.75px)",
                    backgroundSize: "18px 18px",
                }}
            />

            {/* Soft Ambient Blur Glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-[#3266bb]/25 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-[#2263ca]/20 blur-3xl"
            />

            {/* Top Quick Action Strip */}
            <div className="relative z-10 border-b border-white/10 bg-[#071c40]/70 backdrop-blur-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="font-display font-bold text-sm sm:text-base text-white">
                            Ready to scale your team or land your next role?
                        </p>
                        <p className="font-sans text-xs text-blue-200/80 mt-0.5">
                            Pre-vetted talent shortlists in 48–72 hours &amp; verified career opportunities.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                        <Link
                            to="/jobs"
                            onClick={() => onOpenModal && onOpenModal("candidateModal")}
                            className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition cursor-pointer"
                        >
                            Upload Resume
                        </Link>
                        <Link
                            to="/employers"
                            onClick={() => onOpenModal && onOpenModal("employerModal")}
                            className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-lg bg-[#3266bb] hover:bg-[#2263ca] text-white text-xs font-semibold shadow-sm transition cursor-pointer"
                        >
                            Hire Talent →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-9 lg:gap-10">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: "some" }}
                        transition={{ duration: 0.45 }}
                        className="sm:col-span-2 lg:col-span-4 space-y-4"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center bg-white rounded-lg p-2.5 shadow-sm"
                        >
                            <img
                                src="/logo2.png"
                                alt="TalentBridge Logo"
                                className="w-28 h-auto object-contain"
                            />
                        </Link>

                        <p className="font-sans text-blue-100/75 text-xs leading-relaxed max-w-sm">
                            Connecting exceptional talent with forward-thinking organizations through smarter recruitment, people-first matching, and dedicated HR advisory.
                        </p>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-blue-200/90">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <span>Mon–Sat · 9:30 AM – 6:30 PM IST</span>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5 pt-1">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: "some" }}
                                    transition={{ duration: 0.35, delay: index * 0.08 }}
                                    whileHover={{ y: -3, scale: 1.06 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center text-blue-100/80 hover:text-white hover:bg-[#3266bb] hover:border-[#3266bb] transition-all duration-200"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: "some" }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="font-display text-white font-bold text-xs uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2.5">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="inline-block font-sans text-blue-100/75 text-xs hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* For You & Specializations */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: "some" }}
                        transition={{ duration: 0.45, delay: 0.14 }}
                        className="lg:col-span-3"
                    >
                        <h3 className="font-display text-white font-bold text-xs uppercase tracking-wider mb-4">
                            For You
                        </h3>
                        <ul className="space-y-2.5 mb-6">
                            {userLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        className="inline-block font-sans text-blue-100/75 text-xs hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="font-display text-blue-200/90 font-bold text-[11px] uppercase tracking-wider mb-2.5">
                            Core Sectors
                        </h4>
                        <ul className="space-y-2">
                            {specializationLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.to}
                                        className="inline-block font-sans text-blue-100/65 text-[11.5px] hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: "some" }}
                        transition={{ duration: 0.45, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <h3 className="font-display text-white font-bold text-xs uppercase tracking-wider mb-4">
                            Contact
                        </h3>

                        <div className="space-y-3.5">
                            <a
                                href="mailto:info@talentbridgehr.online"
                                className="flex items-center gap-3 text-blue-100/80 hover:text-white transition-colors group"
                            >
                                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 group-hover:bg-[#3266bb] group-hover:text-white shrink-0 transition-colors">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        viewBox="0 0 24 24"
                                    >
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="m3 7 9 6 9-6" />
                                    </svg>
                                </span>
                                <span className="font-sans text-xs break-all">
                                    info@talentbridgehr.online
                                </span>
                            </a>

                            <a
                                href="tel:+919305765097"
                                className="flex items-center gap-3 text-blue-100/80 hover:text-white transition-colors group"
                            >
                                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-200 group-hover:bg-[#3266bb] group-hover:text-white shrink-0 transition-colors">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.2 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.1 9.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0122 16.92z"
                                        />
                                    </svg>
                                </span>
                                <span className="font-sans text-xs">
                                    +91 93057 65097
                                </span>
                            </a>

                            <div className="pt-2 border-t border-white/10">
                                <p className="font-sans text-[11px] text-blue-200/70 leading-relaxed">
                                    Serving clients across India &amp; global remote hubs with transparent hiring workflows.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="relative z-10 border-t border-white/10 bg-[#071c40]/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="font-sans text-blue-200/65 text-xs text-center sm:text-left">
                            © {new Date().getFullYear()} TalentBridge HR. All rights reserved.
                        </p>

                        <div className="flex items-center gap-5">
                            <Link
                                to="/privacy-policy"
                                className="font-sans text-blue-200/65 text-xs hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="font-sans text-blue-200/65 text-xs hover:text-white transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;