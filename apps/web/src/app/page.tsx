"use client";

import { useCallback, useState } from 'react';

import Link from 'next/link';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowRight, Copy, Layers3, Palette, ShieldCheck, Sparkles } from 'lucide-react';

import { BadgeCard } from '@/components/BadgeCard';
import { BadgeEditor } from '@/components/BadgeEditor';
import { BadgeGallery } from '@/components/BadgeGallery';
import { Button } from '@/components/ui/button';
import { seedBadges } from '@/data/seedBadges';
import type { Badge } from '@/types/badge';

interface RemixData {
  badge: Badge;
  cardRect: DOMRect;
}

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const featureCards = [
  {
    title: 'Intentional asymmetry',
    description:
      'The copy stack sits low and left while the live preview carries the right side. The page feels composed, not centered-by-default.',
    icon: Layers3,
  },
  {
    title: 'Real interactions',
    description:
      'Open the editor, remix a badge from the gallery, and copy SVG, Markdown, or HTML without leaving the page.',
    icon: Sparkles,
  },
  {
    title: 'Warm palette discipline',
    description:
      'The interface is built from parchment and blush rather than gray-on-gray or purple gradients, which gives the brand a distinct temperature.',
    icon: Palette,
  },
];

const workflowSteps = [
  {
    title: 'Pick a starting point',
    description: 'Browse a grid of production-ready badges and open any one in the remix editor.',
  },
  {
    title: 'Adjust in context',
    description: 'See the card geometry before the editor opens, so every change feels grounded in the actual badge surface.',
  },
  {
    title: 'Publish everywhere',
    description: 'Copy the exact output you need for READMEs, docs, landing pages, and changelogs.',
  },
];

