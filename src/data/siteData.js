export const HERO_SLIDES = [
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
            className: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25',
        },
        secondaryCta: { label: 'See 4-Step Screening', href: '#process' },
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80',
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
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80',
        fallbackImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80',
        alt: 'Career Growth Opportunities',
        cardType: 'candidate',
    },
];

export const COMPANIES = [
    { name: 'NexaCloud Technologies', dot: 'bg-blue-600' },
    { name: 'FinEdge Systems', dot: 'bg-teal-500' },
    { name: 'Central India Infra Ltd', dot: 'bg-indigo-600' },
    { name: 'MediCare HealthOps', dot: 'bg-emerald-500' },
    { name: 'DataPulse Analytics', dot: 'bg-blue-700' },
    { name: 'AeroLogix Supply Chain', dot: 'bg-cyan-600' },
    { name: 'QuantumSoft Labs', dot: 'bg-teal-600' },
    { name: 'Apex Retail Group', dot: 'bg-blue-600' },
];

export const SERVICES = [
    {
        num: '01',
        tag: 'Full-Time',
        title: 'Permanent Hiring',
        description: 'Find skilled mid-to-senior professionals ready to grow with your team long term with replacement guarantee.',
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
        description: 'Agile workforce solutions to scale your project teams quickly on demand with zero compliance overhead.',
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
        description: 'Connect with vetted software engineers, full-stack developers, DevOps, and product specialists.',
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
        description: 'Strategic HR support, compensation benchmarking, and hiring workflow optimization for growing organizations.',
        cta: 'Book HR Consultation →',
        accent: 'hover:border-teal-600/50',
        badgeClass: 'text-blue-700 bg-blue-50',
        iconClass: 'bg-teal-600/10 text-teal-700',
        linkClass: 'text-teal-700',
    },
];

export const JOBS = [
    {
        location: 'Indore',
        department: 'IT & Engineering',
        deptClass: 'bg-blue-50 text-blue-700',
        type: 'Full Time',
        title: 'Software Developer (React / Node.js)',
        meta: 'Indore · 2–5 Years Exp · ₹6.5 – 11 LPA',
        description: 'Build scalable web applications for a fast-growing SaaS product partner in Vijay Nagar, Indore.',
        applyRole: 'Software Developer (Indore)',
    },
    {
        location: 'Bhopal',
        department: 'Human Resources',
        deptClass: 'bg-teal-50 text-teal-700',
        type: 'Full Time',
        title: 'HR Executive & Talent Partner',
        meta: 'Bhopal · 1–4 Years Exp · ₹3.6 – 5.5 LPA',
        description: 'Manage end-to-end talent acquisition, onboarding workflows, and employee engagement operations.',
        applyRole: 'HR Executive (Bhopal)',
    },
    {
        location: 'Remote',
        department: 'Cloud & DevOps',
        deptClass: 'bg-indigo-50 text-indigo-700',
        type: 'Remote',
        title: 'Senior DevOps Engineer (AWS)',
        meta: 'Remote / Pan-India · 4–7 Years Exp · ₹14 – 22 LPA',
        description: 'Architect CI/CD pipelines, Kubernetes clusters, and cloud security for a FinTech enterprise.',
        applyRole: 'Senior DevOps Engineer (Remote)',
    },
];

export const GALLERY_ITEMS = [
    {
        category: 'Advisory',
        badgeClass: 'text-teal-300',
        title: 'Executive Talent Strategy Sessions',
        thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
        full: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',
    },
    {
        category: 'Interviews',
        badgeClass: 'text-blue-300',
        title: 'Technical Screening & Team Alignment',
        thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
        full: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=85',
    },
    {
        category: 'Workplace',
        badgeClass: 'text-teal-300',
        title: 'Collaborative Hiring & Onboarding',
        thumb: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80',
        full: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=85',
    },
    {
        category: 'Advisory',
        badgeClass: 'text-teal-300',
        title: 'Dedicated HR & Career Consulting',
        thumb: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
        full: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=85',
    },
    {
        category: 'Interviews',
        badgeClass: 'text-blue-300',
        title: 'Client Leadership & Recruitment Review',
        thumb: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
        full: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
    },
    {
        category: 'Workplace',
        badgeClass: 'text-teal-300',
        title: 'Workforce Planning & Analytics',
        thumb: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
        full: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=85',
    },
];

export const PROCESS_STEPS = [
    { step: 'Step 01', title: 'Understand', desc: 'We map your technical requirements, team dynamic, budget, and growth goals.' },
    { step: 'Step 02', title: 'Identify', desc: 'We source, screen, and shortlist high-caliber candidates from our curated network.' },
    { step: 'Step 03', title: 'Connect', desc: 'We coordinate structured interviews and validate mutual culture alignment.' },
    { step: 'Step 04', title: 'Place', desc: 'We guide offer rollouts, smooth onboarding, and post-placement retention check-ins.' },
];

export const TESTIMONIALS = [
    {
        quote: 'TalentBridge understood our exact hiring needs and helped us close key engineering roles rapidly with top talent.',
        initials: 'RK',
        avatarClass: 'bg-blue-700 text-white',
        name: 'Rahul Kapoor',
        role: 'HR Manager · Tech Enterprise',
    },
    {
        quote: 'Smooth, transparent process from start to finish. We found strong candidate fits much faster than expected.',
        initials: 'PS',
        avatarClass: 'bg-teal-600 text-white',
        name: 'Priya Sharma',
        role: 'Founder · High Growth Startup',
    },
    {
        quote: 'They genuinely prioritize long-term cultural alignment and quality over simply closing open spots.',
        initials: 'AM',
        avatarClass: 'bg-slate-900 text-white',
        name: 'Arjun Mehta',
        role: 'Operations Head · Global Services',
    },
];