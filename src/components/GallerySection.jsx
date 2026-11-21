import { useState } from 'react';
import { motion } from 'framer-motion';

const GALLERY_ITEMS = [
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

const CATEGORIES = [
    { key: 'All', label: 'All Photos' },
    { key: 'Advisory', label: 'Advisory' },
    { key: 'Interviews', label: 'Interviews' },
    { key: 'Workplace', label: 'Workplace' },
];

export default function GallerySection({ onSelectPhoto }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const visibleItems =
        selectedCategory === 'All'
            ? GALLERY_ITEMS
            : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

    return (
        <section id="gallery" className="py-16 sm:py-20 bg-white border-y border-slate-200/80 overflow-x-clip">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
                >
                    <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
                            Inside TalentBridge
                        </span>
                        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 mt-2">
                            Corporate Hiring, Advisory &amp; Team Culture
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((btn) => (
                            <button
                                key={btn.key}
                                type="button"
                                onClick={() => setSelectedCategory(btn.key)}
                                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${selectedCategory === btn.key
                                        ? 'bg-blue-700 text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-700 hover:bg-blue-50'
                                    }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {visibleItems.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.96, y: 18 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, amount: 'some' }}
                            transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            onClick={() => onSelectPhoto && onSelectPhoto({ src: item.full, caption: item.title })}
                            className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 aspect-[4/3]"
                        >
                            <img
                                src={item.thumb}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4 sm:p-5">
                                <div>
                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${item.badgeClass}`}>
                                        {item.category}
                                    </span>
                                    <h3 className="text-white font-display font-bold text-sm sm:text-base">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}