import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Calendar, 
  ArrowRight, 
  Info, 
  CheckSquare, 
  Library, 
  Calculator, 
  MapPin, 
  MessageSquare 
} from 'lucide-react';

const QUICK_LINKS = [
  { title: 'Tax Basics', desc: 'Understand the essentials of filing.', path: '/basics', icon: Info },
  { title: 'Checklist', desc: 'Your month-by-month tax prep guide.', path: '/checklist', icon: CheckSquare },
  { title: 'Resources', desc: 'Free filing and VITA information.', path: '/resources', icon: Library },
  { title: 'Calculators', desc: 'Estimate EITC and find your status.', path: '/calculators', icon: Calculator },
  { title: 'Find Help', desc: 'Locate a free tax prep site near you.', path: '/help', icon: MapPin },
  { title: 'AI Assistant', desc: 'Ask our friendly chatbot anything.', path: '/ai-assistant', icon: MessageSquare },
];

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-10 pb-8">
      {/* Hero Section */}
      <section className="text-center md:text-left pt-6 pb-2">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20">
            Free tax help is available!
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4 leading-tight">
            Understanding Taxes <br className="hidden md:block" />
            <span className="text-primary tracking-tight">Shouldn't Be Hard.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            TaxWiser is your comprehensive guide to understanding your taxes, maximizing your refund, and finding free, certified help near you.
          </p>
        </motion.div>
      </section>

      {/* Warning Banner */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.2 }}
        className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-red-500/5 rotate-180 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <div className="bg-red-500/20 p-3 rounded-xl shrink-0">
          <ShieldAlert className="w-6 h-6 text-red-500" />
        </div>
        <div className="relative z-10">
          <h3 className="text-red-400 font-bold mb-1">Watch out for predatory tax preparers!</h3>
          <p className="text-sm text-gray-300">
            Never pay for tax preparation if you make under $67,000. Beware of companies offering "rapid refunds" or taking a percentage of your return. <Link to="/resources" className="underline text-red-300 hover:text-red-400 relative z-20">Learn about free options.</Link>
          </p>
        </div>
      </motion.div>

      {/* Main Grid Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Access Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold font-heading">Where to start?</h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <motion.div 
                    variants={item}
                    className="bg-surface border border-surface rounded-2xl p-5 h-full hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,200,83,0.1)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <Icon className="w-5 h-5 text-primary group-hover:text-black transition-colors" />
                      </div>
                      <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{link.title}</h3>
                      <p className="text-sm text-gray-400">{link.desc}</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:-rotate-45 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Highlight Card: Dates */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-heading">Key Dates</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-surface to-[#111] border border-surface rounded-2xl p-6 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-lg">2024 Tax Season</h3>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-0 before:w-0.5 before:bg-surface">
                <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20"></div>
                <p className="text-sm text-primary font-bold">Jan 29, 2024</p>
                <p className="font-bold">IRS Begins Accepting Returns</p>
                <p className="text-xs text-gray-400 mt-1">E-file opens for the season.</p>
              </div>
              
              <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-0 before:w-0.5 before:bg-surface">
                <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-500"></div>
                <p className="text-sm text-gray-400 font-bold">Jan 31, 2024</p>
                <p className="font-bold">Forms Mailed</p>
                <p className="text-xs text-gray-400 mt-1">Deadline for employers to send W-2s and 1099s.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-red-500/20 z-10"></div>
                <p className="text-sm text-red-500 font-bold">April 15, 2024</p>
                <p className="font-bold">Tax Day!</p>
                <p className="text-xs text-gray-400 mt-1">Deadline to file your return or request an extension.</p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-surface text-center">
              <Link to="/checklist" className="text-primary text-sm hover:underline font-bold">
                View full year checklist →
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
