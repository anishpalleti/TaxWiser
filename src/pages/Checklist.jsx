import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckSquare } from 'lucide-react';

const MONTHS = [
  {
    month: "January",
    items: [
      { id: "jan-1", text: "Start new record books for the current year if you are self-employed." },
      { id: "jan-2", text: "Start new files to collect receipts for charitable contributions, college fees, child care, etc." },
      { id: "jan-3", text: "Start a new file to collect all tax documents arriving via mail or electronically for the previous year." }
    ]
  },
  {
    month: "February",
    items: [
      { id: "feb-1", text: "Verify all income documents have been received." },
      { id: "feb-2", text: "Check your EITC (Earned Income Tax Credit) eligibility." },
      { id: "feb-3", text: "Schedule an appointment with a free VITA site if eligible." }
    ]
  },
  {
    month: "March",
    items: [
      { id: "mar-1", text: "Begin organizing receipts if you are self-employed or gig worker." },
      { id: "mar-2", text: "Locate Social Security cards for you and all dependents." }
    ]
  },
  {
    month: "April",
    items: [
      { id: "apr-1", text: "File your taxes by the April 15th deadline." },
      { id: "apr-2", text: "OR file a free extension if you need more time." },
      { id: "apr-3", text: "Pay any owed taxes to avoid late penalties." }
    ]
  },
  {
    month: "May - August",
    items: [
      { id: "mid-1", text: "Perform a mid-year withholding check on your paycheck." },
      { id: "mid-2", text: "Update your W-4 with your employer if you had a major life event." },
      { id: "mid-3", text: "Track any new side-hustle or gig income." }
    ]
  },
  {
    month: "September",
    items: [
      { id: "sep-1", text: "Review Estimated Tax payments if you are fully self-employed." }
    ]
  },
  {
    month: "October",
    items: [
      { id: "oct-1", text: "File your return by October 15 if you requested an extension." },
      { id: "oct-2", text: "Begin year-end tax planning." }
    ]
  },
  {
    month: "November - December",
    items: [
      { id: "nov-1", text: "Make any final charitable donations for deductions." },
      { id: "nov-2", text: "Spend any remaining FSA (Flexible Spending Account) funds." },
      { id: "nov-3", text: "Do a final review of your year's total income." }
    ]
  }
];

export default function Checklist() {
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('taxwise_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('taxwise_checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const calculateProgress = () => {
    const total = MONTHS.reduce((acc, month) => acc + month.items.length, 0);
    const checked = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checked / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-4xl mx-auto pb-8 space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <CheckSquare className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Year-Round Checklist</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Tax preparation isn't just for April! Use this interactive checklist to stay organized all year. Your progress is saved automatically.
        </p>
      </div>

      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-surface rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Your Progress</span>
            <h2 className="text-2xl font-bold">{progress}% Completed</h2>
          </div>
          {progress === 100 && (
            <span className="text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">All Caught Up! 🎉</span>
          )}
        </div>
        <div className="h-4 bg-[#0a0a0a] rounded-full overflow-hidden border border-[#2a2a2a]">
          <motion.div 
            className="h-full bg-primary relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-white/20 w-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Monthly Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {MONTHS.map((monthBlock, idx) => (
          <motion.div 
            key={monthBlock.month}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#111] border border-surface rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
          >
            <div className="bg-surface/50 border-b border-surface px-5 py-3">
              <h3 className="font-heading font-bold text-lg text-white">{monthBlock.month}</h3>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {monthBlock.items.map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="flex items-start gap-4 text-left group focus:outline-none"
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isChecked 
                        ? 'bg-primary border-primary shadow-[0_0_10px_rgba(0,200,83,0.4)]' 
                        : 'bg-[#2a2a2a] border-gray-600 group-hover:border-primary/50'
                    }`}>
                      <Check className={`w-4 h-4 text-black transition-transform duration-300 ${isChecked ? 'scale-100' : 'scale-0'}`} strokeWidth={3} />
                    </div>
                    <span className={`text-sm transition-colors duration-300 ${isChecked ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={() => {
            if(window.confirm('Are you sure you want to clear all your progress?')) {
              setCheckedItems({});
            }
          }}
          className="text-gray-500 text-sm hover:text-red-400 transition-colors underline"
        >
          Reset Checklist
        </button>
      </div>

    </div>
  );
}
