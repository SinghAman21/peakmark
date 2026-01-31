"use client";

import { motion } from 'framer-motion';
import type { Badge } from '@/types/badge';
import { BadgeCard } from './BadgeCard';
import { seedBadges } from '@/data/seedBadges';

interface BadgeGalleryProps {
  onRemix: (badge: Badge, cardRect: DOMRect) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8,
    rotateX: -15,
    
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    }
  },
};

export const BadgeGallery = ({ onRemix }: BadgeGalleryProps) => {
  return (
    <section className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {seedBadges.map((badge, index) => (
          <motion.div 
            key={badge.id} 
            variants={item}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            style={{ perspective: 1000 }}
          >
            <BadgeCard badge={badge} onRemix={onRemix} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
