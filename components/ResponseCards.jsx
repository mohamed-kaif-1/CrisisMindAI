import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

const RESPONSES = [
  {
    priority: 'P1',
    color: '#FF3B5C',
    bg: 'rgba(255,59,92,0.1)',
    icon: '🚨',
    title: 'Evacuate Coastal Zones',
    context: 'Hurricane Elara · Atlantic',
    impact: 'Est. 180k lives protected',
    actions: ['Issue Zone A–C evacuation orders', 'Activate shelter-in-place protocol', 'Deploy maritime rescue units'],
    confidence: 97,
    timeWindow: '< 4 hours',
  },
  {
    priority: 'P1',
    color: '#FF3B5C',
    bg: 'rgba(255,59,92,0.1)',
    icon: '🏥',
    title: 'Deploy USAR Teams',
    context: 'Earthquake · Kahramanmaraş',
    impact: '~2,400 trapped persons',
    actions: ['Activate UN INSARAG clusters', 'Coordinate AFAD response center', 'Stage medical assets at grid 5N-7E'],
    confidence: 94,
    timeWindow: '< 2 hours',
  },
  {
    priority: 'P2',
    color: '#FF8C42',
    bg: 'rgba(255,140,66,0.08)',
    icon: '🛡️',
    title: 'Isolate Compromised Grid Nodes',
    context: 'Cyber-Physical · Eastern Europe',
    impact: 'Prevent cascade across 6 substations',
    actions: ['Trigger SCADA isolation protocol', 'Alert CERT-EU & national CERTs', 'Activate backup routing via node 14'],
    confidence: 87,
    timeWindow: '< 1 hour',
  },
  {
    priority: 'P2',
    color: '#FF8C42',
    bg: 'rgba(255,140,66,0.08)',
    icon: '🌊',
    title: 'Pre-position Flood Response',
    context: 'Flash Flood Risk · Sylhet',
    impact: '~84,000 at-risk residents',
    actions: ['Issue district-wide flood alert', 'Open 12 pre-designated flood shelters', 'Coordinate WFP food preposition'],
    confidence: 82,
    timeWindow: '< 6 hours',
  },
  {
    priority: 'P3',
    color: '#FFD44A',
    bg: 'rgba(255,212,74,0.07)',
    icon: '✈️',
    title: 'Humanitarian Corridor — Sudan',
    context: 'Displacement · Khartoum',
    impact: 'Aid access for 320k displaced',
    actions: ['Negotiate access with RSF command', 'Alert WFP convoy staging', 'Coordinate UN OCHA briefing'],
    confidence: 71,
    timeWindow: '12–24 hours',
  },
];

export default function ResponseCards() {
  return (
    <BentoCard className="flex flex-col h-full" delay={0.3}>
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-white/80">AI Response Recommendations</span>
          <p className="text-[11px] text-white/30 mt-0.5">Ranked by urgency · confidence weighted</p>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-lg"
          style={{ background: 'rgba(0,229,160,0.1)', color: '#00E5A0', border: '1px solid rgba(0,229,160,0.2)' }}
        >
          {RESPONSES.length} pending
        </span>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-5 flex-1 overflow-auto">
        {RESPONSES.map((r, i) => (
          <motion.div
            key={r.title}
            className="rounded-2xl p-4"
            style={{ background: r.bg, border: `1px solid ${r.color}22` }}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3 mb-2.5">
              <span className="text-xl leading-none pt-0.5">{r.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-[9px] font-black px-1.5 py-0.5 rounded-md tracking-wider"
                    style={{ background: r.color + '20', color: r.color, border: `1px solid ${r.color}40` }}
                  >
                    {r.priority}
                  </span>
                  <span className="text-[12.5px] font-bold text-white/90">{r.title}</span>
                </div>
                <p className="text-[10.5px] text-white/40 font-medium">{r.context}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[13px] font-extrabold tabular-nums" style={{ color: r.color }}>{r.confidence}%</span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded-md font-semibold"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(241,245,249,0.5)' }}
                >
                  {r.timeWindow}
                </span>
              </div>
            </div>

            {/* Impact badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2.5 text-[10px] font-semibold"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(241,245,249,0.55)' }}
            >
              <span>📊</span> {r.impact}
            </div>

            {/* Action checklist */}
            <ul className="space-y-1">
              {r.actions.map(a => (
                <li key={a} className="flex items-start gap-2">
                  <span className="mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: r.color + '20', border: `1px solid ${r.color}40` }}>
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                      <path d="M1 3.5L2.8 5.5L6 1.5" stroke={r.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-[10.5px] leading-relaxed text-white/55 font-medium">{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
}
