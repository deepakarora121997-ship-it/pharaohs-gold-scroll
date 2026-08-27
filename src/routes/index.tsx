import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import doorImg from "@/assets/temple-door.jpg";
import ornament from "@/assets/ornament.png";
import pyramidsSunset from "@/assets/pyramids-sunset.jpg";
import pyramidsNight from "@/assets/pyramids-night.jpg";
import story1 from "@/assets/story-1-hd.jpg";
import story2Asset from "@/assets/story-2.png.asset.json";
const story2 = story2Asset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waleed & Irinka · 12 September 2026 · Wedding Invitation" },
      {
        name: "description",
        content:
          "Waleed & Irinka request the honour of your presence at their wedding ceremony — 12 September 2026 at 5:00 PM. An Egyptian royal invitation experience.",
      },
      { property: "og:title", content: "Waleed & Irinka · Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with their families, they invite you to celebrate the beginning of their forever. 12 September 2026 • 5:00 PM.",
      },
    ],
  }),
  component: Invitation,
});

const WEDDING = new Date("2026-09-12T17:00:00+02:00");
const GLYPHS = "𓂀 𓆣 𓋹 𓊹 𓎛 𓆤 𓁷 𓏏 𓍜 𓐍";

function Ornament({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <img
      src={ornament}
      alt=""
      aria-hidden
      loading="lazy"
      width={1152}
      height={576}
      className={`mx-auto w-56 opacity-90 animate-glow-pulse sm:w-72 ${
        flip ? "rotate-180" : ""
      } ${className}`}
    />
  );
}

function GlyphStrip() {
  return (
    <p
      aria-hidden
      className="hieroglyph-strip animate-sway select-none text-center text-xs sm:text-sm"
    >
      {GLYPHS}
    </p>
  );
}

/* ---------------- Doors ---------------- */

