"use client";

import { useState, useCallback } from 'react';
import { AnimatePresence, motion, easeInOut } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { BadgeGallery } from '@/components/BadgeGallery';
import { BadgeEditor } from '@/components/BadgeEditor';
import type { Badge } from '@/types/badge';
import { Github, Sparkles, Palette, Link2, Zap } from 'lucide-react';

interface RemixData {
  badge: Badge;
  cardRect: DOMRect;
}

export default function Home() {
  const [remixData, setRemixData] = useState<RemixData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleRemix = (badge: Badge, cardRect: DOMRect) => {
    setRemixData({ 
      badge: { ...badge, id: `remix-${Date.now()}` },
      cardRect 
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      <main className="relative">
        <HeroSection />
        
        {/* Gallery Section */}
        <section className="py-24 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-semibold rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-primary">
                  BADGE COLLECTION
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-mono font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
              >
                Ready-to-use{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                  badges
                </span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground max-w-2xl mx-auto text-lg"
              >
                Hover to copy or remix. Each badge is fully customizable with our intuitive editor.
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <BadgeGallery onRemix={handleRemix} />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          {/* Decorative curved background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="container mx-auto relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-semibold rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                  POWERFUL FEATURES
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-mono font-bold mb-4"
              >
                Why developers{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  love it
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Visual Editing',
                  description: 'No more memorizing URL params. Pick colors, edit text, and see changes in real-time with our intuitive editor.',
                  icon: Palette,
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  title: 'Instant Sharing',
                  description: 'Every badge gets a unique URL. Share via README, docs, websites, or anywhere you need professional badges.',
                  icon: Link2,
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  title: 'Remix Culture',
                  description: 'See a badge you like? One-click remix to make it yours. Iterate fast and customize everything.',
                  icon: Sparkles,
                  gradient: 'from-orange-500 to-red-500',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative h-full p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-mono font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 p-12 md:p-16"
            >
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Zap className="w-12 h-12 mx-auto mb-6 text-primary" />
                  <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6">
                    Start creating today
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join thousands of developers who are already creating beautiful badges for their projects.
                  </p>
                  <motion.a
                    href="/editor"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-mono font-semibold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5" />
                    Create Your First Badge
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-12 px-4 mt-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <motion.a
                href="https://github.com/SinghAman21/peakmark"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com/SinghAman21_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 transition-all duration-300 font-mono font-bold text-lg"
              >
                𝕏
              </motion.a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground font-mono text-center"
            >
              &copy; {year} Peakmark. Built for Developers. By{' '}
              <a
                href="https://useraman.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Dev
              </a>
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Badge Editor Overlay */}
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

