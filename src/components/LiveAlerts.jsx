import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from './BentoCard';

const ALERTS = [
  {
    id: 1, level: 'CRITICAL', region: 'Türkiye — Kahramanmaraş',
    title: 'M 6.8 Seismic Event Detected',
    detail: 'Secondary aftershock cluster forming. 240k estimated affected.',
    time: '2 min ago', icon: '🌍', color: '#FF3B5C',
    sources: ['Seismic Array','Satellite','Social'],
  },
  {
    id: 2, level: 'HIGH', region: 'Sudan — Khartoum',
    title: 'Civil Unrest & Displacement',
    detail: 'Rapid population movement north. Aid corridor at risk.',
    time: '11 min ago', icon: '⚠️', color: '#FF8C42',
    sources: ['News','Social','OSINT'],
  },
  {
    id: 3, level: 'HIGH', region: 'Atlantic — 22.4°N 68.1°W',
    title: 'Category 4 Hurricane Forming',
    detail: 'Eye wall replacement cycle complete. Puerto Rico landfall T-18h.',
    time: '28 min ago', icon: '🌀', color: '#FF8C42',
    sources: ['Satellite','Weather'],
  },
  {
    id: 4, level: 'MEDIUM', region: 'Eastern Europe — Grid Segment 7',
    title: 'Coordinated Cyber-Physical Attack',
    detail: 'ICS anomaly pattern matches SANDWORM TTPs. 3 substations offline.',
    time: '43 min ago', icon: '⚡', color: '#FFD44A',
    sources: ['CERT','SCADA','Threat Intel'],
  },
  {
    id: 5, level: 'MEDIUM', region: 'Bangladesh — Sylhet',
    title: 'Flash Flood Risk — Critical Level',
    detail: 'River gauge 94% capacity. Upstream precipitation 3× baseline.',
    time: '1 hr ago', icon: '💧', color: '#FFD44A',
    sources: ['Weather','IoT Sensors'],
  },
  {
    id: 6, level: 'LOW', region: 'Philippines — Davao',
    title: 'Volcanic SO₂ Emission Spike',
    detail: 'Mt. Apo SO₂ at 1,840 t/day. Alert Level 2 precautionary.',
    time: '2 hr ago', icon: '🌋', color: '#00E5A0',
    sources: ['Satellite','PHIVOLCS'],
  },
];

const lvlStyles = {
  CRITICAL: { bg: 'rgba(255,59,92,0.12)', text: '#FF3B5C', border: 'rgba(255,59,92,0.28)' },
  HIGH:     { bg: 'rgba(255,140,66,0.1)',  text: '#FF8C42', border: 'rgba(255,140,66,0.25)' },
  MEDIUM:   { bg: 'rgba(255,212,74,0.08)', text: '#FFD44A', border: 'rgba(255,212,74,0.22)' },
  LOW:      { bg: 'rgba(0,229,160,0.08)', text: '#00E5A0', border: 'rgba(0,229,160,0.22)' },
};

export default function LiveAlerts() {
  const [active, setActive] = useState(ALERTS[0].id);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <BentoCard className="flex flex-col h-full min-h-[520px]" glow="danger" delay={0.05}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-white/80">Live Alerts</span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,59,92,0.15)', color: '#FF3B5C', border: '1px solid rgba(255,59,92,0.25)' }}
          >
            {ALERTS.length} Active
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FF3B5C' }} />
            <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: '#FF3B5C' }} />
          </span>
          <span className="text-[10px] text-white/30 font-medium">Real-time</span>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="mx-5 mb-3 px-3 py-1.5 rounded-lg overflow-hidden"
        style={{ background: 'rgba(255,59,92,0.07)', border: '1px solid rgba(255,59,92,0.12)' }}
      >
        <div className="flex gap-8 animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...ALERTS, ...ALERTS].map((a, i) => (
            <span key={i} className="text-[10.5px] font-medium" style={{ color: lvlStyles[a.level].text }}>
              [{a.level}] {a.region} — {a.title}
            </span>
          ))}
        </div>
      </div>

      {/* Alerts list */}
      <div className="flex flex-col gap-2 px-4 pb-4 flex-1 overflow-y-auto">
        {ALERTS.map((alert, i) => {
          const s = lvlStyles[alert.level];
          const isActive = active === alert.id;
          return (
            <motion.button
              key={alert.id}
              className="w-full text-left rounded-2xl px-4 py-3 transition-all"
              style={{
                background: isActive ? s.bg : 'rgba(255,255,255,0.025)',
                border: `1px solid ${isActive ? s.border : 'rgba(255,255,255,0.05)'}`,
              }}
              onClick={() => setActive(isActive ? null : alert.id)}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.998 }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-base leading-none">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[9px] font-bold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-md"
                      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
                    >
                      {alert.level}
                    </span>
                    <span className="text-[10px] text-white/30 font-medium truncate">{alert.region}</span>
                  </div>
                  <p className="text-[12.5px] font-semibold text-white/85 truncate leading-snug">{alert.title}</p>
                </div>
                <span className="text-[10px] text-white/25 shrink-0">{alert.time}</span>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[11.5px] leading-relaxed mt-2 mb-2" style={{ color: 'rgba(241,245,249,0.5)' }}>
                      {alert.detail}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {alert.sources.map(src => (
                        <span key={src} className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: 'rgba(0,212,255,0.08)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.18)' }}>
                          {src}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </BentoCard>
  );
}
