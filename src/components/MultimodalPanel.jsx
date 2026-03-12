import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

const MODALITIES = [
  {
    icon: '🛰️',
    label: 'Satellite Imagery',
    type: 'VISION',
    status: 'Analyzed',
    confidence: 94,
    color: '#00D4FF',
    detail: 'Post-event structural damage: 34 sq km affected area. 820 structures collapsed.',
    preview: 'img',
  },
  {
    icon: '📢',
    label: 'Emergency Radio',
    type: 'AUDIO',
    status: 'Transcribed',
    confidence: 88,
    color: '#A78BFA',
    detail: '"Urgent — magnitude confirmed. Medical teams requested at grid 44-C. Repeat…"',
    preview: 'audio',
  },
  {
    icon: '📝',
    label: 'Field Reports',
    type: 'TEXT',
    status: 'Summarized',
    confidence: 97,
    color: '#00E5A0',
    detail: '14 reports processed. Primary theme: infrastructure failure, secondary: mass casualty.',
    preview: 'text',
  },
  {
    icon: '🎥',
    label: 'CCTV / Drone Feed',
    type: 'VIDEO',
    status: 'Processing',
    confidence: 76,
    color: '#FF8C42',
    detail: 'Motion anomaly detected in frames 1,240–1,890. Structural breach pattern flagged.',
    preview: 'video',
  },
];

function AudioWave({ color }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {Array.from({ length: 18 }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full w-[2px] flex-shrink-0"
          style={{ background: color }}
          animate={{ height: [`${8 + Math.sin(i * 0.8) * 10}px`, `${14 + Math.cos(i * 1.2) * 10}px`, `${8 + Math.sin(i * 0.8) * 10}px`] }}
          transition={{ duration: 0.6 + i * 0.05, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

function ImagePreview() {
  return (
    <div className="relative w-full h-16 rounded-lg overflow-hidden" style={{ background: 'rgba(0,212,255,0.04)' }}>
      <svg viewBox="0 0 200 64" className="w-full h-full">
        {/* Fake satellite grid */}
        {Array.from({ length: 8 }, (_, i) =>
          Array.from({ length: 24 }, (_, j) => (
            <rect
              key={`${i}-${j}`}
              x={j * 8.5} y={i * 8.5}
              width="7.5" height="7.5"
              rx="0.5"
              fill={Math.random() > 0.7 ? 'rgba(255,59,92,0.35)' : 'rgba(0,212,255,0.07)'}
            />
          ))
        )}
        <rect x="42" y="10" width="80" height="44" rx="2" fill="none" stroke="#FF3B5C" strokeWidth="1.2" strokeDasharray="4 2" />
        <text x="82" y="34" fill="#FF3B5C" fontSize="5" textAnchor="middle" fontWeight="700">DAMAGE ZONE</text>
      </svg>
      <div className="absolute bottom-1 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded"
        style={{ background: 'rgba(255,59,92,0.8)', color: '#fff' }}>
        SENTINEL-2
      </div>
    </div>
  );
}

export default function MultimodalPanel() {
  return (
    <BentoCard className="flex flex-col h-full" glow="purple" delay={0.25}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-white/80">Multimodal Analysis</span>
          <p className="text-[11px] text-white/30 mt-0.5">Gemini processes every signal type in parallel</p>
        </div>
        <div
          className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
          style={{ background: 'rgba(124,58,237,0.15)', color: '#A78BFA', border: '1px solid rgba(124,58,237,0.25)' }}
        >
          4 streams
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-5">
        {MODALITIES.map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-2xl p-3.5"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.042)' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-base">{m.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-white/85">{m.label}</span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-wider"
                    style={{ background: `${m.color}14`, color: m.color, border: `1px solid ${m.color}30` }}
                  >
                    {m.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-extrabold tabular-nums" style={{ color: m.color }}>{m.confidence}%</span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-md font-semibold"
                  style={{
                    background: m.status === 'Processing' ? 'rgba(255,140,66,0.12)' : 'rgba(0,229,160,0.1)',
                    color: m.status === 'Processing' ? '#FF8C42' : '#00E5A0',
                  }}
                >
                  {m.status}
                </span>
              </div>
            </div>

            {/* Preview */}
            {m.preview === 'img' && <ImagePreview />}
            {m.preview === 'audio' && (
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg" style={{ background: 'rgba(167,139,250,0.06)' }}>
                <AudioWave color={m.color} />
              </div>
            )}
            {m.preview === 'text' && (
              <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(0,229,160,0.04)' }}>
                <p className="text-[10px] font-mono leading-relaxed" style={{ color: 'rgba(0,229,160,0.65)' }}>
                  &gt; NLP Entity: [earthquake, Kahramanmaraş, M6.8, collapse]<br />
                  &gt; Sentiment: urgent-distress | Credibility: 0.97<br />
                  &gt; Action flag: DEPLOY_MEDICAL_TEAMS
                </p>
              </div>
            )}
            {m.preview === 'video' && (
              <div className="relative rounded-lg overflow-hidden h-12" style={{ background: 'rgba(255,140,66,0.04)' }}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-[1px] animate-scan" style={{ background: 'rgba(255,140,66,0.5)' }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-semibold" style={{ color: 'rgba(255,140,66,0.6)' }}>ANALYZING FRAME 1,714 / 3,200</span>
                </div>
              </div>
            )}

            {/* Detail text */}
            <p className="text-[10.5px] leading-relaxed mt-2" style={{ color: 'rgba(241,245,249,0.4)' }}>
              {m.detail}
            </p>

            {/* Confidence bar */}
            <div className="mt-2 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}88)` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${m.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
