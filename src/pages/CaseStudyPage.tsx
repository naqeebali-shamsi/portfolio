import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { caseStudy } from '@/data/content';
import SectionLabel from '@/components/atoms/SectionLabel';
import AnimatedArchitecture from '@/components/CaseStudy/AnimatedArchitecture';
import ExternalLink from '@/components/atoms/ExternalLink';
import { Navbar } from '@/components/Navbar/Navbar';
import { CustomCursor } from '@/components/CustomCursor';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const allScreenshots = [
  { src: '/nomadcrew-screens/trip-list.png', label: 'Trip List', desc: 'Every active, upcoming, and completed trip in one view. Status badges show trip phase at a glance.' },
  { src: '/nomadcrew-screens/live-map.png', label: 'Live Map', desc: 'Real-time location sharing across all trip members on a single Google Maps integration.' },
  { src: '/nomadcrew-screens/invite-member.png', label: 'Invite Member', desc: 'Streamlined invite flow with role-based permissions assigned automatically on acceptance.' },
  { src: '/nomadcrew-screens/welcome-login.png', label: 'Welcome', desc: 'Google and Apple Sign-In with secure token storage and preemptive refresh.' },
  { src: '/nomadcrew-screens/onboarding.png', label: 'Onboarding', desc: 'First-run experience that sets context before the first trip is created.' },
  { src: '/nomadcrew-screens/username-setup.png', label: 'Setup', desc: 'Identity setup that feeds into the permission and notification systems.' },
];

const metrics = [
  { value: '692+', label: 'Source Files' },
  { value: '65+', label: 'API Endpoints' },
  { value: '22', label: 'Database Tables' },
  { value: '604', label: 'Test Functions' },
  { value: '40+', label: 'Event Types' },
  { value: '10', label: 'Integrations' },
];

const stackTable = [
  { layer: 'Backend', tech: 'Go 1.24 + Gin', why: 'Goroutines and channels handle thousands of simultaneous WebSocket connections with minimal overhead' },
  { layer: 'Mobile', tech: 'React Native + Expo', why: 'Single codebase for iOS and Android with native performance where it matters' },
  { layer: 'Database', tech: 'PostgreSQL', why: 'Enforces referential integrity across trips, members, expenses, and permissions at the schema level' },
  { layer: 'Cache', tech: 'Redis (Upstash)', why: 'Hot-path caching and real-time event distribution between service boundaries' },
  { layer: 'Real-Time', tech: 'WebSockets', why: 'Persistent connections for instant chat, location updates, and trip state synchronization' },
  { layer: 'Storage', tech: 'Cloudflare R2', why: 'Object storage for trip media with HMAC-signed download URLs and magic-byte MIME detection' },
  { layer: 'Auth', tech: 'Supabase + CASL', why: 'Matrix-based permission model mapping users, roles, trip phases, and resource types' },
];

const challenges = [
  { title: 'Penny-Perfect Expense Splitting', desc: 'Money stored in minor units (cents as BIGINT). The go-money library handles distribution, and a greedy debt simplification algorithm minimizes the number of settlement transactions. Three split types \u2014 EQUAL, EXACT, and PERCENTAGE \u2014 all resolve without rounding errors.' },
  { title: 'Privacy at the Database Level', desc: 'A PostgreSQL function round_coordinates() enforces three privacy levels \u2014 hidden, approximate (~1.1km), and precise. The application layer cannot bypass it. Privacy is not a feature flag; it is a schema constraint.' },
  { title: 'WebSocket Hub with Fine-Grained Concurrency', desc: 'Each connection runs three goroutines (read, write, ping) coordinated via context cancellation. A sync.RWMutex guards the connection map. Buffered channels (256) with graceful overflow \u2014 drops events rather than blocking the hub.' },
  { title: 'iOS SecureStore Token Chunking', desc: 'iOS limits SecureStore entries to 2,048 bytes. JWT tokens exceed this. The frontend implements a chunking adapter that splits tokens across multiple entries and reassembles transparently \u2014 combined with preemptive refresh and a 401 queue for concurrent requests.' },
  { title: 'Type-Safe Data Access via SQLC', desc: '15 generated query files covering all domain entities. SQL injection and type mismatch bugs are caught at compile time, not runtime. The database is the authority, not the code.' },
  { title: 'Zero-Budget Production Infrastructure', desc: 'Oracle Cloud free tier (4 OCPU, 24GB ARM), Coolify for orchestration, Supabase free tier for auth, Cloudflare R2 for storage. Production-grade deployment at near-zero operational cost.' },
];

