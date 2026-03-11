import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '⚡', text: 'Real-time signal fusion across 7+ data types' },
  { icon: '🧠', text: 'Gemini 2.0 multimodal reasoning engine' },
  { icon: '🛰️', text: 'Orbital + ground + cyber sensor coverage' },
  { icon: '🎯', text: '96.7% prediction accuracy across crisis categories' },
];

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 md:px-10 overflow-hidden">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.055) 0%, transparent 70%),' +
            'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="card-base text-center py-20 px-8"
          style={{
            background: 'rgba(8,14,24,0.9)',
            boxShadow: '0 0 80px rgba(0,212,255,0.06), 0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-[11px] font-bold tracking-[0.15em] uppercase"
            style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.18)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00D4FF' }} />
            Built for Hackathon Judges
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-extrabold leading-[1.07] mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', letterSpacing: '-0.025em' }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <span className="text-white">Ready to experience</span>
            <br />
            <span className="text-gradient">crisis intelligence live?</span>
          </motion.h2>

          <motion.p
            className="max-w-xl mx-auto text-[15px] leading-relaxed mb-10 font-medium"
            style={{ color: 'rgba(241,245,249,0.45)' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22 }}
          >
            SENTINEL is a fully functional prototype integrating live data sources
            with Gemini's multimodal API. See the platform detect a simulated crisis
            in under 30 seconds.
          </motion.p>

          {/* Feature chips */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {FEATURES.map(f => (
              <div
                key={f.text}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11.5px] font-medium"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(241,245,249,0.6)',
                }}
              >
                <span>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36 }}
          >
            <motion.button
              className="px-10 py-4 rounded-2xl text-[15px] font-bold text-black"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7C3AED)' }}
              whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.97 }}
            >
              Run Live Demo
            </motion.button>
            <motion.button
              className="px-10 py-4 rounded-2xl text-[15px] font-bold text-white/75"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
            >
              View Source
            </motion.button>
          </motion.div>

          {/* Built with badge */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[11px] text-white/20 font-medium">Built with</span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{ background: 'rgba(66,133,244,0.12)', color: 'rgba(66,133,244,0.8)', border: '1px solid rgba(66,133,244,0.2)' }}
            >
              Google Gemini 2.0
            </span>
            <span className="text-[11px] text-white/20 font-medium">for the</span>
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{ background: 'rgba(0,212,255,0.08)', color: 'rgba(0,212,255,0.7)', border: '1px solid rgba(0,212,255,0.18)' }}
            >
              Gemini API Contest 2025
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-white/40">SENTINEL</span>
          <span className="text-white/15">·</span>
          <span className="text-[11px] text-white/20">AI Crisis Intelligence Platform</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-white/20 font-medium">
          <span>© 2025 SENTINEL</span>
          <span>All signals are simulated for demo purposes</span>
        </div>
      </div>
    </section>
  );
}
