import React from 'react';
import { motion } from 'framer-motion';
import { Library, ExternalLink, ShieldAlert, CheckCircle2, DollarSign } from 'lucide-react';

const RESOURCES = [
  {
    title: "VITA (Volunteer Income Tax Assistance)",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    description: "Free, in-person, IRS-certified tax preparation for low-to-moderate income individuals, individuals with disabilities, and limited English-speaking taxpayers.",
    details: [
      "Generally for people making under $67,000.",
      "What to bring: Photo ID, Social Security cards for you/dependents, W-2s/1099s, last year's return, bank routing information for direct deposit."
    ],
    link: "/help",
    linkText: "Find a VITA site near you using our locator"
  },
  {
    title: "EITC (Earned Income Tax Credit)",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    description: "A benefit for working people with low to moderate income. It reduces the amount of tax you owe and may give you a massive refund.",
    details: [
      "Refundable credit — you can get money back even if you owe zero taxes.",
      "Income limits apply and vary depending on if you are single/married and how many children you have.",
      "Use our calculator to see if you qualify!"
    ],
    link: "/calculators",
    linkText: "Estimate your EITC"
  },
  {
    title: "Child Tax Credit",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    description: "A credit worth up to $2,000 per qualifying child under 17 years old.",
    details: [
      "Must have a Social Security number for the child.",
      "The 'Additional Child Tax Credit' is the refundable portion of this credit, up to $1,600."
    ],
  },
  {
    title: "IRS Free File Alliance",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    description: "The IRS partnered with major tax software companies (like TaxAct, FreeTaxUSA) to let you file online completely free.",
    details: [
      "Must make under the $79,000 Adjusted Gross Income limit.",
      "Includes step-by-step guidance just like paid software."
    ],
    link: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
    linkText: "Visit IRS Free File (External)",
    external: true
  },
  {
    title: "SNAP & SSI Benefits",
    icon: <Library className="w-6 h-6 text-blue-400" />,
    description: "How receiving public assistance affects your tax return.",
    details: [
      "SNAP (Food Stamps), TANF, WIC, and SSI (Supplemental Security Income) are NOT considered taxable income.",
      "You do not need to report them on your tax return.",
      "Social Security benefits can be taxable, but no more than 85% of the benefits are taxable. Taxability depends on the amount of other income sources and filing status.",
      "Tax refunds (including the EITC) do NOT count as income for SNAP eligibility, meaning getting a big refund will not lower your food stamps."
    ]
  },
  {
    title: "What is available at IRS.gov for FREE?",
    icon: <Library className="w-6 h-6 text-indigo-400" />,
    description: "The IRS website provides many free, official tools and services directly to taxpayers.",
    details: [
      "Transcripts of previous tax returns and income (if you lost your documents).",
      "Payment plans if you owe taxes and need more time.",
      "Where's My Refund tool to track your money.",
      "Free tax software (IRS Free File).",
      "Identity Protection PIN if you've had identity theft.",
      "All official tax forms and instructions."
    ],
    link: "https://www.irs.gov",
    linkText: "Visit IRS.gov (External)",
    external: true
  },
  {
    title: "Lost your Social Security Card?",
    icon: <ShieldAlert className="w-6 h-6 text-yellow-400" />,
    description: "You need Social Security numbers for yourself and your dependents to file taxes.",
    details: [
      "If you lost your card, you must contact the Social Security Administration (SSA).",
      "You can request a replacement card online or at a local office."
    ],
    link: "https://www.ssa.gov",
    linkText: "Visit Social Security Administration (External)",
    external: true
  }
];

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto pb-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Library className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Low to Moderate Income Resources</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore grants, credits, and free services designed specifically to help you keep more of your hard-earned money.
        </p>
      </div>

      {/* Red Flags Warning Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-7 h-7 text-red-500" />
          <h2 className="text-xl font-bold font-heading text-red-500">Red Flags: Avoid Predatory Preparers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
            <h4 className="font-bold text-red-400 mb-2">"Ghost Preparers"</h4>
            <p className="text-sm text-gray-300">They refuse to sign the return and instead print it out and tell you to sign it yourself. This is illegal.</p>
          </div>
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
            <h4 className="font-bold text-red-400 mb-2">Refund Anticipation Loans</h4>
            <p className="text-sm text-gray-300">They offer you an "instant refund" in cash today. This is actually a loan with insanely high fees and interest rates.</p>
          </div>
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
            <h4 className="font-bold text-red-400 mb-2">Percentage Fees</h4>
            <p className="text-sm text-gray-300">They charge a percentage of your refund instead of a flat fee, which incentivizes them to lie on your forms.</p>
          </div>
        </div>
      </motion.div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((res, index) => (
          <motion.div 
            key={res.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#111] border border-surface rounded-2xl p-6 flex flex-col h-full hover:border-primary/30 transition-all hover:bg-surface/30 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-surface p-2 rounded-xl group-hover:scale-110 transition-transform">
                {res.icon}
              </div>
              <h3 className="font-heading font-bold text-lg">{res.title}</h3>
            </div>
            
            <p className="text-gray-300 mb-4 flex-grow">
              {res.description}
            </p>
            
            <ul className="space-y-2 mb-6 text-sm text-gray-400 list-disc pl-5">
              {res.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>

            {res.link && (
              <div className="mt-auto border-t border-surface pt-4">
                {res.external ? (
                  <a 
                    href={res.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-primary text-sm font-bold hover:underline"
                  >
                    {res.linkText} <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <a href={res.link} className="flex items-center gap-2 text-primary text-sm font-bold hover:underline">
                    {res.linkText}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}

        {/* Extra Local Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-primary/10 transition-colors"
        >
          <h3 className="font-heading font-bold text-lg mb-2">United Way (211)</h3>
          <p className="text-gray-300 mb-4 text-sm max-w-xs">
            Dial 2-1-1 on your phone anytime to connect with United Way. They can direct you to local tax assistance, food banks, and housing support.
          </p>
        </motion.div>
      </div>

    </div>
  );
}