const screenDescriptions = [
  { name: 'Trip List', desc: 'The home screen. Active, upcoming, and completed trips in one view with status badges showing each trip\'s phase \u2014 Planning, Active, or Settled.' },
  { name: 'Live Map', desc: 'Real-time location sharing across all members on Google Maps. Updates flow through WebSockets \u2014 no refresh required. Three privacy levels enforced at the database.' },
  { name: 'Chat', desc: 'Group messaging with typing indicators, read receipts, and instant delivery. Built on the same WebSocket infrastructure as every other real-time feature. Messages persist and replay on reconnection.' },
  { name: 'Expenses', desc: 'Track spending and split costs with per-item granularity. Smart splitting handles uneven distributions and subgroup charges. Every entry syncs instantly \u2014 the ledger is always current, always shared.' },
  { name: 'Invite', desc: 'Shareable links and direct invitations. New members inherit role-appropriate permissions the moment they accept. The matrix-based auth system configures access automatically based on trip phase and role.' },
];

export default function CaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <header className="section-dark pt-28 pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline mb-8"
            >
              ← Back to Portfolio
            </Link>
            <SectionLabel>case study</SectionLabel>
            <h1
              className="text-5xl md:text-7xl font-bold font-heading tracking-heading mt-4 mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {caseStudy.name}
            </h1>
            <p className="font-body text-xl md:text-2xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Group travel coordination, rebuilt from the ground up.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              {caseStudy.repoUrl && (
                <ExternalLink
                  href={caseStudy.repoUrl}
                  className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg-dark transition-all"
                >
                  View on GitHub
                </ExternalLink>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ═══ METRICS BAR ═══ */}
      <section className="border-b border-white/5 section-dark py-8">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div
            className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {metrics.map((m) => (
              <motion.div key={m.label} variants={fadeUp} className="text-center">
                <p className="font-heading text-2xl md:text-3xl font-bold text-accent">{m.value}</p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{m.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-6 block">the problem</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-heading mb-8" style={{ color: 'var(--text-primary)' }}>
              Five Apps, Three Time Zones, Zero Shared Context
            </h2>
            <div className="max-w-3xl space-y-5 font-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Every group trip starts the same way. Someone creates a WhatsApp group. Someone else shares a Google Sheet. A third person downloads Splitwise. Within 48 hours, the planning context is scattered across five apps, three time zones, and zero shared understanding.
              </p>
              <p>
                The failure mode is not a lack of tools — it is a surplus of disconnected ones. Conversations happen in one app. Budgets live in another. Location sharing requires a third. <strong>No single surface holds the full picture</strong>, and decisions stall because context is always somewhere else.
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-10">
            <h3 className="font-heading text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>Key challenges:</h3>
            <ul className="space-y-4 max-w-3xl">
              {[
                ['Fragmented tooling', 'Chat in WhatsApp, budgets in Splitwise, itineraries in Google Sheets, maps via shared links. Every tool holds a fragment; none holds the truth.'],
                ['Coordination across time zones', 'Asynchronous planning with no shared state means someone is always out of the loop.'],
                ['Expense opacity', 'Who paid for what, who owes whom, and how to split unevenly across subgroups is a recurring source of friction.'],
                ['No trip lifecycle', 'Existing tools treat a trip as a static document. In reality, a trip moves through phases: creation, invites, active planning, live coordination, and post-trip settlement.'],
                ['Permission complexity', 'Group dynamics are not flat. Admins, members, and guests need different levels of access \u2014 and those permissions shift as the trip evolves.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="mt-2 block h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <p className="font-body text-base" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{title}</strong> — {desc}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE VISION ═══ */}
      <section className="section-dark py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-6 block">the vision</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-heading mb-8" style={{ color: 'var(--text-primary)' }}>
              A Single Source of Truth for Every Trip
            </h2>
            <div className="max-w-3xl space-y-5 font-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                Not a booking engine. Not a social feed. Not another travel planner. A <strong>structured, real-time workspace</strong> where every participant sees the same trip state, at all times, from any time zone.
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-10">
            <h3 className="font-heading text-xl font-bold mb-5" style={{ color: 'var(--text-primary)' }}>The platform needed to:</h3>
            <ul className="space-y-3 max-w-3xl">
              {[
                'Manage the full trip lifecycle from creation through post-trip settlement',
                'Support real-time chat with typing indicators and read receipts',
                'Enable live location sharing with database-enforced privacy levels',
                'Track and split expenses with penny-perfect accuracy \u2014 no rounding errors',
                'Handle multi-party permissions across 9 resource types and 8 action types',
                'Ship cross-platform on iOS and Android from a single codebase',
                'Deliver sub-second updates for chat, location, and trip state changes',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-base" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ═══ APP SCREENS ═══ */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-6 block">the app</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-heading mb-4" style={{ color: 'var(--text-primary)' }}>
              Built for the Messy Reality of Group Travel
            </h2>
            <p className="font-body text-lg max-w-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
              A mobile-first experience across <strong>12 feature modules</strong> — from trip creation through settlement.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {allScreenshots.map((screen) => (
              <motion.div key={screen.label} variants={fadeUp} transition={{ duration: 0.5 }} className="text-center">
                <div className="app-screen-frame" style={{ width: '100%', transform: 'none' }}>
                  <img src={screen.src} alt={`NomadCrew ${screen.label} screen`} loading="lazy" />
                </div>
                <p className="font-heading text-sm font-bold mt-3" style={{ color: 'var(--text-primary)' }}>{screen.label}</p>
                <p className="font-body text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{screen.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section className="section-dark py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-6 block">the solution</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-heading mb-4" style={{ color: 'var(--text-primary)' }}>
              Every Technology Choice Serves a Constraint
            </h2>
            <p className="font-body text-lg max-w-3xl mb-12" style={{ color: 'var(--text-secondary)' }}>
              Two pillars: a <strong>Go backend</strong> optimized for concurrent, real-time workloads and a <strong>React Native + Expo</strong> client that ships to both platforms from one codebase. The architecture is deliberately opinionated.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedArchitecture />

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="space-y-4">
                {stackTable.map((row) => (
                  <motion.div
                    key={row.layer}
                    variants={fadeUp}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">{row.layer}</span>
                      <span className="font-heading text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{row.tech}</span>
                    </div>
                    <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>{row.why}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNICAL CHALLENGES ═══ */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-6 block">technical depth</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-heading mb-4" style={{ color: 'var(--text-primary)' }}>
              Hard Problems, Solved
            </h2>
            <p className="font-body text-lg max-w-3xl mb-12" style={{ color: 'var(--text-secondary)' }}>
              Group coordination is a fundamentally concurrent problem. These are the engineering decisions that made it work.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {challenges.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg border"
                style={{ borderColor: 'rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.02)' }}
              >
                <h3 className="font-heading text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WHAT MAKES IT DIFFERENT ═══ */}
      <section className="section-dark py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel className="mb-6 block">differentiators</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-heading mb-12" style={{ color: 'var(--text-primary)' }}>
              What Makes This Different
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-10 max-w-4xl" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              ['Matrix-based authorization, not flat RBAC', 'The permission model evaluates access across four dimensions \u2014 user identity, trip phase, resource type, and relationship context. An admin\u2019s permissions during planning differ from their permissions during an active trip, automatically.'],
              ['Real-time everything', 'Chat, location, expenses, and trip state all flow through the same WebSocket infrastructure. No polling. No stale reads. Every participant sees the same truth, at the same time.'],
              ['The planning phase is the product', 'Most travel apps focus on booking or during-trip features. NomadCrew treats the weeks of group coordination before departure as the primary use case \u2014 because that is where trips succeed or fail.'],
              ['Go for concurrency, not convention', 'The backend was built in Go because group coordination is a fundamentally concurrent problem. Goroutines and channels handle this naturally, without thread-management overhead.'],
            ].map(([title, desc]) => (
              <motion.div key={title} variants={fadeUp} transition={{ duration: 0.5 }}>
                <h3 className="font-heading text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h3>
                <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TAKEAWAY ═══ */}
      <section className="py-section">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-body text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              Not a chat app. Not a shared spreadsheet. Not another travel planner.
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-heading max-w-4xl mx-auto leading-tight" style={{ color: 'var(--text-primary)' }}>
              The best group trip is the one where nobody gets left behind — in the planning or on the ground.
            </h2>
            <div className="mt-12">
              {caseStudy.repoUrl && (
                <ExternalLink
                  href={caseStudy.repoUrl}
                  className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide px-6 py-3 rounded border border-accent text-accent hover:bg-accent hover:text-bg-dark transition-all"
                >
                  View on GitHub
                </ExternalLink>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-dark py-12">
        <div className="max-w-container mx-auto px-4 sm:px-5 lg:px-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline">
            ← Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