export default function Home() {
  const [remixData, setRemixData] = useState<RemixData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const featuredBadge = seedBadges[6];
  const supportingBadges = [seedBadges[0], seedBadges[4]];

  const handleRemix = (badge: Badge, cardRect: DOMRect) => {
    setRemixData({
      badge: { ...badge, id: `remix-${Date.now()}` },
      cardRect,
    });
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setTimeout(() => setRemixData(null), 500);
  };

  const handleUpdateBadge = useCallback((updated: Badge) => {
    setRemixData((prev) => prev ? { ...prev, badge: updated } : null);
  }, []);

  const date = new Date();
  const year = date.getFullYear();

  const scrollToGallery = useCallback(() => {
    document.getElementById('gallery')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#efece0_0%,#edede2_34%,#e9e0d9_100%)] text-foreground">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute left-[-7rem] top-[-5rem] h-80 w-80 rounded-full bg-[#ebbdd3]/28 blur-3xl" />
        <div className="absolute right-[-6rem] top-20 h-96 w-96 rounded-full bg-[#d8ccc1]/28 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-[18%] h-80 w-80 rounded-full bg-[#f7f2e8]/60 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(45,35,38,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,35,38,0.055)_1px,transparent_1px)] bg-[size:30px_30px] opacity-35" />
      </div>
      
      <main className="relative overflow-hidden">
        <section className="px-4 pb-14 pt-8 sm:pb-18 sm:pt-12 lg:pb-20 lg:pt-14">
          <div className="mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="show"
              className="min-w-0 pt-4 sm:pt-6 lg:pt-10"
            >
              <motion.div variants={cardVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b98ea0]/35 bg-[#f7f2e8]/82 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-[#7a5b66] shadow-[0_10px_30px_rgba(45,35,38,0.06)] backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#ebbdd3]" />
                Editorial badge studio
              </motion.div>

              <motion.h1
                variants={cardVariants}
                className="max-w-4xl font-serif text-[clamp(3.1rem,8vw,6.6rem)] leading-[0.94] tracking-[-0.055em] text-balance text-[#2d2326]"
              >
                Badge design for teams that want the README to feel like a product surface.
              </motion.h1>

              <motion.p
                variants={cardVariants}
                className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#64565a] sm:text-lg"
              >
                Peakmark turns a small piece of metadata into a polished system: pick a preset, remix it in context, and ship the exact SVG, Markdown, or HTML you need without breaking flow.
              </motion.p>

              <motion.div variants={cardVariants} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  render={<Link href="/editor" />}
                  className="h-12 w-full rounded-full bg-[#946174] px-6 text-sm font-semibold text-[#fff8f1] shadow-[0_18px_40px_rgba(148,97,116,0.24)] transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Open the editor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-[#cabdb0] bg-[#f7f2e8]/70 px-6 text-sm font-semibold text-[#2d2326] shadow-none transition-colors hover:bg-[#f0e6de] sm:w-auto"
                  onClick={scrollToGallery}
                >
                  Browse presets
                </Button>
              </motion.div>

              <motion.div variants={cardVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: 'Clipboard-ready',
                    value: 'SVG / MD / HTML',
                    detail: 'Every export path is built for copy-and-paste delivery.',
                    icon: Copy,
                  },
                  {
                    label: 'Remix flow',
                    value: 'One click',
                    detail: 'Open the badge editor from any gallery card.',
                    icon: Sparkles,
                  },
                  {
                    label: 'Theme discipline',
                    value: 'Warm neutral',
                    detail: 'Parchment base with a blush accent keeps the product distinct.',
                    icon: ShieldCheck,
                  },
                ].map((item) => (
                  <div key={item.label} className="min-w-0 rounded-[1.5rem] border border-[#d8ccc1] bg-[#f7f2e8]/75 p-4 shadow-[0_14px_36px_rgba(45,35,38,0.06)] backdrop-blur-md">
                    <div className="flex items-center gap-2 text-[#7a5b66]">
                      <item.icon className="h-4 w-4" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{item.label}</span>
                    </div>
                    <p className="mt-3 font-serif text-xl tracking-[-0.03em] text-[#2d2326]">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[#64565a]">{item.detail}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              className="relative min-w-0 pt-2 lg:pt-0"
            >
              <div className="absolute -left-4 top-10 hidden h-36 w-36 rounded-full bg-[#ebbdd3]/30 blur-3xl lg:block" aria-hidden="true" />
              <div className="absolute -right-4 top-28 hidden h-44 w-44 rounded-full bg-[#d9cec3]/45 blur-3xl lg:block" aria-hidden="true" />

              <div className="relative mx-auto max-w-[42rem]">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-2 top-16 z-0 hidden w-56 -rotate-6 rounded-[1.7rem] border border-[#d8ccc1] bg-[#f7f2e8]/75 p-4 shadow-[0_20px_60px_rgba(45,35,38,0.12)] backdrop-blur-xl lg:block"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8a7077]">Copy surface</p>
                  <p className="mt-3 font-serif text-2xl leading-tight tracking-[-0.04em] text-[#2d2326]">Copy actions are visible, immediate, and honest.</p>
                  <p className="mt-2 text-sm leading-6 text-[#64565a]">The badge card exposes clipboard paths instead of hiding them behind generic controls.</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute -right-4 top-36 z-0 hidden w-60 rotate-6 rounded-[1.7rem] border border-[#d8ccc1] bg-[#f7f2e8]/80 p-4 shadow-[0_22px_64px_rgba(45,35,38,0.12)] backdrop-blur-xl lg:block"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8a7077]">Workflow</p>
                  <div className="mt-3 space-y-3">
                    {workflowSteps.slice(0, 2).map((step, index) => (
                      <div key={step.title} className="flex gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ebbdd3]/55 text-xs font-semibold text-[#2d2326]">
                          {index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#2d2326]">{step.title}</p>
                          <p className="mt-1 text-sm leading-6 text-[#64565a]">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="relative rounded-[2.2rem] border border-[#d8ccc1] bg-[rgba(247,242,232,0.84)] p-4 shadow-[0_34px_90px_rgba(45,35,38,0.14)] backdrop-blur-xl sm:p-5 lg:p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a7077]">Live preview</p>
                      <p className="mt-2 font-serif text-3xl leading-[0.96] tracking-[-0.05em] text-[#2d2326]">A badge desk, not a static screenshot.</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center rounded-full border border-[#cabdb0] bg-[#f0e6de] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d555e]">
                      Remix ready
                    </span>
                  </div>

                  <div className="relative min-w-0">
                    <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full border border-[#ebbdd3]/70 bg-[#f7f2e8]" aria-hidden="true" />
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      className="min-w-0"
                    >
                      <BadgeCard badge={featuredBadge} onRemix={handleRemix} />
                    </motion.div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {supportingBadges.map((badge, index) => (
                      <div key={badge.id} className="rounded-[1.35rem] border border-[#d8ccc1] bg-[#f7f2e8]/80 p-3 shadow-[0_14px_34px_rgba(45,35,38,0.06)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8a7077]">{index === 0 ? 'Preset library' : 'Gallery surface'}</p>
                        <p className="mt-2 font-serif text-lg tracking-[-0.03em] text-[#2d2326]">{badge.label} / {badge.message}</p>
                        <p className="mt-1 text-sm leading-6 text-[#64565a]">Click any card in the gallery to remap this exact interaction to a new badge.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="gallery" className="px-4 py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
            >
              <div className="min-w-0 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a7077]">Badge collection</p>
                <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.05em] text-[#2d2326] text-balance">
                  Gallery cards that double as launch points.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-[#64565a] lg:justify-self-end">
                Hover a badge to copy the output you need, or open the remix flow when the card already looks close to the final shape.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <BadgeGallery onRemix={handleRemix} />
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-18 lg:py-20">
          <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-[#d8ccc1] bg-[linear-gradient(135deg,rgba(247,242,232,0.9),rgba(235,189,211,0.18))] p-6 shadow-[0_24px_80px_rgba(45,35,38,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a7077]">Why it works</p>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[0.98] tracking-[-0.05em] text-[#2d2326] text-balance">
                  A product surface that behaves like the interface people already trust.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#64565a]">
                  The system is built to be immediately usable: each interactive element does something visible, each state is intentional, and the visual language stays cohesive from hero to footer.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {featureCards.map((feature) => (
                  <motion.article
                    key={feature.title}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45 }}
                    className="min-w-0 rounded-[1.5rem] border border-[#d8ccc1] bg-[#f7f2e8]/86 p-5 shadow-[0_14px_36px_rgba(45,35,38,0.06)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ebbdd3]/55 text-[#2d2326]">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.04em] text-[#2d2326]">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#64565a]">{feature.description}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-6 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-[#d8ccc1] bg-[#f7f2e8]/86 p-6 shadow-[0_26px_80px_rgba(45,35,38,0.09)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a7077]">Ship it</p>
                <h2 className="mt-3 font-serif text-[clamp(2.1rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.05em] text-[#2d2326] text-balance">
                  Turn a badge into a branded moment in one session.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#64565a]">
                  The editor opens on top of the live preview, so the flow stays grounded. You can keep iterating in place without losing the geometry of the original card.
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-start lg:justify-end">
                <Button
                  render={<Link href="/editor" />}
                  className="h-12 w-full rounded-full bg-[#946174] px-6 text-sm font-semibold text-[#fff8f1] shadow-[0_18px_40px_rgba(148,97,116,0.24)] transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Open the editor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-[#cabdb0] bg-transparent px-6 text-sm font-semibold text-[#2d2326] transition-colors hover:bg-[#f0e6de] sm:w-auto"
                  onClick={scrollToGallery}
                >
                  Back to the gallery
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative px-4 pb-10 pt-2 sm:pb-12">
        <div className="mx-auto max-w-7xl border-t border-[#d8ccc1] pt-6">
          <div className="flex flex-col gap-4 text-sm text-[#6f5f64] sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} Peakmark. Built for developers who want badge surfaces to feel deliberate.
            </p>
            <a
              href="https://github.com/SinghAman21/peakmark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#cabdb0] bg-[#f7f2e8]/80 px-4 py-2 text-[#2d2326] transition-colors hover:bg-[#f0e6de] sm:self-auto"
            >
              View source
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isEditorOpen && remixData && (
          <BadgeEditor
            badge={remixData.badge}
            isOpen={isEditorOpen}
            onClose={handleCloseEditor}
            onUpdate={handleUpdateBadge}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

