import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      style={{
        height: 64,
        background: scrolled ? 'rgba(2,4,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-7 h-7">
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{ background: 'linear-gradient(135deg,#00D4FF,#7C3AED)' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="absolute inset-[2px] rounded-md"
            style={{ background: '#02040A' }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center text-[9px] font-black"
            style={{ color: '#00D4FF' }}
          >
            S
          </div>
        </div>
        <span className="text-[15px] font-bold tracking-[0.12em] uppercase text-white/90">
          Sentinel
        </span>
        <div
          className="ml-1 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
          style={{ background: 'rgba(255,59,92,0.12)', color: '#FF3B5C', border: '1px solid rgba(255,59,92,0.25)' }}
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-red-500" />
          </span>
          Live
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {['Overview','Alerts','Analysis','Response'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[13px] font-medium text-white/50 hover:text-white/90 transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:flex items-center gap-3">
        <motion.button
          className="px-4 py-2 rounded-xl text-[13px] font-semibold"
          style={{
            background: 'linear-gradient(135deg,#00D4FF,#7C3AED)',
            color: '#000',
          }}
          whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.97 }}
        >
          Launch Dashboard
        </motion.button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(o => !o)}
      >
        {[0,1,2].map(i => (
          <motion.span
            key={i}
            className="block h-[1.5px] w-5 bg-white/70 rounded-full"
            animate={menuOpen ? {
              rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
              y:      i === 0 ?  6  : i === 2 ? -6  : 0,
              opacity: i === 1 ? 0 : 1,
            } : { rotate: 0, y: 0, opacity: 1 }}
          />
        ))}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-16 left-4 right-4 rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: 'rgba(8,14,24,0.97)', border: '1px solid rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {['Overview','Alerts','Analysis','Response'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/70 py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
