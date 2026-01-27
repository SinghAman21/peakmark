"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Plus, Trash2, GripVertical, Check } from 'lucide-react';
import type { BadgeSegment } from '@/types/badge';
import { BADGE_COLORS } from '@/types/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SegmentEditorProps {
  segments: BadgeSegment[];
  iconPosition: number;
  hasIcon: boolean;
  onSegmentsChange: (segments: BadgeSegment[]) => void;
  onIconPositionChange: (position: number) => void;
  maxSegments?: number;
}

const colorOptions = Object.entries(BADGE_COLORS);

// Individual draggable segment item
const SegmentItem = ({
  segment,
  index,
  iconPosition,
  hasIcon,
  canDelete,
  expandedSegment,
  onToggleExpand,
  onToggleIcon,
  onRemove,
  onUpdate,
}: {
  segment: BadgeSegment;
  index: number;
  iconPosition: number;
  hasIcon: boolean;
  canDelete: boolean;
  expandedSegment: number | null;
  onToggleExpand: (index: number) => void;
  onToggleIcon: (index: number) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<BadgeSegment>) => void;
}) => {
  const dragControls = useDragControls();
  const isExpanded = expandedSegment === index;
  const wasExpandedRef = useRef(false);
  
  useEffect(() => {
    wasExpandedRef.current = isExpanded;
  }, [isExpanded]);

  return (
    <Reorder.Item
      value={segment}
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      whileDrag={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
      className="bg-secondary/30 rounded-lg border border-border/50 overflow-hidden select-none"
    >
      {/* Segment Header */}
      <div className="flex items-center gap-2 p-2 select-none">
        {/* Drag handle */}
        <div
          onPointerDown={(e) => {
            e.preventDefault();
            dragControls.start(e);
          }}
          className="cursor-grab active:cursor-grabbing touch-none p-1 -m-1 hover:bg-muted/50 rounded"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Color preview */}
        <div
          className="w-6 h-6 rounded border border-border shrink-0 cursor-pointer"
          style={{ backgroundColor: segment.color }}
          onClick={() => onToggleExpand(index)}
        />
        
        {/* Text preview */}
        <span 
          className="font-mono text-sm flex-1 truncate cursor-pointer"
          onClick={() => onToggleExpand(index)}
        >
          {segment.text || '(empty)'}
        </span>
        
        {/* Icon position indicator */}
        {hasIcon && (
          <button
            onClick={() => onToggleIcon(index)}
            className={`px-2 py-0.5 text-xs font-mono rounded transition-colors flex items-center gap-1 ${
              iconPosition === index
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            title={iconPosition === index ? 'Icon here' : 'Place icon here'}
          >
            {iconPosition === index && <Check className="w-3 h-3" />}
            icon
          </button>
        )}
        
        {/* Remove button */}
        {canDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={wasExpandedRef.current ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
          className="border-t border-border/50"
        >
          <div className="p-3 space-y-3">
            {/* Text input */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Text</Label>
              <Input
                value={segment.text}
                onChange={(e) => onUpdate(index, { text: e.target.value })}
                className="h-8 font-mono text-sm bg-background"
                placeholder="Segment text"
                autoFocus={false}
              />
            </div>

            {/* Color input */}
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Color</Label>
              <div className="flex gap-2">
                <Input
                  value={segment.color}
                  onChange={(e) => onUpdate(index, { color: e.target.value })}
                  className="h-8 font-mono text-sm bg-background flex-1"
                  placeholder="#000000"
                />
                <div
                  className="w-8 h-8 rounded border border-border shrink-0"
                  style={{ backgroundColor: segment.color }}
                />
              </div>
              
              {/* Color swatches */}
              <div className="flex flex-wrap gap-1 pt-1">
                {colorOptions.slice(0, 12).map(([name, color]) => (
                  <button
                    key={name}
                    onClick={() => onUpdate(index, { color })}
                    className="w-5 h-5 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                ))}
              </div>
            </div>

            {/* Padding slider */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Padding (px)</Label>
              <div className="flex items-center gap-3">
                <Slider
                  min={0}
                  max={30}
                  step={1}
                  value={[segment.padding?.left ?? 5]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    onUpdate(index, { 
                      padding: { left: v ?? 5, right: v ?? 5 } 
                    });
                  }}
                  className="flex-1"
                />
                <span className="text-xs font-mono text-muted-foreground w-6 text-right">
                  {segment.padding?.left ?? 5}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Reorder.Item>
  );
};

export const SegmentEditor = ({
  segments,
  iconPosition,
  hasIcon,
  onSegmentsChange,
  onIconPositionChange,
  maxSegments = 4,
}: SegmentEditorProps) => {
  const [expandedSegment, setExpandedSegment] = useState<number | null>(null);

  const addSegment = () => {
    if (segments.length >= maxSegments) return;
    const newSegment: BadgeSegment = {
      text: 'new',
      color: BADGE_COLORS.grey,
    };
    onSegmentsChange([...segments, newSegment]);
  };

  const removeSegment = (index: number) => {
    if (segments.length <= 1) return;
    const newSegments = segments.filter((_, i) => i !== index);
    onSegmentsChange(newSegments);
    
    // Adjust icon position if needed
    if (iconPosition >= newSegments.length) {
      onIconPositionChange(newSegments.length - 1);
    } else if (iconPosition > index) {
      onIconPositionChange(iconPosition - 1);
    }
  };

  const updateSegment = (index: number, updates: Partial<BadgeSegment>) => {
    const newSegments = segments.map((seg, i) => 
      i === index ? { ...seg, ...updates } : seg
    );
    onSegmentsChange(newSegments);
  };

  const toggleIconPosition = (index: number) => {
    onIconPositionChange(iconPosition === index ? -1 : index);
  };

  const handleReorder = (newOrder: BadgeSegment[]) => {
    // Find where the icon-attached segment moved to
    const oldIconSegment = segments[iconPosition];
    const newIconIndex = newOrder.findIndex(s => s === oldIconSegment);
    
    onSegmentsChange(newOrder);
    if (newIconIndex !== -1 && newIconIndex !== iconPosition) {
      onIconPositionChange(newIconIndex);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-sm">Segments ({segments.length}/{maxSegments})</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={addSegment}
          disabled={segments.length >= maxSegments}
          className="h-7 text-xs font-mono"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      <Reorder.Group
        axis="y"
        values={segments}
        onReorder={handleReorder}
        className="space-y-2"
        layoutScroll
      >
        {segments.map((segment, index) => (
          <SegmentItem
            key={index}
            segment={segment}
            index={index}
            iconPosition={iconPosition}
            hasIcon={hasIcon}
            canDelete={segments.length > 1}
            expandedSegment={expandedSegment}
            onToggleExpand={(i) => setExpandedSegment(expandedSegment === i ? null : i)}
            onToggleIcon={toggleIconPosition}
            onRemove={removeSegment}
            onUpdate={updateSegment}
          />
        ))}
      </Reorder.Group>
    </div>
  );
};
