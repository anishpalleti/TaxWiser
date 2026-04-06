import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, FileText, Smartphone, AlertCircle, ExternalLink } from 'lucide-react';

export default function FindHelp() {

  return (
    <div className="max-w-5xl mx-auto pb-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Find Free Tax Help</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The IRS Volunteer Income Tax Assistance (VITA) program offers free basic tax return preparation to qualified individuals.
        </p>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-surface/50 border border-surface rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary" />
            <h3 className="font-heading font-bold text-xl">What is VITA?</h3>
          </div>
          <p className="text-gray-300 mb-4">
            VITA is a grant program by the IRS that funds local community groups to provide completely free tax preparation services. The preparers are IRS-certified volunteers who are trained to get you every credit you deserve.
          </p>
          <div className="bg-primary/10 text-primary p-3 rounded-lg text-sm font-bold border border-primary/20">
            Usually available to those making $67,000 or less, persons with disabilities, or limited English speakers.
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-surface/50 border border-surface rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="font-heading font-bold text-xl">What to Bring</h3>
          </div>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex gap-2 items-start"><span className="text-primary font-bold">✓</span> Photo ID for you and your spouse</li>
            <li className="flex gap-2 items-start"><span className="text-primary font-bold">✓</span> Social Security cards or ITINs for EVERYONE on the return</li>
            <li className="flex gap-2 items-start"><span className="text-primary font-bold">✓</span> All W-2s, 1099s, and income forms</li>
            <li className="flex gap-2 items-start"><span className="text-primary font-bold">✓</span> A copy of last year's federal and state returns (if available)</li>
            <li className="flex gap-2 items-start"><span className="text-primary font-bold">✓</span> Checking/Savings account routing numbers for direct deposit</li>
          </ul>
        </motion.div>
      </div>

      {/* Locator Tool */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-heading mb-4">VITA & TCE Site Locator</h2>
        
        <div className="bg-gradient-to-br from-surface to-[#111] rounded-2xl p-8 md:p-12 border border-surface shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-white">Find a Location Near You</h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 relative z-10">
            For your security and privacy, the official IRS locator must be accessed directly on their secure government website. Click below to open the official locator tool.
          </p>
          
          <a 
            href="https://freetaxassistance.for.irs.gov/s/sitelocator"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-primary hover:bg-green-500 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(0,200,83,0.2)] hover:shadow-[0_0_30px_rgba(0,200,83,0.4)] transform hover:-translate-y-1 relative z-10 text-lg"
          >
            Open Official IRS Locator <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-4 text-blue-300 text-sm mt-4">
          <Smartphone className="w-6 h-6 shrink-0 mt-0.5" />
          <p>
            <strong>Mobile Users:</strong> You can also find help locations directly by calling <strong>800-906-9887</strong> if you are having trouble with the website.
          </p>
        </div>
      </div>

    </div>
  );
}
