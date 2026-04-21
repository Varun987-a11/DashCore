/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Files, 
  FileText, 
  ExternalLink, 
  ChevronRight, 
  ArrowLeft,
  Wind,
  Sun,
  Mail,
  Gamepad2,
  MessageCircle,
  FileDown,
  CreditCard,
  UserCircle,
  Briefcase
} from 'lucide-react';

// --- Components ---

const PageTransition = ({ children, isAppHeader = false }: { children: React.ReactNode, isAppHeader?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className={`min-h-screen ${isAppHeader ? '' : 'pt-0'} pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full`}
  >
    {children}
  </motion.div>
);

const Card = ({ 
  title, 
  description, 
  icon: Icon, 
  to, 
  href, 
  color = "blue",
  comingSoon = false,
  variant = "category"
}: { 
  title: string; 
  description?: string; 
  icon: any; 
  to?: string; 
  href?: string; 
  color?: string;
  comingSoon?: boolean;
  variant?: "category" | "item"
}) => {
  if (variant === "item") {
    const content = (
      <div className={`sub-card group ${comingSoon ? 'opacity-60 grayscale' : ''}`}>
        <div className={`icon-box text-${color}-500 group-hover:bg-white`}>
          <Icon size={16} />
        </div>
        <span className="flex-grow">{title}</span>
        {!comingSoon && <ChevronRight size={14} className="text-[#64748B] transition-transform group-hover:translate-x-1" />}
      </div>
    );

    if (comingSoon) return <div>{content}</div>;
    if (to) return <Link to={to}>{content}</Link>;
    if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
    return content;
  }

  // --- Category Variant (Dashboard) ---
  const content = (
    <div className={`card p-5 flex flex-col h-full relative overflow-hidden group ${comingSoon ? 'opacity-60 grayscale' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-${color}-50 border border-${color}-100 flex items-center justify-center text-${color}-600`}>
          <Icon size={20} />
        </div>
        {!comingSoon && <span className="tag">{color}</span>}
      </div>
      
      <h3 className="text-sm font-bold text-[#1E293B] mb-1">{title}</h3>
      {description && <p className="text-[#64748B] text-[11px] font-medium leading-relaxed mb-4 flex-grow">{description}</p>}
      
      {comingSoon ? (
        <span className="text-[10px] uppercase font-bold text-slate-400">Locked</span>
      ) : (
        <div className="flex items-center text-[10px] font-bold text-[#64748B] group-hover:text-[#3B82F6] transition-colors uppercase tracking-wider">
          {href ? 'Open link' : 'Explore hub'} <ChevronRight size={10} className="ml-1" />
        </div>
      )}
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
};

const Header = ({ title, showBack = false, subtitle = "Good Morning" }: { title: string, showBack?: boolean, subtitle?: string }) => (
  <header className="flex items-center justify-between px-8 py-10 bg-white border-b border-[#E2E8F0] mb-8">
    <div className="flex flex-col">
      {showBack ? (
        <Link to="/dashboard" className="flex items-center text-xs font-bold text-[#64748B] hover:text-[#3B82F6] mb-2 uppercase tracking-widest">
          <ArrowLeft size={14} className="mr-2" /> Back home
        </Link>
      ) : (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6] mb-1">{subtitle}</span>
      )}
      <h1 className="text-3xl font-extrabold tracking-tight text-[#1E293B]">{title}</h1>
    </div>
    <div className="flex gap-4 items-center">
      {showBack ? (
        <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#1E293B] font-bold shadow-sm">
          <IconBoxIcon icon={UserCircle} color="slate" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold">V</div>
      )}
    </div>
  </header>
);

const IconBoxIcon = ({ icon: Icon, color }: { icon: any, color: string }) => (
  <div className={`text-${color}-500`}><Icon size={18} /></div>
);

// --- Pages ---

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <div className="inline-block p-2 px-4 rounded-full bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">
          Personal Workspace
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter text-slate-900 mb-8">
          Welcome, <span className="text-blue-600">Varun</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto mb-12 font-medium">
          Your central hub for tools, documents, and daily workflows.
        </p>
        
        <button 
          onClick={() => navigate('/dashboard')}
          className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-slate-900 font-display text-lg rounded-2xl hover:bg-slate-800 focus:outline-none"
        >
          Open Hub
          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <footer className="absolute bottom-10 text-slate-400 text-sm font-medium tracking-wide font-display">
        VERSION 1.0 • CRAFTED WITH CARE
      </footer>
    </div>
  );
};

