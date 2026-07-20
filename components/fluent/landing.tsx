import Link from "next/link"
import { BrandMark, HandIcon, MicIcon, ArrowIcon, CheckIcon, PlayIcon, SpeakerIcon, VideoIcon } from "./icons"

const FEATURES = [
  {
    icon: HandIcon,
    title: "On-device hand tracking",
    body: "MediaPipe reads your signs frame by frame. Your camera stream never leaves the browser — nothing is uploaded.",
  },
  {
    icon: MicIcon,
    title: "Speech in, signs out",
    body: "Speak or type English and a 3D avatar signs it back in real time, fingerspelling anything outside its vocabulary.",
  },
  {
    icon: SpeakerIcon,
    title: "Signs in, speech out",
    body: "Translated lines land in your transcript with one-tap audio playback, so hearing users follow along instantly.",
  },
]

const STEPS = [
  { n: "01", title: "Start a session", body: "Open the studio and wake the 3D signer — no install, no account." },
  { n: "02", title: "Type or speak", body: "Enter English text or talk. SignFlow maps each word to a lexical sign or fingerspells it." },
  { n: "03", title: "Watch it sign", body: "The avatar signs live while your transcript builds line by line beside the stage." },
]

const STATS = [
  { n: "0", unit: "ms", k: "upload latency — runs in-browser" },
  { n: "100", unit: "%", k: "on-device, private by default" },
  { n: "2", unit: "-way", k: "sign ↔ speech translation" },
]

