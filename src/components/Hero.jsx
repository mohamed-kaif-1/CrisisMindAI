import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { label: 'Active Crisis Zones',   value: '47',   suffix: '',   color: '#FF3B5C' },
  { label: 'Signals Processed /s',  value: '12.4K',suffix: '',   color: '#00D4FF' },
  { label: 'Avg Detection Lead',    value: '8.3',  suffix: 'hrs',color: '#00E5A0' },
  { label: 'AI Accuracy Rate',      value: '96.7', suffix: '%',  color: '#A78BFA' },
];

function AnimatedNumber({ target }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const hasK = target.includes('K');
    let start = null;
    const duration = 1600;
    function step(ts) {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      const cur = num * ease;
      if (hasK) setDisplay((cur).toFixed(1) + 'K');
      else if (target.includes('.')) setDisplay(cur.toFixed(1));
      else setDisplay(Math.round(cur).toString());
      if (prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [target]);
  return <>{display}</>;
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y    = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  return (
    <section
      ref={ref}
      id="overview"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      style={{ paddingTop: 80 }}
    >
      {/* Deep radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0,212,255,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 40% at 80% 70%, rgba(124,58,237,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[18%] w-96 h-96 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00D4FF, transparent)' }}
        animate={{ scale: [1, 1.12, 1], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[5%] bottom-[20%] w-72 h-72 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
        animate={{ scale: [1, 1.08, 1], y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6"
        style={{ y, opacity: fade }}
      >
        {/* Eyebrow label */}
        <motion.div
          className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.18)',
            color: '#00D4FF',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-sky-400" />
          </span>
          Powered by Google Gemini
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-extrabold leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
        >
          <span className="text-white">Early warning for</span>
          <br />
          <span className="text-gradient">every global crisis.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="max-w-2xl text-[17px] leading-[1.75] font-medium mb-10"
          style={{ color: 'rgba(241,245,249,0.52)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36 }}
        >
          SENTINEL fuses satellite imagery, seismic feeds, social signals, and live
          news into a single Gemini-powered intelligence layer — detecting emergencies
          hours before traditional systems, so responders can act first.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48 }}
        >
          <motion.button
            className="px-7 py-3.5 rounded-2xl text-[14px] font-bold text-black"
            style={{ background: 'linear-gradient(135deg,#00D4FF,#7C3AED)' }}
            whileHover={{ scale: 1.04, filter: 'brightness(1.12)' }}
            whileTap={{ scale: 0.97 }}
          >
            View Live Dashboard
          </motion.button>
          <motion.button
            className="px-7 py-3.5 rounded-2xl text-[14px] font-bold text-white/80"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Demo ↗
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="card-base flex flex-col items-center gap-1 py-5 px-4"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.65 + i * 0.1 }}
            >
              <span
                className="text-[28px] font-extrabold tabular-nums leading-none"
                style={{ color: s.color }}
              >
                {visible && <AnimatedNumber target={s.value} />}
                <span className="text-[16px] ml-0.5">{s.suffix}</span>
              </span>
              <span className="text-[11px] font-medium text-center" style={{ color: 'rgba(241,245,249,0.4)' }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 opacity-30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-medium">Scroll</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <rect x="5.5" y="0.5" width="5" height="9" rx="2.5" stroke="white" strokeOpacity="0.3"/>
          <circle cx="8" cy="4" r="1.5" fill="white" fillOpacity="0.4">
            <animate attributeName="cy" from="4" to="6.5" dur="1.6s" repeatCount="indefinite"/>
          </circle>
          <path d="M4 14L8 18L12 14" stroke="white" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}