const DashboardPage = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Header title="Welcome, Varun" subtitle="System Overview" />
    <PageTransition isAppHeader>
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="font-bold text-[#1E293B]">Categories</h2>
        <span className="tag">4 Hubs</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="🌦 Weather" 
          description="Region-specific forecasts and real-time wind/rain maps."
          icon={Cloud} 
          to="/weather"
          color="sky"
        />
        <Card 
          title="📁 Files" 
          description="Centralized cloud storage for your digital assets."
          icon={Files} 
          to="/files"
          color="emerald"
        />
        <Card 
          title="📄 Documents" 
          description="Quick access to verify your ID cards and academic records."
          icon={FileText} 
          to="/documents"
          color="violet"
        />
        <Card 
          title="⚡ Quick Links" 
          description="One-tap access to your most used AI tools and mail."
          icon={ExternalLink} 
          to="/links"
          color="amber"
        />
      </div>
    </PageTransition>
    <footer className="fixed bottom-0 left-0 right-0 px-8 py-4 bg-white border-t border-[#E2E8F0] flex justify-between items-center text-[10px] font-bold text-[#64748B] uppercase tracking-widest z-50">
      <p>© 2024 VARUN'S PERSONAL HUB • PRODUCTION READY</p>
      <div className="flex gap-6"> 
        <span>Last Synced: Just Now</span> 
        <span>v1.0.4</span>
      </div>
    </footer>
  </div>
);

const WeatherPage = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Header title="Weather" showBack />
    <PageTransition isAppHeader>
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="font-bold text-[#1E293B]">External Data</h2>
        <span className="tag">Region: Kodikal</span>
      </div>
      <div className="card p-4 flex flex-col gap-3 max-w-2xl">
        <Card 
          title="Windy.com" 
          icon={Wind} 
          href="https://www.windy.com"
          color="blue"
          variant="item"
        />
        <Card 
          title="Google Weather" 
          icon={Sun} 
          href="https://www.google.com/search?q=weather"
          color="orange"
          variant="item"
        />
        <Card 
          title="MSN Forecast" 
          icon={Cloud} 
          href="https://www.msn.com/en-in/weather/forecast/in-Kodikal%2C-Mangaluru,Karnataka"
          color="sky"
          variant="item"
        />
      </div>
    </PageTransition>
  </div>
);

const FilesPage = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Header title="Files" showBack />
    <PageTransition isAppHeader>
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="font-bold text-[#1E293B]">Storage</h2>
        <span className="tag">Cloud Vault</span>
      </div>
      <div className="card p-12 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
          <Files className="w-8 h-8 text-slate-300" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-400 mb-1">Coming Soon</p>
          <p className="text-[11px] text-slate-400 px-4 max-w-xs font-medium">Add your important files to this central hub later. Secure cloud storage is being provisioned.</p>
        </div>
      </div>
    </PageTransition>
  </div>
);

const DocumentsPage = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Header title="My Documents" showBack />
    <PageTransition isAppHeader>
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="font-bold text-[#1E293B]">Verified Records</h2>
        <span className="tag">6 Files</span>
      </div>
      <div className="card p-4 flex flex-col gap-2 max-w-2xl">
        <Card title="Aadhaar" icon={UserCircle} color="indigo" comingSoon variant="item" />
        <Card title="Driving License" icon={CreditCard} color="blue" comingSoon variant="item" />
        <Card title="PAN Card" icon={CreditCard} color="emerald" comingSoon variant="item" />
        <Card title="10th Mark Card" icon={FileDown} color="amber" comingSoon variant="item" />
        <Card title="12th Mark Card" icon={FileDown} color="orange" comingSoon variant="item" />
        <Card title="Resume" icon={FileText} color="rose" comingSoon variant="item" />
      </div>
    </PageTransition>
  </div>
);

const LinksPage = () => (
  <div className="min-h-screen bg-[#F8FAFC]">
    <Header title="Quick Links" showBack />
    <PageTransition isAppHeader>
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="font-bold text-[#1E293B]">External Resources</h2>
        <span className="tag">AI & Productivity</span>
      </div>
      <div className="card p-4 flex flex-col gap-3 max-w-2xl">
        <Card 
          title="ChatGPT" 
          icon={MessageCircle} 
          href="https://chat.openai.com"
          color="teal"
          variant="item"
        />
        <Card 
          title="Google Gemini" 
          icon={Sun} 
          href="https://gemini.google.com"
          color="blue"
          variant="item"
        />
        <Card 
          title="Grok AI" 
          icon={ExternalLink} 
          comingSoon
          color="slate"
          variant="item"
        />
        <Card 
          title="Gmail Inbox" 
          icon={Mail} 
          href="https://mail.google.com"
          color="rose"
          variant="item"
        />
      </div>
    </PageTransition>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
