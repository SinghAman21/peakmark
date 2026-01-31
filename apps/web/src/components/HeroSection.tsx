"use client";

import { motion, px } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Copy, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-l from-pink-500/15 to-purple-500/15 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

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
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 backdrop-blur-sm"
          >
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-mono font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Developer Badge Generator
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight px-2 sm:px-0"
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
                className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 -z-0"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            Browse stunning developer badges, remix with visual editing, and share instantly.{' '}
            <span className="text-foreground font-semibold">The shields.io alternative</span> with 100× better UX.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4"
          >
            <Link href="/editor" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button size="lg" className="h-12 sm:h-14 cursor-pointer px-6 sm:px-8 rounded-2xl font-mono font-semibold text-sm sm:text-base shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-primary/90 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group w-full sm:w-auto">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Create a Badge
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 sm:h-14 cursor-pointer px-6 sm:px-8 rounded-2xl font-mono font-semibold text-sm sm:text-base border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto"
                onClick={() => {
                  window.scrollBy({ top: 913, behavior: 'smooth' });
                }}
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
            className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-2xl mx-auto pt-6 sm:pt-8 px-2"
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                  <p className={`text-xl sm:text-2xl md:text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
