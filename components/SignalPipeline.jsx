import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from './BentoCard';

const SIGNALS = [
  { id: 'sat',   icon: '🛰️', label: 'Satellite Imagery',    rate: 1240,  status: 'active',  latency: '1.2s' },
  { id: 'seis',  icon: '📡', label: 'Seismic Array (IRIS)',  rate: 8800,  status: 'active',  latency: '0.3s' },
  { id: 'soc',   icon: '📲', label: 'Social Stream',         rate: 34200, status: 'active',  latency: '0.8s' },
  { id: 'wx',    icon: '🌤️', label: 'Weather Stations',      rate: 560,   status: 'active',  latency: '4.1s' },
  { id: 'news',  icon: '📰', label: 'News / RSS Feeds',      rate: 2100,  status: 'active',  latency: '2.0s' },
  { id: 'iot',   icon: '🔌', label: 'IoT Grid Sensors',      rate: 19000, status: 'warning', latency: '0.5s' },
  { id: 'osint', icon: '🕵️', label: 'OSINT Intelligence',    rate: 480,   status: 'active',  latency: '6.8s' },
];

const STAGES = ['Ingest', 'Normalize', 'Embed', 'Analyze', 'Score', 'Alert'];

function SparkLine({ color }) {
  const [pts, setPts] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({ x: i * 4, y: 12 + Math.random() * 12 }))
  );

  useEffect(() => {
    const t = setInterval(() => {
      setPts(prev => [
        ...prev.slice(1).map((p, i) => ({ x: i * 4, y: p.y })),
        { x: 76, y: 6 + Math.random() * 18 },
      ]);
    }, 400);
    return () => clearInterval(t);
  }, []);

  const d = pts.reduce((acc, p, i) =>
    i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');

  return (
    <svg width="80" height="28" viewBox="0 0 80 28">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

export default function SignalPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStage(s => (s + 1) % STAGES.length), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <BentoCard className="flex flex-col h-full" delay={0.2}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-white/80">Signal Pipeline</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-white/30 font-medium">Processing</span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00E5A0' }} />
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="flex items-center gap-0 px-5 pb-4">
        {STAGES.map((stage, i) => (
          <div key={stage} className="flex items-center flex-1 min-w-0">
            <motion.div
              className="flex flex-col items-center gap-1 flex-1"
              animate={{ opacity: activeStage === i ? 1 : 0.4 }}
            >
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black"
                animate={activeStage === i ? {
                  background: ['rgba(0,212,255,0.15)', 'rgba(0,212,255,0.3)', 'rgba(0,212,255,0.15)'],
                  borderColor: ['rgba(0,212,255,0.3)', 'rgba(0,212,255,0.6)', 'rgba(0,212,255,0.3)'],
                  scale: [1, 1.08, 1],
                } : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', scale: 1 }}
                transition={{ duration: 0.6, repeat: activeStage === i ? Infinity : 0 }}
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span style={{ color: activeStage === i ? '#00D4FF' : 'rgba(255,255,255,0.3)' }}>
                  {i + 1}
                </span>
              </motion.div>
              <span className="text-[9px] font-semibold text-center leading-none" style={{ color: activeStage === i ? '#00D4FF' : 'rgba(255,255,255,0.3)' }}>
                {stage}
              </span>
            </motion.div>
            {i < STAGES.length - 1 && (
              <div className="flex-1 h-[1px] mx-1 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {activeStage > i && (
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ background: 'linear-gradient(90deg, #00D4FF, #7C3AED)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-5 mb-3" style={{ height: 1, background: 'rgba(255,255,255,0.04)' }} />

      {/* Signal sources table */}
      <div className="flex flex-col gap-1.5 px-4 pb-4 flex-1 overflow-auto">
        {SIGNALS.map((s, i) => (
          <motion.div
            key={s.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.04)' }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-sm flex-shrink-0">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-semibold text-white/75 truncate leading-none mb-0.5">{s.label}</p>
              <p className="text-[10px] text-white/30 font-medium">
                {s.rate.toLocaleString()} evt/s · {s.latency} lag
              </p>
            </div>
            <SparkLine color={s.status === 'warning' ? '#FF8C42' : '#00D4FF'} />
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: s.status === 'warning' ? '#FF8C42' : '#00E5A0',
                boxShadow: `0 0 6px ${s.status === 'warning' ? '#FF8C42' : '#00E5A0'}` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Total throughput */}
      <div
        className="mx-4 mb-4 flex items-center justify-between px-4 py-3 rounded-2xl"
        style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.12)' }}
      >
        <span className="text-[11px] text-white/40 font-medium">Total Throughput</span>
        <span className="text-[16px] font-extrabold tabular-nums" style={{ color: '#00D4FF' }}>
          66,380
          <span className="text-[10px] ml-1 font-semibold text-white/40">events/sec</span>
        </span>
      </div>
    </BentoCard>
  );
}