export function Landing() {
  return (
    <div className="mx-auto max-w-[1220px] px-[clamp(18px,3vw,34px)] py-[clamp(18px,3vw,34px)]">
      {/* nav */}
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-line pb-[22px]">
        <div className="flex items-center gap-3">
          <div className="shadow-soft grid size-[38px] flex-none place-items-center rounded-[11px] bg-ink text-paper">
            <BrandMark className="size-[22px]" />
          </div>
          <div>
            <div className="font-display text-[1.32rem] font-bold leading-none tracking-[-0.03em]">SignFlow</div>
            <div className="mt-0.5 text-[0.78rem] text-ink-faint">Real-time sign &harr; speech interpreter</div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <a href="#features" className="rounded-full px-3.5 py-2 text-[0.85rem] font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink">
            Features
          </a>
          <a href="#how" className="rounded-full px-3.5 py-2 text-[0.85rem] font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink">
            How it works
          </a>
          <Link
            href="/demo"
            className="shadow-soft inline-flex items-center gap-2 rounded-full bg-coral px-[18px] py-2.5 text-[0.88rem] font-semibold text-white transition-colors hover:bg-coral-deep"
          >
            <PlayIcon className="size-[15px]" />
            Try the demo
          </Link>
        </nav>
      </header>

      {/* hero */}
      <section className="mt-[clamp(40px,7vw,84px)]">
        <div className="max-w-[68ch]">
          <span className="inline-flex items-center gap-2 rounded-full bg-coral-wash px-[13px] py-1.5 text-[0.75rem] font-semibold tracking-[0.03em] text-coral-deep">
            <span className="size-2 rounded-full animate-fluent-pulse bg-coral" aria-hidden="true" />
            Live in your browser
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4rem)] font-bold text-ink text-balance">
            Sign language, translated in real time.
          </h1>
          <p className="mt-5 max-w-[54ch] text-[clamp(1.02rem,1.6vw,1.18rem)] leading-[1.55] text-ink-soft text-pretty">
            SignFlow turns speech into signs and signs into speech — instantly, on-device. A 3D avatar signs what you
            say, and your camera never leaves the browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-[9px] rounded-full bg-coral px-7 py-[13px] text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-coral-deep active:translate-y-0"
              style={{ boxShadow: "0 8px 22px oklch(63% 0.2 28 / 0.4)" }}
            >
              <PlayIcon className="size-[18px]" />
              Launch the studio
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-[13px] text-[0.95rem] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              See how it works
              <ArrowIcon className="size-[16px]" />
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-ink-soft">
            {["No install", "No account", "Fully private"].map((f) => (
              <li key={f} className="inline-flex items-center gap-1.5">
                <CheckIcon className="size-4 text-ok" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* features */}
      <section id="features" className="mt-[clamp(56px,9vw,110px)] scroll-mt-6">
        <div className="max-w-[52ch]">
          <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink">Built for both sides of the conversation.</h2>
          <p className="mt-3 text-[1.02rem] leading-[1.55] text-ink-soft text-pretty">
            Two-way translation that keeps everything on your device — the same engine that powers the live studio.
          </p>
        </div>

        <div className="mt-9 grid gap-[22px] md:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="shadow-soft flex flex-col rounded-lg border border-line bg-surface p-6">
              <span className="grid size-[46px] flex-none place-items-center rounded-[13px] bg-coral-wash text-coral-deep">
                <f.icon className="size-[24px]" />
              </span>
              <h3 className="mt-4 text-[1.12rem] tracking-[-0.01em] text-ink">{f.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-[1.55] text-ink-soft text-pretty">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mt-[clamp(56px,9vw,110px)] scroll-mt-6">
        <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] text-ink">Three steps to your first translation.</h2>
        <div className="mt-9 grid gap-[22px] md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-lg border border-line-soft bg-surface-2 p-6">
              <div className="font-display text-[1.55rem] font-bold tracking-[-0.02em] tabular-nums text-coral">{s.n}</div>
              <h3 className="mt-2 text-[1.1rem] tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-[1.55] text-ink-soft text-pretty">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* stats */}
      <section className="mt-[clamp(48px,7vw,88px)] flex flex-wrap items-baseline gap-x-[clamp(20px,5vw,60px)] gap-y-4 border-t border-line pt-8">
        {STATS.map((s) => (
          <div key={s.k}>
            <div className="font-display text-[1.55rem] font-bold tracking-[-0.02em] tabular-nums text-ink">
              {s.n}
              <span className="text-base">{s.unit}</span>
            </div>
            <div className="mt-px text-[0.8rem] text-ink-faint">{s.k}</div>
          </div>
        ))}
        <p className="ml-auto max-w-[34ch] self-center text-[0.8rem] text-ink-faint">
          Known words use lexical signs; anything else is fingerspelled letter by letter.
        </p>
      </section>

      {/* cta */}
      <section className="mt-[clamp(48px,7vw,88px)]">
        <div
          className="shadow-stage relative overflow-hidden rounded-lg bg-stage px-[clamp(24px,5vw,64px)] py-[clamp(36px,6vw,64px)] text-center"
          style={{ background: "radial-gradient(ellipse 120% 100% at 50% 20%, oklch(30% 0.03 285), oklch(21% 0.028 285))" }}
        >
          <div
            className="mx-auto mb-5 grid size-[66px] place-items-center rounded-[20px] border border-[oklch(100%_0_0_/_0.09)] bg-[oklch(100%_0_0_/_0.06)] text-white"
          >
            <VideoIcon className="size-[34px]" />
          </div>
          <h2 className="mx-auto max-w-[22ch] text-[clamp(1.7rem,3.6vw,2.5rem)] text-white">Start translating in seconds.</h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[0.95rem] text-[oklch(74%_0.02_285)] text-pretty">
            No downloads. No sign-up. Open the studio and the 3D signer is ready to go.
          </p>
          <Link
            href="/demo"
            className="mt-7 inline-flex items-center gap-[9px] rounded-full bg-coral px-7 py-[13px] text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-coral-deep active:translate-y-0"
            style={{ boxShadow: "0 8px 22px oklch(63% 0.2 28 / 0.4)" }}
          >
            <PlayIcon className="size-[18px]" />
            Launch the studio
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer className="mt-[clamp(40px,6vw,72px)] flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[0.82rem] text-ink-faint">
        <div className="flex items-center gap-2.5">
          <div className="grid size-7 flex-none place-items-center rounded-[8px] bg-ink text-paper">
            <BrandMark className="size-[15px]" />
          </div>
          <span className="font-display font-semibold text-ink">SignFlow</span>
        </div>
        <p>Runs entirely in your browser &middot; Real-time sign &harr; speech interpreter</p>
      </footer>
    </div>
  )
}
