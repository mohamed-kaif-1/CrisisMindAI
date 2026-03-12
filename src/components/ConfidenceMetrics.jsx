import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

const METRICS = [
  { label: 'Natural Disaster',   value: 96.4, color: '#00D4FF',  track: '#0a2030', icon: '🌊' },
  { label: 'Geopolitical',       value: 87.2, color: '#A78BFA',  track: '#160d2a', icon: '🏛️' },
  { label: 'Cyber / Industrial', value: 91.8, color: '#00E5A0',  track: '#0a2018', icon: '⚡' },
  { label: 'Pandemic Signals',   value: 79.5, color: '#FF8C42',  track: '#2a1506', icon: '🦠' },
];

function ArcGauge({ value, color, track, size = 80, strokeW = 7 }) {
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;
  const arc  = circ * 0.75;
  const offset = arc - (arc * value) / 100;
  const cx = size / 2, cy = size / 2;
  const startAngle = 135 * (Math.PI / 180);
  const sx = cx + r * Math.cos(startAngle);
  const sy = cy + r * Math.sin(startAngle);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={track}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeDasharray={`${arc} ${circ - arc}`}
        strokeDashoffset={circ * 0.125}
        transform={`rotate(135 ${cx} ${cy})`}
      />
      {/* Value arc */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeDasharray={`${arc} ${circ - arc}`}
        strokeDashoffset={circ * 0.125}
        transform={`rotate(135 ${cx} ${cy})`}
        style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        initial={{ strokeDashoffset: arc + circ * 0.125 }}
        whileInView={{ strokeDashoffset: offset + circ * 0.125 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

const MODEL_STATS = [
  { k: 'Model',       v: 'Gemini 2.0 Flash' },
  { k: 'Context',     v: '1M tokens' },
  { k: 'Modalities',  v: 'Vision + Text + Audio' },
  { k: 'Latency',     v: '< 0.4s' },
];

export default function ConfidenceMetrics() {
  return (
    <BentoCard className="flex flex-col h-full" glow="cyan" delay={0.15}>
      <div className="px-5 pt-5 pb-3">
        <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-white/80">AI Confidence</span>
        <p className="text-[11px] text-white/30 mt-0.5">Gemini classification accuracy by crisis category</p>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-2 gap-4 px-5 pb-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="flex flex-col items-center gap-1 p-3 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.04)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="relative">
              <ArcGauge value={m.value} color={m.color} track={m.track} size={72} strokeW={6} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px]">{m.icon}</span>
                <span
                  className="text-[13px] font-extrabold tabular-nums leading-none"
                  style={{ color: m.color }}
                >
                  {m.value}
                  <span className="text-[8px]">%</span>
                </span>
              </div>
            </div>
            <span className="text-[9.5px] text-center font-semibold text-white/45 leading-tight">{m.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-5 mb-3" style={{ height: 1, background: 'rgba(255,255,255,0.04)' }} />

      {/* Model info */}
      <div className="px-5 pb-5 flex flex-col gap-2">
        {MODEL_STATS.map(({ k, v }) => (
          <div key={k} className="flex items-center justify-between">
            <span className="text-[11px] text-white/30 font-medium">{k}</span>
            <span className="text-[11px] font-semibold text-white/70">{v}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
