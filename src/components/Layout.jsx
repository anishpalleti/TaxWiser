import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  Info, 
  CheckSquare, 
  Library, 
  Calculator, 
  MapPin, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/basics', label: 'Tax Basics', icon: Info },
  { path: '/checklist', label: 'Checklist', icon: CheckSquare },
  { path: '/resources', label: 'Resources', icon: Library },
  { path: '/calculators', label: 'Calculators', icon: Calculator },
  { path: '/help', label: 'Find Help', icon: MapPin },
  { path: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-surface bg-[#0f0f0f] z-20">
        <div className="p-6 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">TaxWiser</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,200,83,0.1)]' 
                      : 'text-gray-400 hover:text-white hover:bg-surface'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-surface text-xs text-gray-500 text-center">
          For educational purposes only
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative pb-20 md:pb-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>

          {/* Global Footer */}
          <footer className="mt-16 pt-8 pb-12 md:pb-8 border-t border-surface text-center">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto px-4">
              TaxWiser is for educational purposes only. Always consult a qualified tax professional for your specific situation.
            </p>
          </footer>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-surface z-50 px-2 pt-2 pb-2 pb-safe">
        <ul className="flex justify-between items-center overflow-x-auto gap-4 px-2 pb-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="flex-shrink-0 min-w-[70px]">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center w-full h-14 rounded-lg transition-all ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-5 h-5 mb-1 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,200,83,0.5)]' : ''}`} />
                      <span className="text-[10px] whitespace-nowrap">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
