"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BADGE_ICONS, SIMPLE_ICON_PATHS, LUCIDE_ICON_PATHS } from '@/data/badgeIcons';
import type { BadgeIconDef } from '@/data/badgeIcons';

interface IconPickerProps {
  selectedIcon?: string;
  onSelect: (iconSlug: string | undefined) => void;
}

export const IconPicker = ({ selectedIcon, onSelect }: IconPickerProps) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'dev' | 'social' | 'status' | 'misc'>('all');

  const filteredIcons = BADGE_ICONS.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || icon.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all' as const, label: 'All' },
    { id: 'dev' as const, label: 'Dev' },
    { id: 'social' as const, label: 'Social' },
    { id: 'status' as const, label: 'Status' },
    { id: 'misc' as const, label: 'Misc' },
  ];

  const renderIconPreview = (icon: BadgeIconDef) => {
    const path = icon.type === 'simple' ? SIMPLE_ICON_PATHS[icon.slug] : LUCIDE_ICON_PATHS[icon.slug];
    if (!path) return null;

    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        {icon.type === 'simple' ? (
          <path d={path} fill="currentColor" />
        ) : (
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="pl-9 font-mono text-sm bg-secondary/50 rounded-2xl border-border/50 hover:border-primary/30 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={activeCategory === cat.id ? 'default' : 'ghost'}
            className="h-7 px-2.5 text-xs font-mono rounded-xl"
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Clear Selection */}
      {selectedIcon && (
        <Button
          size="sm"
          variant="outline"
          className="w-full h-8 text-xs font-mono"
          onClick={() => onSelect(undefined)}
        >
          <X className="w-3 h-3 mr-1.5" />
          Clear Icon
        </Button>
      )}

      {/* Icon Grid */}
      <ScrollArea className="h-[200px]">
        <motion.div 
          className="grid grid-cols-6 gap-1.5 pr-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredIcons.map((icon) => (
              <motion.button
                key={icon.slug}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={() => onSelect(icon.slug)}
                className={`
                  relative p-2.5 rounded-lg border transition-all
                  flex items-center justify-center
                  ${selectedIcon === icon.slug 
                    ? 'bg-primary/20 border-primary text-primary' 
                    : 'bg-secondary/50 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }
                `}
                title={icon.name}
                style={icon.color && selectedIcon === icon.slug ? { color: icon.color } : undefined}
              >
                {renderIconPreview(icon)}
                
                {/* Selection indicator */}
                {selectedIcon === icon.slug && (
                  <motion.div
                    layoutId="icon-selected"
                    className="absolute inset-0 rounded-lg border-2 border-primary"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>

      {/* Empty State */}
      {filteredIcons.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No icons found matching &quot;{search}&quot;
        </div>
      )}
    </div>
  );
};
