import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, HelpCircle, ChevronRight, RefreshCcw } from 'lucide-react';

function FilingStatusCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const QUESTIONS = [
    {
      id: "citizen",
      text: "Are you a U.S. citizen or resident alien?",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    {
      id: "married",
      text: "Were you legally married as of December 31st?",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    {
      id: "live_together",
      text: "Did you and your spouse live together during the last 6 months of the year?",
      dependsOn: { married: true },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    {
      id: "dependents",
      text: "Do you have any dependent children or relatives living with you?",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    {
      id: "pay_half",
      text: "Did you pay MORE than half the cost of keeping up your home for the year?",
      dependsOn: { dependents: true },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    }
  ];

  const handleAnswer = (qid, val) => {
    const newAnswers = { ...answers, [qid]: val };
    setAnswers(newAnswers);

    // Calculate result immediately if we reached end or specific conditions
    if (qid === "citizen" && !val) {
      setResult({ status: "Nonresident Alien (Form 1040-NR)", reason: "Nonresidents have specialized filing statuses." });
      return;
    }

    if (qid === "pay_half" || (qid === "dependents" && !val && !newAnswers.married) || (qid === "live_together" && newAnswers.married)) {
      determineStatus(newAnswers);
    } else {
      let nextStep = step + 1;
      // Skip conditional questions if conditions not met
      while (QUESTIONS[nextStep]?.dependsOn) {
        let skip = false;
        for (const [key, reqVal] of Object.entries(QUESTIONS[nextStep].dependsOn)) {
          if (newAnswers[key] !== reqVal) skip = true;
        }
        if (skip) nextStep++;
        else break;
      }
      if (nextStep < QUESTIONS.length) {
        setStep(nextStep);
      } else {
        determineStatus(newAnswers);
      }
    }
  };

  const determineStatus = (ans) => {
    if (ans.married) {
      setResult({
        status: "Married Filing Jointly",
        reason: "Since you are married, filing jointly almost always provides the largest standard deduction and best tax benefits."
      });
    } else if (ans.dependents && ans.pay_half) {
      setResult({
        status: "Head of Household",
        reason: "Because you are unmarried, have dependents, and pay more than half the cost of a home, you qualify for Head of Household. This gives you a much bigger deduction than filing Single!"
      });
    } else {
      setResult({
        status: "Single",
        reason: "You are unmarried without dependents that you fully support."
      });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="bg-[#111] border border-surface rounded-2xl p-6 relative overflow-hidden">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-primary" /> Filing Status Finder
      </h2>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
          >
            <p className="font-bold text-lg mb-4">{QUESTIONS[step].text}</p>
            <div className="flex gap-3">
              {QUESTIONS[step].options.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => handleAnswer(QUESTIONS[step].id, opt.value)}
                  className="flex-1 bg-surface hover:bg-surface/80 border border-surface hover:border-primary/50 text-white font-bold py-3 px-4 rounded-xl transition-all"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-primary/10 border border-primary/20 rounded-xl p-6"
          >
            <p className="text-sm text-gray-300 mb-2 uppercase tracking-wide font-bold">Recommended Status</p>
            <h3 className="text-2xl font-bold font-heading text-primary mb-3">{result.status}</h3>
            <p className="text-gray-300 text-sm mb-6">{result.reason}</p>
            <button onClick={reset} className="flex items-center justify-center gap-2 mx-auto text-sm text-gray-400 hover:text-white transition-colors">
              <RefreshCcw className="w-4 h-4" /> Start Over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EITCCalculator() {
  const [status, setStatus] = useState("Single");
  const [children, setChildren] = useState(0);
  const [income, setIncome] = useState("");
  const [estimate, setEstimate] = useState(null);

  // Simplified mock tables based on 2024 limits
  const calculateEITC = (e) => {
    e.preventDefault();
    const inc = parseFloat(income.replace(/,/g, ''));
    if (isNaN(inc)) return;

    // Roughly mocked maximums and phase-outs for educational purposes
    let maxCredit = 0;
    let limitString = "";

    if (children === 0) { maxCredit = 632; limitString = status === "Married" ? "$25,511" : "$18,591"; }
    else if (children === 1) { maxCredit = 4216; limitString = status === "Married" ? "$56,004" : "$49,084"; }
    else if (children === 2) { maxCredit = 6960; limitString = status === "Married" ? "$62,688" : "$55,768"; }
    else { maxCredit = 7830; limitString = status === "Married" ? "$66,819" : "$59,899"; }

    const limitVal = parseInt(limitString.replace(/\$|,/g, ''));
    
    if (inc > limitVal) {
      setEstimate({ value: "$0", note: `Your income exceeds the ${limitString} limit for your family size.` });
    } else if (inc > limitVal * 0.4) {
      // Phase out simulation
      const ratio = 1 - ((inc - (limitVal * 0.4)) / (limitVal * 0.6));
      setEstimate({ value: `~$${Math.round(maxCredit * ratio)}`, note: "This is a rough estimate of your phase-out credit." });
    } else {
      setEstimate({ value: `Up to $${maxCredit.toLocaleString()}`, note: "You may qualify for the MAXIMUM credit amount!" });
    }
  };

  return (
    <div className="bg-[#111] border border-surface rounded-2xl p-6 relative overflow-hidden">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" /> EITC Estimator
      </h2>
      
      {!estimate ? (
        <form onSubmit={calculateEITC} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-1">Filing Status</label>
            <select 
              className="w-full bg-surface border border-surface p-3 rounded-xl focus:ring-2 focus:ring-primary/50 text-white outline-none"
              value={status} onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Single">Single / Head of Household</option>
              <option value="Married">Married Filing Jointly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-1">Qualifying Children</label>
            <div className="flex bg-surface rounded-xl overflow-hidden border border-surface">
              {[0,1,2,3].map(num => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setChildren(num)}
                  className={`flex-1 p-3 font-bold transition-colors ${children === num ? 'bg-primary text-black' : 'text-white hover:bg-surface/80'}`}
                >
                  {num}{num === 3 ? '+' : ''}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-1">Estimated Earned Income ($)</label>
            <input 
              type="number" 
              required
              className="w-full bg-surface border border-surface p-3 rounded-xl focus:ring-2 focus:ring-primary/50 text-white outline-none"
              placeholder="e.g. 25000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-green-500 text-black font-bold py-3 mt-4 rounded-xl transition-all shadow-[0_0_15px_rgba(0,200,83,0.3)] hover:shadow-[0_0_25px_rgba(0,200,83,0.5)] flex justify-center items-center gap-2">
            Calculate Estimate <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
           className="text-center"
        >
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-4">
            <p className="text-sm text-gray-300 mb-2 font-bold">Estimated EITC Amount</p>
            <h3 className="text-4xl font-bold font-heading text-primary mb-2">{estimate.value}</h3>
            <p className="text-green-400 text-sm">{estimate.note}</p>
          </div>

          <p className="text-xs text-gray-500 mb-6 italic">
            Disclaimer: This is purely an educational estimate based on rough 2024 tables. Your actual credit depends on investment income limitations and exact tax calculations. Do not rely on this for financial planning.
          </p>

          <button onClick={() => setEstimate(null)} className="flex items-center justify-center gap-2 mx-auto text-sm text-gray-400 hover:text-white transition-colors">
            <RefreshCcw className="w-4 h-4" /> Recalculate
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function Calculators() {
  return (
    <div className="max-w-4xl mx-auto pb-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Tax Calculators</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Use our interactive tools to estimate your tax situation before you file.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <FilingStatusCalculator />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <EITCCalculator />
        </motion.div>
      </div>
    </div>
  );
}
