"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, Reorder, useDragControls } from 'framer-motion';
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

const createSegmentId = () => `seg-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

// Individual draggable segment item
const SegmentItem = ({
  segment,
  index,
  iconPosition,
  hasIcon,
  canDelete,
  expandedSegmentId,
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
  expandedSegmentId: string | null;
  onToggleExpand: (id: string) => void;
  onToggleIcon: (index: number) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, updates: Partial<BadgeSegment>) => void;
}) => {
  const dragControls = useDragControls();
  const isExpanded = expandedSegmentId === segment.id;

  return (
    <Reorder.Item
      value={segment.id!}
      dragListener={false}
      dragControls={dragControls}
      layout="position"
      whileDrag={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
      className="bg-secondary/30 rounded-lg border border-border/50 overflow-hidden select-none"
    >
      {/* Segment Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 p-2 select-none">
        {/* Drag handle */}
        <div
          onPointerDown={(e) => {
            e.preventDefault();
            dragControls.start(e);
          }}
          className="cursor-grab active:cursor-grabbing touch-none p-1 -m-1 hover:bg-muted/50 rounded"
        >
          <GripVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
        </div>
        
        {/* Color preview */}
        <div
          className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-border shrink-0 cursor-pointer"
          style={{ backgroundColor: segment.color }}
          onClick={() => onToggleExpand(segment.id!)}
        />
        
        {/* Text preview */}
        <span 
          className="font-mono text-xs sm:text-sm flex-1 truncate cursor-pointer"
          onClick={() => onToggleExpand(segment.id!)}
        >
          {segment.text || '(empty)'}
        </span>
        
        {/* Icon position indicator */}
        {hasIcon && (
          <button
            onClick={() => onToggleIcon(index)}
            className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded transition-colors flex items-center gap-0.5 sm:gap-1 ${
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
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="expanded"
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
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
                  value={[segment.paddingLeft ?? 5]}
                  onValueChange={(val) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    onUpdate(index, { 
                      paddingLeft: v ?? 5 
                    });
                  }}
                  className="flex-1"
                />
                <span className="text-xs font-mono text-muted-foreground w-6 text-right">
                  {segment.paddingLeft ?? 5}
                </span>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [expandedSegmentId, setExpandedSegmentId] = useState<string | null>(null);

  // Ensure every segment has a stable id for drag/reorder + expand/collapse.
  // We also preserve ids across edits by always carrying forward `id` in updates.
  const normalizedSegments = useMemo(() => {
    return segments.map((s) => {
      if (s.id) return s;
      return { ...s, id: createSegmentId() };
    });
  }, [segments]);

  // Update parent when segments need IDs added (useEffect to avoid setState during render)
  useEffect(() => {
    const needsIds = segments.some((s) => !s.id);
    if (needsIds) {
      const withIds = segments.map((s) => 
        s.id ? s : { ...s, id: createSegmentId() }
      );
      onSegmentsChange(withIds);
    }
  }, [segments, onSegmentsChange]);

  const segmentById = useMemo(() => {
    const m = new Map<string, BadgeSegment>();
    for (const s of normalizedSegments) m.set(s.id!, s);
    return m;
  }, [normalizedSegments]);

  const orderIds = useMemo(() => normalizedSegments.map((s) => s.id!), [normalizedSegments]);

  const addSegment = () => {
    if (segments.length >= maxSegments) return;
    const newSegment: BadgeSegment = {
      id: createSegmentId(),
      text: 'new',
      color: BADGE_COLORS.grey,
    };
    onSegmentsChange([...normalizedSegments, newSegment]);
  };

  const removeSegment = (index: number) => {
    if (normalizedSegments.length <= 1) return;
    const removedId = normalizedSegments[index]?.id;
    const newSegments = normalizedSegments.filter((_, i) => i !== index);
    onSegmentsChange(newSegments);

    if (removedId && expandedSegmentId === removedId) {
      setExpandedSegmentId(null);
    }
    
    // Adjust icon position if needed
    if (iconPosition >= newSegments.length) {
      onIconPositionChange(newSegments.length - 1);
    } else if (iconPosition > index) {
      onIconPositionChange(iconPosition - 1);
    }
  };

  const updateSegment = (index: number, updates: Partial<BadgeSegment>) => {
    const newSegments = normalizedSegments.map((seg, i) => 
      i === index ? { ...seg, ...updates, id: seg.id } : seg
    );
    onSegmentsChange(newSegments);
  };

  const toggleIconPosition = (index: number) => {
    onIconPositionChange(iconPosition === index ? -1 : index);
  };

  const handleReorder = (newOrderIds: string[]) => {
    const iconSegmentId = normalizedSegments[iconPosition]?.id;
    const newSegments = newOrderIds.map((id) => segmentById.get(id)!).filter(Boolean);
    onSegmentsChange(newSegments);

    if (iconSegmentId) {
      const newIconIndex = newSegments.findIndex((s) => s.id === iconSegmentId);
      if (newIconIndex !== -1 && newIconIndex !== iconPosition) {
        onIconPositionChange(newIconIndex);
      }
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-xs sm:text-sm">Segments ({segments.length}/{maxSegments})</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={addSegment}
          disabled={segments.length >= maxSegments}
          className="h-6 sm:h-7 text-[10px] sm:text-xs font-mono px-2 sm:px-3"
        >
          <Plus className="w-3 h-3 mr-0.5 sm:mr-1" />
          Add
        </Button>
      </div>

      <Reorder.Group
        axis="y"
        values={orderIds}
        onReorder={handleReorder}
        className="space-y-2"
        layout
      >
        {normalizedSegments.map((segment, index) => (
          <SegmentItem
            key={segment.id}
            segment={segment}
            index={index}
            iconPosition={iconPosition}
            hasIcon={hasIcon}
            canDelete={normalizedSegments.length > 1}
            expandedSegmentId={expandedSegmentId}
            onToggleExpand={(id) => setExpandedSegmentId(expandedSegmentId === id ? null : id)}
            onToggleIcon={toggleIconPosition}
            onRemove={removeSegment}
            onUpdate={updateSegment}
          />
        ))}
      </Reorder.Group>
    </div>
  );
};
