import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';

const TAX_TOPICS = [
  {
    id: 1,
    question: "What is a tax return and why do you file?",
    answer: "A tax return is a form you file with the IRS that reports your income, expenses, and other tax information. Filing determines whether you owe the government money or if you overpaid and are owed a refund. It's the law to file if you meet certain income thresholds."
  },
  {
    id: 2,
    question: "The difference between a W-2 and a 1099",
    answer: "A W-2 is given to EMPLOYEES. Your employer takes taxes out of your paycheck automatically. A 1099 is given to INDEPENDENT CONTRACTORS (like gig workers or freelancers). No taxes are withheld from a 1099, so you must save money to pay those taxes yourself."
  },
  {
    id: 3,
    question: "What is taxable income?",
    answer: "Taxable income is the amount of your income that is subject to taxes. It's your gross income minus any deductions or exemptions you are allowed to take. Examples of gross income include wages, salaries, tips, bonuses, and side-hustle money."
  },
  {
    id: 4,
    question: "Standard deduction vs. itemized deductions",
    answer: "The Standard Deduction is a flat dollar amount that reduces the income you're taxed on. Itemized Deductions let you list out specific expenses (like high medical bills or large charitable gifts) to reduce your tax burden. Most people take the Standard Deduction because it's easier and often larger. Generally, the benefit of itemizing your deductions is when you have more allowable deductions than the total of the standard deduction. For 2025, the standard deduction is $15,000 for single filers and $30,000 for married couples filing jointly."
  },
  {
    id: 5,
    question: "Tax credits vs. tax deductions",
    answer: "A tax DEDUCTION lowers your taxable income (e.g., deducting $1,000 means you are taxed on $9,000 instead of $10,000). A tax CREDIT lowers your final tax bill dollar-for-dollar (e.g., a $1,000 credit reduces your $1,500 tax bill to $500). Credits are much more valuable! Examples of credits are the Earned Income Credit, the Child Tax Credit and the American Opportunity Tax Credit (for education)."
  },
  {
    id: 6,
    question: "What is the Earned Income Tax Credit (EITC)?",
    answer: "The EITC is a massive tax break for low-to-moderate-income workers. Depending on your income and number of children, it can give you thousands of dollars back as a refund, even if you owe no taxes. You MUST file a return to claim it."
  },
  {
    id: 7,
    question: "What is the Child Tax Credit?",
    answer: "The Child Tax Credit gives parents a tax break for each qualifying child under age 17. Similar to the EITC, parts of this credit are 'refundable', meaning you can get money back even if your tax bill drops to zero."
  },
  {
    id: 8,
    question: "What is a refund vs. owing taxes?",
    answer: "A REFUND means you paid too much to the government during the year (usually taken out of your paychecks) or you qualify for refundable credits (like the EITC or Child Tax Credit), and they are giving the extra back. OWING means you didn't pay enough during the year, and you need to pay them the rest. There are multiple payment choices besides writing a check; you can visit IRS.gov/payments to explore your options."
  },
  {
    id: 9,
    question: "Filing statuses explained",
    answer: "Your filing status determines your tax bracket and standard deduction. 'Single' is for unmarried people. 'Married Filing Jointly' is for couples who combine their return (usually best). 'Head of Household' is for unmarried individuals who pay more than half the cost of keeping up a home for a qualifying person (like a child)."
  },
  {
    id: 10,
    question: "What are tax brackets and how do they work?",
    answer: "The US uses a 'progressive' tax system. You don't pay a single flat rate on all your money. Instead, different chunks of your income are taxed at different rates. If you move into a higher tax bracket, only the money ABOVE that threshold is taxed at the higher rate."
  },
  {
    id: 11,
    question: "What is withholding (W-4)?",
    answer: "When you start a new job, you fill out a W-4. This tells your employer how much money to hold back ('withhold') from your paycheck for taxes. If they withhold too much, you get a refund. If they withhold too little, you'll owe money at tax time."
  },
  {
    id: 12,
    question: "What happens if you don't file?",
    answer: "If you owe money and don't file, the IRS will charge you heavy 'Failure to File' and 'Failure to Pay' penalties, plus interest. If the IRS owes YOU a refund and you don't file, you simply lose that money after 3 years. You won't be penalized if you are owed a refund."
  },
  {
    id: 13,
    question: "Common tax forms explained",
    answer: "1040: The main form you fill out to file your taxes. W-2: What your employer gives you showing your wages. 1099-NEC: What you get if you're an independent contractor. Schedule C: The form you attach to the 1040 if you run a small business or have a side hustle."
  },
  {
    id: 14,
    question: "What is self-employment tax?",
    answer: "When you work for someone else, they pay half of your Social Security and Medicare taxes. When you are self-employed (Gig work, Uber, freelancing), you have to pay BOTH halves yourself. This is called the self-employment tax, and it's roughly 15.3% of your profit."
  },
  {
    id: 15,
    question: "Tax preparer vs. a CPA",
    answer: "A 'tax preparer' is anyone who does taxes for others. Often this is for a fee, though volunteers (like those at VITA) are also tax preparers who are trained and IRS-certified to help you for free. A CPA (Certified Public Accountant) or EA (Enrolled Agent) are licensed professionals who have passed strict exams and can legally represent you in front of the IRS if you are audited."
  }
];

function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="border border-surface rounded-2xl overflow-hidden mb-3 bg-[#111]">
      <button
        className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-surface/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-bold pr-4">{item.question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 pt-1 text-gray-300 border-t border-surface/50 mt-1">
              <p className="leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Basics() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Tax Basics Glossary</h1>
        <p className="text-gray-400 text-lg">
          Taxes have their own language. Let's break down the most important terms you need to know.
        </p>
      </div>

      <div className="space-y-1">
        {TAX_TOPICS.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AccordionItem 
              item={topic} 
              isOpen={openId === topic.id}
              onClick={() => handleToggle(topic.id)}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="bg-surface/30 border border-surface rounded-2xl p-6 text-center mt-8">
        <h3 className="font-bold text-lg mb-2">Still confused?</h3>
        <p className="text-gray-400 mb-4 cursor-pointer hover:text-white">
          Head over to the AI Assistant and ask it to explain any of these topics in simpler terms!
        </p>
      </div>
    </div>
  );
}
