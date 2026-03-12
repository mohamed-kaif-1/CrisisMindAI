import { useState } from 'react';
import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

const REGIONS = [
  { id: 'na', label: 'North America', score: 38, color: '#FFD44A', cx: 175, cy: 145 },
  { id: 'sa', label: 'South America', score: 54, color: '#FF8C42', cx: 215, cy: 245 },
  { id: 'eu', label: 'Europe',        score: 62, color: '#FF8C42', cx: 330, cy: 115 },
  { id: 'af', label: 'Africa',        score: 78, color: '#FF3B5C', cx: 345, cy: 200 },
  { id: 'me', label: 'Middle East',   score: 82, color: '#FF3B5C', cx: 400, cy: 155 },
  { id: 'as', label: 'Asia',          score: 71, color: '#FF8C42', cx: 490, cy: 145 },
  { id: 'oc', label: 'Oceania',       score: 22, color: '#00E5A0', cx: 545, cy: 255 },
];

function RiskBar({ label, score, color, index }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-white/50 w-24 shrink-0 font-medium">{label}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 + index * 0.08, ease: [0.22,1,0.36,1] }}
        />
      </div>
      <span className="text-[11px] font-bold w-8 text-right tabular-nums" style={{ color }}>{score}</span>
    </div>
  );
}

export default function GlobalRisk() {
  const [hovered, setHovered] = useState(null);

  return (
    <BentoCard className="flex flex-col h-full" glow="purple" delay={0.1}>
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-white/80">Global Risk Overview</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30">Updated 4 min ago</span>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7C3AED' }} />
        </div>
      </div>
{/* SVG world map silhouette */}
<div className="relative mx-4 mb-3">
  <svg
    viewBox="0 0 680 360"
    className="w-full"
    style={{ filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.15))' }}
  >
    {/* World map silhouette */}
    <motion.path
      d="M88 154l26-10 32-14 36-6 48 8 30-10 34 6 20-16 34 10 24-12 34 8 18-10 26 12 28-8 20 14 26 8 16 16-8 20-24 10-22 18-28 6-26 12-30 6-24 14-28 6-34-10-30 10-36-6-34 12-28-8-22 6-20-12-12-18 6-20-10-14 6-18z"
      fill="rgba(255,255,255,0.05)"
      stroke="rgba(124,58,237,0.35)"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
    />
          {/* Additional landmass blobs for realism */}
          <ellipse cx="345" cy="200" rx="58" ry="72" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <ellipse cx="490" cy="145" rx="95" ry="60" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <ellipse cx="215" cy="245" rx="30" ry="45" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <ellipse cx="545" cy="258" rx="35" ry="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

          {/* Hotspot markers */}
          {REGIONS.map(r => (
            <g
              key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer pulse ring */}
              <circle cx={r.cx} cy={r.cy} r="16" fill="none" stroke={r.color} strokeWidth="0.8" opacity="0.25">
                <animate attributeName="r" from="10" to="22" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.3" to="0" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              {/* Core dot */}
              <circle cx={r.cx} cy={r.cy} r={hovered === r.id ? 7 : 5} fill={r.color} opacity="0.9">
                <animate attributeName="r" from={5} to={6} dur="1.8s" repeatCount="indefinite" calcMode="ease-in-out" keyTimes="0;0.5;1" values={`${hovered === r.id?7:5};${hovered === r.id?8:6};${hovered === r.id?7:5}`}/>
              </circle>
              {/* Score badge */}
              {hovered === r.id && (
                <g>
                  <rect x={r.cx + 8} y={r.cy - 14} width="38" height="18" rx="5" fill={r.color} opacity="0.95"/>
                  <text x={r.cx + 27} y={r.cy - 1} textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">{r.label.split(' ')[0]} {r.score}</text>
                </g>
              )}
            </g>
          ))}

          {/* Scan line */}
          <line x1="0" y1="0" x2="680" y2="0" stroke="rgba(0,212,255,0.15)" strokeWidth="1">
            <animateTransform attributeName="transform" type="translate" from="0,0" to="0,360" dur="4s" repeatCount="indefinite"/>
          </line>
        </svg>

        {/* Legend */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 text-[9px] font-semibold">
          {[['CRITICAL','#FF3B5C'],['HIGH','#FF8C42'],['MEDIUM','#FFD44A'],['LOW','#00E5A0']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: c }} />
              <span style={{ color: 'rgba(241,245,249,0.4)' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Region bars */}
      <div className="flex flex-col gap-2.5 px-5 pb-5">
        {REGIONS.map((r, i) => (
          <RiskBar key={r.id} label={r.label} score={r.score} color={r.color} index={i} />
        ))}
      </div>
    </BentoCard>
  );
}
