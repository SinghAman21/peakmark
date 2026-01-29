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
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const BadgeGallery = ({ onRemix }: BadgeGalleryProps) => {
  return (
    <section className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {seedBadges.map((badge) => (
          <motion.div key={badge.id} variants={item}>
            <BadgeCard badge={badge} onRemix={onRemix} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
