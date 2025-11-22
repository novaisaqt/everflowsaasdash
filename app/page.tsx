// app/(marketing)/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Everflow Recruitment OS | Modern OS for Agencies',
};

export default function MarketingHome() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="relative overflow-hidden">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Recruitment OS • Multi-tenant SaaS
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Turn messy CVs and scattered pipelines
              <span className="block text-neutral-300">
                into a clean, automated recruitment OS.
              </span>
            </h1>
            <p className="text-sm md:text-base text-neutral-300 max-w-xl">
              Centralise candidates, clients, pipelines, CVs and follow-ups in
              one place. Built for lean recruitment teams who want less admin
              and more placements.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="px-6 py-3 rounded-xl bg-white text-black text-sm font-medium"
              >
                Start free workspace
              </Link>
              <Link
                href="#demo"
                className="px-6 py-3 rounded-xl border border-neutral-700 text-sm text-neutral-200"
              >
                Watch 3-min demo
              </Link>
            </div>
            <p className="text-xs text-neutral-500">
              No long-term contracts. We set up your first pipeline with you.
            </p>
          </div>

          <div className="flex-1">
            <div className="relative rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                <span>Pipeline overview</span>
                <span>Everflow Recruitment OS</span>
              </div>
              <div className="grid grid-cols-5 gap-3 text-xs">
                {['New', 'Screening', 'Interview', 'Offer', 'Placed'].map(
                  (stage, idx) => (
                    <div
                      key={stage}
                      className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-2 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium">{stage}</span>
                        <span className="text-[10px] text-neutral-500">
                          {idx * 3 + 2}
                        </span>
                      </div>
                      <div className="h-[70px] space-y-1">
                        <div className="h-5 rounded-xl bg-neutral-800/80" />
                        <div className="h-5 rounded-xl bg-neutral-800/50" />
                        <div className="h-5 rounded-xl bg-neutral-800/30" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-t border-neutral-900 bg-neutral-950/80">
          <div className="max-w-6xl mx-auto px-4 py-14 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                Everything your agency actually needs.
              </h2>
              <p className="text-sm text-neutral-400">
                No bloat. Just the workflows that move candidates and deals
                forward.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                title="Unified candidate hub"
                desc="CVs, contact details, notes and activity timeline in one place – not buried in inboxes or spreadsheets."
              />
              <FeatureCard
                title="Drag & drop pipeline"
                desc="See every role and candidate by stage. Move cards, trigger automations and never lose a warm candidate again."
              />
              <FeatureCard
                title="Automated follow-ups"
                desc="Nudge candidates and clients with pre-built SMS and email sequences. You choose the rules – we automate them."
              />
              <FeatureCard
                title="Multi-tenant workspaces"
                desc="Run multiple teams or brands from one platform. Role-based access for owners, admins and consultants."
              />
              <FeatureCard
                title="GHL & n8n ready"
                desc="Plug into your existing GoHighLevel setup and n8n automations to go from ‘tool’ to full operating system."
              />
              <FeatureCard
                title="Billing built-in"
                desc="Stripe subscriptions, plans and limits are already wired in so you can sell this as your own SaaS."
              />
            </div>
          </div>
        </section>

        {/* PRICING TEASER */}
        <section id="pricing" className="border-t border-neutral-900 bg-neutral-950">
          <div className="max-w-6xl mx-auto px-4 py-14 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Simple plans.</h2>
              <p className="text-sm text-neutral-400">
                Start lean. Upgrade when the team and usage grows.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <PlanCard
                label="Starter"
                price="£97/m"
                highlight={false}
                features={[
                  '1 workspace',
                  'Up to 5 users',
                  'Core pipeline & CRM',
                  'Basic automations',
                ]}
              />
              <PlanCard
                label="Growth"
                price="£197/m"
                highlight={true}
                features={[
                  '3 workspaces',
                  'Unlimited users',
                  'Advanced automations',
                  'Priority support',
                ]}
              />
              <PlanCard
                label="Scale"
                price="£497/m"
                highlight={false}
                features={[
                  'Unlimited workspaces',
                  'Custom integrations',
                  'Done-for-you setup',
                  'Dedicated contact',
                ]}
              />
            </div>
          </div>
        </section>

        {/* DEMO CTA */}
        <section
          id="demo"
          className="border-t border-neutral-900 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950"
        >
          <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-semibold">
                See your pipeline inside the OS.
              </h2>
              <p className="text-sm text-neutral-300">
                Send us your current stages and a small sample of roles/candidates. We’ll
                load them into a private workspace and walk you through it live.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="https://calendly.com"
                target="_blank"
                className="px-6 py-3 rounded-xl bg-white text-black text-sm font-medium text-center"
              >
                Book a 15-min demo
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-3 rounded-xl border border-neutral-700 text-sm text-neutral-200 text-center"
              >
                Or start a workspace yourself
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-neutral-900 bg-neutral-950">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <span>© {new Date().getFullYear()} Everflow Recruitment OS</span>
            <div className="flex gap-4">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/consent">Consent</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-neutral-400">{desc}</p>
    </div>
  );
}

function PlanCard({
  label,
  price,
  features,
  highlight,
}: {
  label: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 space-y-3 ${
        highlight
          ? 'border-neutral-200 bg-neutral-900'
          : 'border-neutral-800 bg-neutral-950/80'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {highlight && (
          <span className="text-[10px] px-2 py-1 rounded-full bg-neutral-100 text-black">
            Most popular
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold">{price}</div>
      <ul className="text-xs text-neutral-300 space-y-1">
        {features.map((f) => (
          <li key={f}>• {f}</li>
        ))}
      </ul>
      <Link
        href="/sign-up"
        className="inline-flex mt-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-medium"
      >
        Start with {label}
      </Link>
    </div>
  );
}
