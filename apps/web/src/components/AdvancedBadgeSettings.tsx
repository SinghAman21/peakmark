"use client";

import type { BadgeAdvancedOptions, BadgeSize } from '@/types/badge';
import { BADGE_SIZE_PRESETS } from '@/types/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Settings2, RotateCcw } from 'lucide-react';
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>
        <Button
          variant="outline"
          className="w-full justify-between font-mono text-sm"
        >
          <span className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            Advanced Settings
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-4 space-y-5">
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
            className="justify-start"
          >
            {(Object.keys(BADGE_SIZE_PRESETS) as BadgeSize[]).map((size) => (
              <ToggleGroupItem
                key={size}
                value={size}
                className="font-mono text-xs uppercase px-4"
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
              className="w-8 h-8 p-0.5 top-[-1] cursor-pointer border-border"
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
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefaults}
          className="w-full font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-3 h-3 mr-2" />
          Reset to Defaults
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};
