import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function BentoCard({
  children,
  className = '',
  glow = 'none',
  delay = 0,
  style = {},
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotX = useTransform(my, [-0.5, 0.5], [5, -5]);
  const rotY = useTransform(mx, [-0.5, 0.5], [-5, 5]);
  const sRotX = useSpring(rotX, { stiffness: 120, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 120, damping: 22 });

  const glowClass = { none:'', cyan:'glow-cyan', purple:'glow-purple', danger:'glow-danger' }[glow] ?? '';

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      ref={ref}
      className={`card-base ${glowClass} ${className}`}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d', ...style }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: 'rgba(0,212,255,0.16)' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[24px] z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.045) 0%, transparent 65%)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}
