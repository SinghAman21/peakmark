"use client";

import type { BadgeAdvancedOptions, BadgeSize } from '@/types/badge';
import { BADGE_SIZE_PRESETS } from '@/types/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Settings2, RotateCcw, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AdvancedBadgeSettingsProps {
  advanced: BadgeAdvancedOptions;
  onChange: (advanced: BadgeAdvancedOptions) => void;
}

export const AdvancedBadgeSettings = ({ advanced, onChange }: AdvancedBadgeSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateField = <K extends keyof BadgeAdvancedOptions>(
    field: K,
    value: BadgeAdvancedOptions[K]
  ) => {
    onChange({ ...advanced, [field]: value });
  };

  const handleSizePreset = (size: BadgeSize) => {
    const preset = BADGE_SIZE_PRESETS[size];
    onChange({
      ...advanced,
      size,
      scale: preset.scale,
    });
  };

  const resetToDefaults = () => {
    onChange({
      size: 'md',
      scale: 1,
      opacity: 1,
      border: 0,
      borderColor: '#ffffff',
      borderRadius: undefined,
      shadow: 0,
      shadowAngle: 135,
      glow: 0,
      rotate: 0,
      txtsize: 1,
    });
  };

  const currentSize = advanced.size || 'md';

  return (
    <div>
      <Label className="font-mono text-sm mb-3 block font-semibold">Advanced Settings</Label>
      <Button
        variant="outline"
        className="w-full justify-between font-mono text-sm h-12 rounded-xl bg-secondary/50 hover:bg-secondary border-border/50 hover:border-primary/30 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          {isOpen ? 'Hide' : 'Show'} Advanced Options
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 px-5 pb-5 mt-3 space-y-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
        {/* Size Presets */}
        <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Size
            <span className="text-xs text-muted-foreground font-normal">
              {BADGE_SIZE_PRESETS[currentSize].label}
            </span>
          </Label>
          <ToggleGroup
            // type="single"
            value={[currentSize]}
            // ToggleGroup's onValueChange gives back the selected string or empty string
            onValueChange={(value) => {
              if (!value) return;
              handleSizePreset(value[0] as unknown as BadgeSize);
            }}
            className="justify-start gap-2"
          >
            {(Object.keys(BADGE_SIZE_PRESETS) as BadgeSize[]).map((size) => (
              <ToggleGroupItem
                key={size}
                value={size}
                className="font-mono text-xs uppercase px-4 rounded-xl data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-primary/10 transition-all duration-300"
              >
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Opacity */}
        <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Opacity
            <span className="text-xs text-muted-foreground font-normal">
              {Math.round((advanced.opacity ?? 1) * 100)}%
            </span>
          </Label>
          <Slider
            value={[advanced.opacity ?? 1]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateField('opacity', value ?? 1);
            }}
            min={0.1}
            max={1}
            step={0.05}
            className="w-full"
          />
        </div>

        {/* Text Size */}
        <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Text Size
            <span className="text-xs text-muted-foreground font-normal">
              {Math.round((advanced.txtsize ?? 1) * 100)}%
            </span>
          </Label>
          <Slider
            value={[advanced.txtsize ?? 1]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateField('txtsize', value ?? 1);
            }}
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>


        {/* Border */}
        <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Border
            <span className="text-xs text-muted-foreground font-normal">
              {advanced.border ?? 0}px
            </span>
          </Label>
          <div className="flex gap-2">
            <Slider
              value={[advanced.border ?? 0]}
              onValueChange={(val) => {
                const value = Array.isArray(val) ? val[0] : val;
                updateField('border', value ?? 0);
              }}
              min={0}
              max={5}
              step={1}
              className="flex-1"
            />
            <Input
              type="color"
              value={advanced.borderColor ?? '#ffffff'}
              onChange={(e) => updateField('borderColor', e.target.value)}
              className="w-10 h-10 p-1 cursor-pointer rounded-xl border-2 border-border/50 hover:border-primary/30 transition-all duration-300"
            />
          </div>
        </div>

        {/* Border Radius */}
        <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Border Radius
            <span className="text-xs text-muted-foreground font-normal">
              {advanced.borderRadius ?? 'auto'}px
            </span>
          </Label>
          <Slider
            value={[advanced.borderRadius ?? 3]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateField('borderRadius', value);
            }}
            min={0}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        {/* Rotation */}
        <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Rotation
            <span className="text-xs text-muted-foreground font-normal">
              {advanced.rotate ?? 0}°
            </span>
          </Label>
          <Slider
            value={[advanced.rotate ?? 0]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateField('rotate', value ?? 0);
            }}
            min={-45}
            max={45}
            step={1}
            className="w-full"
          />
        </div>

        {/* Shadow Slider */}
        {/* <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Shadow
            <span className="text-xs text-muted-foreground font-normal">
              {advanced.shadow ?? 0}
            </span>
          </Label>
          <Slider
            value={[typeof advanced.shadow === 'number' ? advanced.shadow : 0]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateField('shadow', value ?? 0);
            }}
            min={0}
            max={20}
            step={1}
            className="w-full"
          />
        </div> */}

        {/* Shadow Angle */}
        {/* {(advanced.shadow ?? 0) > 0 && (
          <div className="space-y-2">
            <Label className="font-mono text-sm flex items-center justify-between">
              Shadow Angle
              <span className="text-xs text-muted-foreground font-normal">
                {advanced.shadowAngle ?? 135}°
              </span>
            </Label>
            <Slider
              value={[advanced.shadowAngle ?? 135]}
              onValueChange={(val) => {
                const value = Array.isArray(val) ? val[0] : val;
                updateField('shadowAngle', value ?? 135);
              }}
              min={0}
              max={360}
              step={15}
              className="w-full"
            />
          </div>
        )} */}

        {/* Glow Slider */}
        {/* <div className="space-y-2">
          <Label className="font-mono text-sm flex items-center justify-between">
            Glow
            <span className="text-xs text-muted-foreground font-normal">
              {advanced.glow ?? 0}
            </span>
          </Label>
          <Slider
            value={[typeof advanced.glow === 'number' ? advanced.glow : 0]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateField('glow', value ?? 0);
            }}
            min={0}
            max={30}
            step={1}
            className="w-full"
          />
        </div> */}

        {/* Reset Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefaults}
            className="w-full font-mono text-xs h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
