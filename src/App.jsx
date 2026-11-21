import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ServicesPage from './components/pages/Services';
import Jobs from './components/pages/Jobs';
import Candidates from './components/pages/Candidates';
import Employers from './components/pages/Employers';
import Contact from './components/pages/Contact';

function ApplicationModal({ activeModal, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleOrCompany, setRoleOrCompany] = useState('');

  if (!activeModal) return null;

  const isCandidate = activeModal === 'candidateModal';

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setRoleOrCompany('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="global-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-xs flex items-center justify-center p-4"
      >
        <motion.div
          key="global-modal-box"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl relative"
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            ✕
          </button>

          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center font-bold text-base">
                ✓
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                {isCandidate ? 'Application Submitted!' : 'Hiring Request Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Thank you, {name}. Our team will connect with you shortly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-lg bg-[#092452] text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#3266bb]">
                  {isCandidate ? 'Candidate Quick Apply' : 'Employer Hiring Desk'}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-1">
                  {isCandidate ? 'Submit Your Profile' : 'Request Top 5% Talent'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isCandidate
                    ? 'Share your details and our recruiters will match you with verified openings.'
                    : 'Tell us your hiring requirement and get shortlists within 48–72 hours.'}
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200 focus:border-[#3266bb] px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200 focus:border-[#3266bb] px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none"
                />

                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number *"
                  className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200 focus:border-[#3266bb] px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none"
                />

                <input
                  type="text"
                  required
                  value={roleOrCompany}
                  onChange={(e) => setRoleOrCompany(e.target.value)}
                  placeholder={isCandidate ? 'Desired Job Role *' : 'Company Name & Role to Hire *'}
                  className="w-full rounded-xl bg-[#F4F6F9] focus:bg-white border border-slate-200 focus:border-[#3266bb] px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none"
                />

                {isCandidate && (
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#E6ECF5] file:text-[#092452] hover:file:bg-blue-100 cursor-pointer"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-[#092452] hover:bg-[#0D3270] text-white text-xs sm:text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                {isCandidate ? 'Submit Resume & Apply →' : 'Submit Hiring Request →'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-clip">
          <Navbar onOpenModal={handleOpenModal} />

          <main className="pb-10 sm:pb-12 lg:pb-16">
            <Routes>
              <Route path="/" element={<Home onOpenModal={handleOpenModal} />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/jobs" element={<Jobs onOpenModal={handleOpenModal} />} />
              <Route path="/candidates" element={<Candidates onOpenModal={handleOpenModal} />} />
              <Route path="/employers" element={<Employers onOpenModal={handleOpenModal} />} />
              <Route path="/contact" element={<Contact onOpenModal={handleOpenModal} />} />
            </Routes>
          </main>

          <Footer />

          <ApplicationModal
            activeModal={activeModal}
            onClose={() => setActiveModal(null)}
          />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}