"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Copy, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-l from-pink-500/15 to-purple-500/15 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Developer Badge Generator
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold mb-8 leading-[1.1] tracking-tight"
          >
            Beautiful badges for{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                your README
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 -z-0"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Browse stunning developer badges, remix with visual editing, and share instantly.{' '}
            <span className="text-foreground font-semibold">The shields.io alternative</span> with 100× better UX.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/editor">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="h-14 px-8 rounded-2xl font-mono font-semibold text-base shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-primary/90 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create a Badge
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-2xl font-mono font-semibold text-base border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Browse Gallery
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
          >
            {[
              { label: 'Badges Created', value: '1,234+', gradient: 'from-blue-500 to-cyan-500' },
              { label: 'GitHub Stars', value: '2.1k', gradient: 'from-purple-500 to-pink-500' },
              { label: 'Weekly Users', value: '890', gradient: 'from-orange-500 to-red-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-4 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                  <p className={`text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
