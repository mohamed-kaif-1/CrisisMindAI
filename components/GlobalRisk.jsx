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
          {/* Simplified world outline paths */}
          <path
            d="M85,130 Q110,108 140,112 L158,105 Q175,95 195,100 L215,95 Q240,88 255,98 L262,95 Q278,88 290,96 L295,92 Q310,85 320,98 L328,92 Q344,82 358,98 L366,90 Q382,80 394,94 L400,88 Q418,76 432,90 L454,80 Q480,68 504,84 L528,75 Q556,60 576,78 L598,66 Q622,52 636,70 L648,75 Q662,80 668,90 L670,120 Q672,145 665,160 L660,180 Q655,200 648,210 L638,225 Q625,240 610,238 L595,245 Q578,252 562,248 L545,255 Q526,262 510,255 L490,260 Q472,268 455,260 L440,268 Q422,278 405,268 L390,278 Q370,290 355,280 L338,292 Q318,305 300,292 L282,305 Q258,320 238,305 L218,318 Q192,334 172,318 L154,325 Q130,340 110,322 L90,318 Q70,314 58,298 L46,278 Q40,255 48,238 L42,218 Q34,194 45,178 L40,160 Q32,138 46,125 L62,115 Q74,108 85,130Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
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