function Doors({ onOpen, opened }: { onOpen: () => void; opened: boolean }) {
  const [entering, setEntering] = useState(false);

  const handle = () => {
    setEntering(true);
    window.setTimeout(onOpen, 2600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-1000 ${
        opened ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0">
        <img
          src={pyramidsSunset}
          alt="Pyramids at sunset"
          width={1920}
          height={1088}
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, transparent 20%, color-mix(in oklab, var(--ink) 85%, transparent) 78%)",
          }}
        />
        <Particles count={34} />
      </div>

      {/* revealed behind the doors */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <div
          className={`transition-all delay-500 duration-[1600ms] ${
            entering ? "scale-100 opacity-100 blur-0" : "scale-95 opacity-0 blur-[2px]"
          }`}
        >
          <GlyphStrip />
          <h1 className="mt-6 text-4xl leading-tight text-gold-plate sm:text-6xl md:text-7xl">
            WALEED
            <span className="mx-3 font-body text-2xl italic text-gold sm:text-4xl">&</span>
            IRINKA
          </h1>
          <div className="gold-rule mx-auto mt-6 w-40 sm:w-64" />
          <p className="mx-auto mt-6 max-w-md font-body text-base tracking-[0.2em] text-ivory/85 uppercase sm:text-lg">
            Request the honour of your presence at their Wedding Ceremony
          </p>
        </div>
      </div>

      {/* invitation seal in front of the doors */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
          entering ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-display text-xs tracking-[0.5em] text-gold/90 uppercase sm:text-sm">
          Waleed <span className="font-body italic">&</span> Irinka
        </p>
        <button
          onClick={handle}
          disabled={entering}
          className="mt-6 inline-flex items-center gap-3 rounded-sm border border-gold/70 px-8 py-4 font-display text-xs tracking-[0.35em] text-ink uppercase shadow-[var(--shadow-gold)] transition-transform duration-500 hover:scale-105 sm:text-sm"
          style={{ background: "var(--gradient-gold)", backgroundSize: "200% 100%" }}
        >
          Open Invitation
          <span aria-hidden className="text-base">
            𓋹
          </span>
        </button>
      </div>


      {/* the two golden doors */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`absolute top-0 h-full w-1/2 ${side === "left" ? "left-0" : "right-0"} ${
            entering ? (side === "left" ? "animate-door-left" : "animate-door-right") : ""
          }`}
          style={{
            transformOrigin: side === "left" ? "left center" : "right center",
            backfaceVisibility: "hidden",
          }}
        >

          <div className="relative h-full w-full overflow-hidden">
            <img
              src={doorImg}
              alt=""
              aria-hidden
              width={960}
              height={1440}
              className="h-full w-full object-cover"
              style={{
                objectPosition: side === "left" ? "right center" : "left center",
                transform: side === "left" ? undefined : "scaleX(-1)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  side === "left"
                    ? "linear-gradient(90deg, oklch(0.1 0.03 265 / 55%), transparent 55%, oklch(0.1 0.03 265 / 70%))"
                    : "linear-gradient(270deg, oklch(0.1 0.03 265 / 55%), transparent 55%, oklch(0.1 0.03 265 / 70%))",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Countdown ---------------- */

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
    const s = Math.floor(diff / 1000);
    return [
      { label: "Days", value: Math.floor(s / 86400) },
      { label: "Hours", value: Math.floor((s % 86400) / 3600) },
      { label: "Minutes", value: Math.floor((s % 3600) / 60) },
      { label: "Seconds", value: s % 60 },
    ];
  }, [now]);
}

function Countdown() {
  const parts = useCountdown();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {parts.map((p) => (
        <div
          key={p.label}
          className="frame-gold relative bg-card/60 px-4 py-6 backdrop-blur-sm sm:py-8"
        >
          <div className="font-display text-3xl text-gold-plate sm:text-5xl">
            {String(p.value).padStart(2, "0")}
          </div>
          <div className="mt-2 font-body text-[0.65rem] tracking-[0.35em] text-ivory/70 uppercase sm:text-xs">
            {p.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- RSVP ---------------- */

function Rsvp() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", guests: "1", attending: "yes", note: "" });

  if (done) {
    return (
      <div className="frame-gold mx-auto max-w-xl bg-card/60 px-6 py-10 text-center backdrop-blur-sm">
        <Ornament className="w-40 sm:w-48" />
        <p className="mt-4 font-display text-xl text-gold-plate">Thank you, {done}</p>
        <p className="mt-3 font-body text-ivory/75">
          Your response has been sealed with the royal scarab. We cannot wait to celebrate with you.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 rounded-sm border border-gold/70 px-10 py-4 font-display text-xs tracking-[0.35em] text-ink uppercase shadow-[var(--shadow-gold)] transition-transform duration-500 hover:scale-105 sm:text-sm"
          style={{ background: "var(--gradient-gold)", backgroundSize: "200% 100%" }}
        >
          RSVP Now <span aria-hidden>𓂀</span>
        </button>
      )}

      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(form.name.trim() || "Honoured Guest");
          }}
          className="frame-gold mx-auto mt-2 grid max-w-xl gap-5 bg-card/60 p-6 text-left backdrop-blur-sm sm:p-8"
        >
          <label className="grid gap-2">
            <span className="font-body text-[0.7rem] tracking-[0.3em] text-gold uppercase">
              Full name
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-input bg-ink/40 px-4 py-3 font-body text-ivory outline-none transition focus:border-gold focus:ring-1 focus:ring-ring"
              placeholder="Your name"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-body text-[0.7rem] tracking-[0.3em] text-gold uppercase">
                Guests
              </span>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="border border-input bg-ink/40 px-4 py-3 font-body text-ivory outline-none focus:border-gold"
              >
                {["1", "2", "3", "4", "5+"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="font-body text-[0.7rem] tracking-[0.3em] text-gold uppercase">
                Attending
              </span>
              <select
                value={form.attending}
                onChange={(e) => setForm({ ...form, attending: e.target.value })}
                className="border border-input bg-ink/40 px-4 py-3 font-body text-ivory outline-none focus:border-gold"
              >
                <option value="yes">Joyfully accepts</option>
                <option value="no">Regretfully declines</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2">
            <span className="font-body text-[0.7rem] tracking-[0.3em] text-gold uppercase">
              A blessing for the couple
            </span>
            <textarea
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="border border-input bg-ink/40 px-4 py-3 font-body text-ivory outline-none focus:border-gold"
              placeholder="Optional"
            />
          </label>

          <button
            type="submit"
            className="mt-1 rounded-sm border border-gold/70 px-8 py-4 font-display text-xs tracking-[0.35em] text-ink uppercase transition-transform duration-500 hover:scale-[1.03]"
            style={{ background: "var(--gradient-gold)", backgroundSize: "200% 100%" }}
          >
            Seal my response
          </button>
        </form>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-2xl text-gold-plate sm:text-4xl">{children}</h2>
  );
}

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <main className="relative">
      <Doors onOpen={() => setOpened(true)} opened={opened} />

      <div
        ref={contentRef}
        className={`transition-opacity duration-1000 ${opened ? "opacity-100" : "opacity-0"}`}
      >
        {/* Welcome */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
          <img
            src={pyramidsSunset}
            alt="Golden pyramids glowing at sunset"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-[120%] w-full object-cover"
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          />
          <div className="absolute inset-0 bg-ink/65" />
          <Particles count={26} />
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <GlyphStrip />
              <Ornament className="mt-6" />
              <p className="mt-6 font-body text-xs tracking-[0.5em] text-sand uppercase">
                The royal union of
              </p>
              <h1 className="mt-4 text-4xl leading-tight text-gold-plate sm:text-6xl">
                WALEED <span className="font-body italic">&</span> IRINKA
              </h1>
              <div className="gold-rule mx-auto mt-6 w-48" />
              <p className="mt-6 font-body text-lg text-ivory/85 sm:text-xl">
                Two hearts, blessed beneath the eternal sun, beginning a story written in gold.
              </p>
              <Ornament flip className="mt-8" />
            </Reveal>
          </div>
        </section>

        {/* Save the date */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "var(--gradient-gold)" }}
          />
          <Particles count={16} />
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="font-body text-xs tracking-[0.5em] text-gold uppercase">
                Save the date
              </p>
              <div className="mt-8 flex items-center justify-center gap-4 font-display text-5xl text-gold-plate sm:gap-8 sm:text-8xl">
                <span>12</span>
                <span className="text-gold/60">•</span>
                <span>09</span>
                <span className="text-gold/60">•</span>
                <span>2026</span>
              </div>
              <div className="gold-rule mx-auto mt-8 w-56" />
              <p className="mt-6 font-body text-lg tracking-[0.2em] text-ivory/75 uppercase">
                Saturday · Five o'clock in the evening
              </p>
            </Reveal>
          </div>
        </section>

        {/* Ceremony */}
        <section className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="frame-gold relative bg-card/50 px-6 py-14 text-center backdrop-blur-sm sm:px-14">
                <Ornament className="w-44 sm:w-56" />
                <SectionTitle>Wedding Ceremony</SectionTitle>
                <p className="mt-8 font-display text-2xl text-ivory sm:text-4xl">
                  12 September 2026
                </p>
                <p className="mt-3 font-body text-xl tracking-[0.3em] text-gold sm:text-2xl">
                  5:00 PM
                </p>
                <p className="mx-auto mt-8 max-w-md font-body text-ivory/70">
                  Beneath golden lanterns and desert stars, we ask you to stand with us as vows are
                  spoken.
                </p>
                <GlyphStrip />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative overflow-hidden px-6 py-20 sm:py-28">
          <Particles count={14} />
          <div className="relative mx-auto max-w-4xl">
            <Reveal>
              <SectionTitle>Counting the Sunrises</SectionTitle>
              <div className="gold-rule mx-auto mt-6 mb-12 w-40" />
              <Countdown />
            </Reveal>
          </div>
        </section>

        {/* Love story */}
        <section className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionTitle>Our Story</SectionTitle>
              <div className="gold-rule mx-auto mt-6 w-40" />
            </Reveal>
            <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10">
              {[
                {
                  img: story1,
                  title: "Where It Began",
                  text: "A chance meeting, a shared glance across a golden evening — and everything changed.",
                },
                {
                  img: story2,
                  title: "The Promise",
                  text: "Hand in hand through desert light, they chose forever beside the temples of old.",
                },
              ].map((s, i) => (
                <Reveal key={s.title} delay={i * 180}>
                  <figure className="group">
                    <div className="frame-gold overflow-hidden">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        width={1024}
                        height={1280}
                        className="h-[26rem] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105 sm:h-[30rem]"
                      />
                    </div>
                    <figcaption className="mt-6 text-center">
                      <h3 className="font-display text-lg text-gold sm:text-xl">{s.title}</h3>
                      <p className="mt-3 font-body text-ivory/75">{s.text}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="relative overflow-hidden px-6 py-20 sm:py-28">
          <Particles count={12} />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <SectionTitle>Kindly Respond</SectionTitle>
              <div className="gold-rule mx-auto mt-6 mb-10 w-40" />
              <Rsvp />
            </Reveal>
          </div>
        </section>

        {/* Final */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
          <img
            src={pyramidsNight}
            alt="Pyramids at night beneath the stars with golden lights"
            loading="lazy"
            width={1920}
            height={1088}
            className="absolute inset-0 h-[125%] w-full object-cover"
            style={{ transform: `translateY(${Math.min(0, (scrollY - 2400) * -0.06)}px)` }}
          />
          <div className="absolute inset-0 bg-ink/55" />
          <Particles count={30} />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <Ornament />
              <h2 className="mt-6 text-3xl leading-tight text-gold-plate sm:text-5xl">
                WALEED <span className="font-body italic">&</span> IRINKA
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-body text-lg text-ivory/85 sm:text-xl">
                Together with their families invite you to celebrate the beginning of their forever.
              </p>
              <div className="gold-rule mx-auto mt-8 w-40" />
              <p className="mt-6 font-display text-sm tracking-[0.35em] text-gold sm:text-base">
                12 SEPTEMBER 2026 • 5:00 PM
              </p>
              <GlyphStrip />
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
