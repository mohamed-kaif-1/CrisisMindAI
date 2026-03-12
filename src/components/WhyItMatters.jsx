import { motion } from 'framer-motion';

const FACTS = [
  { stat: '72h', label: 'Average lead time lost by traditional early warning systems.', color: '#FF3B5C' },
  { stat: '3.8B', label: 'People affected by natural & man-made crises in 2024.', color: '#FF8C42' },
  { stat: '$890B', label: 'Estimated global economic damage from undetected crises each year.', color: '#FFD44A' },
  { stat: '8.3x', label: 'Faster response deployment when AI-driven alerts are active.', color: '#00E5A0' },
];

export default function WhyItMatters() {
  return (
    <section id="overview" className="relative py-28 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Glow bg */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.07), transparent)',
        }}
      />

      {/* Eyebrow */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span
          className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase"
          style={{ background: 'rgba(124,58,237,0.1)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.22)' }}
        >
          Why It Matters
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="text-center font-extrabold leading-[1.08] mb-4"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', letterSpacing: '-0.025em' }}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-white">The world's crises are moving</span>
        <br />
        <span className="text-gradient">faster than ever before.</span>
      </motion.h2>

      <motion.p
        className="text-center max-w-2xl mx-auto text-[15px] leading-relaxed mb-16 font-medium"
        style={{ color: 'rgba(241,245,249,0.45)' }}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18 }}
      >
        Existing early warning infrastructure was designed for a world that moved slowly.
        SENTINEL is designed for the world as it is — complex, interconnected, and fast.
      </motion.p>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {FACTS.map((f, i) => (
          <motion.div
            key={f.stat}
            className="card-base flex flex-col items-center text-center py-8 px-4 gap-2"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22,1,0.36,1] }}
            whileHover={{ scale: 1.03, borderColor: f.color + '30' }}
          >
            <span
              className="font-extrabold tabular-nums leading-none"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: f.color }}
            >
              {f.stat}
            </span>
            <p className="text-[11px] leading-relaxed font-medium" style={{ color: 'rgba(241,245,249,0.4)' }}>
              {f.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
