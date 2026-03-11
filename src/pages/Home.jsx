import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveAlerts from '../components/LiveAlerts';
import GlobalRisk from '../components/GlobalRisk';
import ConfidenceMetrics from '../components/ConfidenceMetrics';
import SignalPipeline from '../components/SignalPipeline';
import MultimodalPanel from '../components/MultimodalPanel';
import ResponseCards from '../components/ResponseCards';
import WhyItMatters from '../components/WhyItMatters';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <div style={{ background: '#02040A', minHeight: '100vh' }}>
      <Navbar />
      <Hero />

      {/* ── Bento Dashboard ──────────────────────────────── */}
      <section id="alerts" className="px-5 md:px-10 pb-8 max-w-[1540px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/25">
            Live Intelligence Dashboard
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Row 1 */}
        <div
          className="grid gap-4 mb-4"
          style={{ gridTemplateColumns: 'minmax(300px,1.1fr) minmax(320px,1.8fr) minmax(240px,1fr)' }}
        >
          <LiveAlerts />
          <GlobalRisk />
          <ConfidenceMetrics />
        </div>

        {/* Row 2 */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'minmax(300px,1.4fr) minmax(260px,1.2fr) minmax(280px,1.4fr)' }}
        >
          <SignalPipeline />
          <MultimodalPanel />
          <ResponseCards />
        </div>
      </section>

      <WhyItMatters />
      <CTASection />
    </div>
  );
}