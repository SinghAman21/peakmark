import React, { useCallback, useMemo } from 'react';
import type { Badge, BadgeSegment } from '@/types/badge';
import { getBadgeSegments, BADGE_SIZE_PRESETS } from '@/types/badge';
import { SIMPLE_ICON_PATHS, LUCIDE_ICON_PATHS } from '@/data/badgeIcons';

interface BadgeSVGProps {
  badge: Badge;
  scale?: number;
}

// Calculate text width approximation
const getTextWidth = (text: string, fontSize: number = 11): number => {
  return text.length * fontSize * 0.6 + 10;
};

// Get icon path for a badge
const getIconPath = (iconSlug?: string): { path: string; type: 'simple' | 'lucide' } | null => {
  if (!iconSlug) return null;
  
  if (SIMPLE_ICON_PATHS[iconSlug]) {
    return { path: SIMPLE_ICON_PATHS[iconSlug], type: 'simple' };
  }
  if (LUCIDE_ICON_PATHS[iconSlug]) {
    return { path: LUCIDE_ICON_PATHS[iconSlug], type: 'lucide' };
  }
  return null;
};

// Helper to determine if color is light
function isLightColor(hex: string): boolean {
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

interface SegmentLayout {
  segment: BadgeSegment;
  x: number;
  width: number;
  hasIcon: boolean;
  iconWidth: number;
}

const calculateLayout = (
  segments: BadgeSegment[],
  iconData: { path: string; type: 'simple' | 'lucide' } | null,
  iconPosition: number,
  style: Badge['style']
): { layouts: SegmentLayout[]; totalWidth: number; height: number } => {
  const height = style === 'for-the-badge' ? 28 : 20;
  const iconWidth = iconData ? 14 : 0;
  const iconPadding = iconData ? 4 : 0;
  const defaultPadding = { top: 0, right: 5, bottom: 0, left: 5 };
  
  let currentX = 0;
  const layouts: SegmentLayout[] = segments.map((segment, index) => {
    const hasIcon = iconData !== null && index === iconPosition;
    const segmentIconWidth = hasIcon ? iconWidth + iconPadding : 0;
    const padLeft = segment.padding?.left ?? defaultPadding.left;
    const padRight = segment.padding?.right ?? defaultPadding.right;
    const textWidth = getTextWidth(segment.text);
    const width = textWidth + segmentIconWidth + padLeft + padRight - 10; // -10 to offset the base padding in getTextWidth
    
    const layout: SegmentLayout = {
      segment,
      x: currentX,
      width,
      hasIcon,
      iconWidth: segmentIconWidth,
    };
    
    currentX += width;
    return layout;
  });
  
  return { layouts, totalWidth: currentX, height };
};

// Get effective scale from badge options
const getEffectiveScale = (badge: Badge, baseScale: number): number => {
  const advanced = badge.advanced;
  if (advanced?.scale) return baseScale * advanced.scale;
  if (advanced?.size) return baseScale * BADGE_SIZE_PRESETS[advanced.size].scale;
  return baseScale;
};

export const BadgeSVG = React.memo(({ badge, scale = 1 }: BadgeSVGProps) => {
  const { style, icon, iconPosition = 0, link, advanced } = badge;
  const segments = useMemo(() => getBadgeSegments(badge), [badge]);
  const iconData = useMemo(() => getIconPath(icon), [icon]);

  const { layouts, totalWidth, height } = useMemo(
    () => calculateLayout(segments, iconData, iconPosition, style),
    [segments, iconData, iconPosition, style]
  );

  const baseFontSize = style === 'for-the-badge' ? 10 : 11;
  const txtsize = advanced?.txtsize ?? 1;
  const fontSize = baseFontSize * txtsize;
  const effectiveScale = useMemo(() => getEffectiveScale(badge, scale), [badge, scale]);
  
  // Advanced options with defaults
  const opacity = advanced?.opacity ?? 1;
  const border = advanced?.border ?? 0;
  const borderColor = advanced?.borderColor ?? '#ffffff';
  const shadowIntensity = typeof advanced?.shadow === 'number' ? advanced.shadow : 0;
  const shadowAngle = advanced?.shadowAngle ?? 135; // Default bottom-right
  const glowIntensity = typeof advanced?.glow === 'number' ? advanced.glow : 0;
  const rotate = advanced?.rotate ?? 0;
  
  // Calculate shadow offset from angle
  const shadowDistance = shadowIntensity / 3;
  const shadowDx = Math.cos((shadowAngle - 90) * Math.PI / 180) * shadowDistance;
  const shadowDy = Math.sin((shadowAngle - 90) * Math.PI / 180) * shadowDistance;
  
  // Radius based on style or advanced options
  const getRadius = () => {
    if (advanced?.borderRadius !== undefined) return advanced.borderRadius;
    switch (style) {
      case 'flat-square': return 0;
      case 'plastic': return 4;
      case 'rounded': return 10;
      case 'folded': return 0;
      default: return 3;
    }
  };
  const radius = getRadius();

  // Folded corner size
  const foldSize = style === 'folded' ? 6 : 0;

  const handleClick = useCallback(() => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }, [link]);

  // Calculate SVG dimensions with border
  const svgWidth = (totalWidth + border * 2) * effectiveScale;
  const svgHeight = (height + border * 2) * effectiveScale;
  
  // Generate filter IDs
  const filterId = `filter-${badge.id}`;
  
  const svgContent = useMemo(
    () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${totalWidth + border * 2} ${height + border * 2}`}
        role="img"
        aria-label={segments.map((s) => s.text).join(': ')}
        style={{
          cursor: link ? 'pointer' : 'default',
          opacity,
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
        }}
        onClick={handleClick}
      >
        <title>{segments.map((s) => s.text).join(': ')}</title>

        {/* Filters for shadow and glow */}
        <defs>
          {(shadowIntensity > 0 || glowIntensity > 0) && (
            <filter id={`${filterId}-effects`} x="-100%" y="-100%" width="300%" height="300%">
              {/* Outer glow built from the alpha channel so inner content stays crisp */}
              {glowIntensity > 0 && (
                <>
                  <feGaussianBlur
                    in="SourceAlpha"
                    stdDeviation={glowIntensity / 3}
                    result="glowBlur"
                  />
                  <feColorMatrix
                    in="glowBlur"
                    type="matrix"
                    values="0 0 0 0 0  0 0 0 0 0.8  0 0 0 0 1  0 0 0 0.6 0"
                    result="coloredGlow"
                  />
                  <feMerge result="glow">
                    <feMergeNode in="coloredGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </>
              )}
              {shadowIntensity > 0 && (
                <feDropShadow
                  dx={shadowDx}
                  dy={shadowDy}
                  stdDeviation={shadowIntensity / 4}
                  floodColor="#000"
                  floodOpacity={Math.min(0.7, shadowIntensity / 15)}
                  result="shadow"
                />
              )}
            </filter>
          )}
        </defs>

        {/* Gradient for plastic style */}
        <linearGradient id={`gradient-${badge.id}`} x2="0" y2="100%">
          <stop offset="0" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>

        {/* Folded corner gradient */}
        {style === 'folded' && (
          <linearGradient id={`fold-${badge.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
          </linearGradient>
        )}

        {/* Main badge group with effects and border offset */}
        <g
          transform={`translate(${border}, ${border})`}
          filter={shadowIntensity > 0 || glowIntensity > 0 ? `url(#${filterId}-effects)` : undefined}
        >
          {/* Border (if any) */}
          {border > 0 && (
            <rect
              x={-border}
              y={-border}
              width={totalWidth + border * 2}
              height={height + border * 2}
              fill="none"
              stroke={borderColor}
              strokeWidth={border}
            />
          )}

          {/* Render segments */}
          {layouts.map((layout, index) => {
            const isFirst = index === 0;
            const isLast = index === layouts.length - 1;
            const nextLayout = layouts[index + 1];

            return (
              <g key={index}>
                {/* Segment background with clipping for rounded corners */}
                {isFirst && radius > 0 ? (
                  // First segment with rounded left corners
                  <path
                    d={`M ${layout.x + radius},0 L ${layout.x + layout.width},0 L ${layout.x + layout.width},${height} L ${layout.x + radius},${height} Q ${layout.x},${height} ${layout.x},${height - radius} L ${layout.x},${radius} Q ${layout.x},0 ${layout.x + radius},0 Z`}
                    fill={layout.segment.color}
                  />
                ) : isLast && radius > 0 ? (
                  // Last segment with rounded right corners
                  <path
                    d={`M ${layout.x},0 L ${layout.x + layout.width - radius},0 Q ${layout.x + layout.width},0 ${layout.x + layout.width},${radius} L ${layout.x + layout.width},${height - radius} Q ${layout.x + layout.width},${height} ${layout.x + layout.width - radius},${height} L ${layout.x},${height} Z`}
                    fill={layout.segment.color}
                  />
                ) : (
                  // Middle segments with no rounding
                  <rect x={layout.x} y="0" width={layout.width} height={height} fill={layout.segment.color} />
                )}

                {/* Folded corner effect on last segment */}
                {isLast && style === 'folded' && (
                    <>
                    <polygon
                      points={`${totalWidth - foldSize},0 ${totalWidth},0 ${totalWidth},${foldSize}`}
                      fill="#0f172a"
                    />
                    <polygon
                      points={`${totalWidth - foldSize},0 ${totalWidth},${foldSize} ${totalWidth - foldSize},${foldSize}`}
                      fill={`url(#fold-${badge.id})`}
                    />
                    </>
                )}

                {/* Cover inner radius joins */}
                {!isLast && nextLayout && (
                  <>
                    <rect
                      x={layout.x + layout.width - 1}
                      y="0"
                      width="2"
                      height={height}
                      fill={layout.segment.color}
                    />
                    <rect x={layout.x + layout.width} y="0" width="1" height={height} fill={nextLayout.segment.color} />
                  </>
                )}

                {/* Icon */}
                {layout.hasIcon && iconData && (
                  <g
                    transform={`translate(${layout.x + (style === 'for-the-badge' ? 6 : 5)}, ${
                      height / 2 - 6
                    }) scale(0.5)`}
                  >
                    {iconData.type === 'simple' ? (
                      <path d={iconData.path} fill="#fff" />
                    ) : (
                      <path
                        d={iconData.path}
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </g>
                )}

                {/* Text */}
                <text
                  x={layout.x + layout.iconWidth + (layout.width - layout.iconWidth) / 2}
                  y={height / 2 + 1}
                  fill={isLightColor(layout.segment.color) ? '#000' : '#fff'}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="'JetBrains Mono', 'DejaVu Sans', Verdana, Geneva, sans-serif"
                  fontSize={fontSize}
                  fontWeight={style === 'for-the-badge' ? (index === 0 ? 600 : 700) : index === 0 ? 500 : 600}
                  letterSpacing={style === 'for-the-badge' ? '0.5px' : '0'}
                  style={{ textTransform: style === 'for-the-badge' ? 'uppercase' : 'none' }}
                >
                  {style === 'for-the-badge' ? layout.segment.text.toUpperCase() : layout.segment.text}
                </text>
              </g>
            );
          })}
        </g>

        {/* Gradient overlay for plastic style */}
        {style === 'plastic' && (
          <rect x="0" y="0" width={totalWidth} height={height} rx={radius} fill={`url(#gradient-${badge.id})`} />
        )}
      </svg>
    ),
    [
      badge.id,
      border,
      borderColor,
      filterId,
      fontSize,
      glowIntensity,
      handleClick,
      height,
      iconData,
      layouts,
      link,
      opacity,
      radius,
      rotate,
      segments,
      shadowDx,
      shadowDy,
      shadowIntensity,
      style,
      totalWidth,
      svgHeight,
      svgWidth,
      foldSize,
    ]
  );

  return svgContent;
});

BadgeSVG.displayName = 'BadgeSVG';

// Generate SVG string for copying / API usage
export const generateBadgeSVGString = (badge: Badge): string => {
  const segments = getBadgeSegments(badge);
  const iconData = getIconPath(badge.icon);
  const iconPosition = badge.iconPosition ?? 0;
  const { layouts, totalWidth, height } = calculateLayout(segments, iconData, iconPosition, badge.style);

  const baseFontSize = badge.style === 'for-the-badge' ? 10 : 11;
  const txtsize = badge.advanced?.txtsize ?? 1;
  const fontSize = baseFontSize * txtsize;

  const getRadius = () => {
    if (badge.advanced?.borderRadius !== undefined) return badge.advanced.borderRadius;
    switch (badge.style) {
      case 'flat-square': return 0;
      case 'plastic': return 4;
      case 'rounded': return 10;
      case 'folded': return 0;
      default: return 0;
    }
  };

  const radius = getRadius();
  const foldSize = badge.style === 'folded' ? 6 : 0;
  const link = badge.link || 'https://useraman.me';

  // Advanced options with defaults (match component)
  const opacity = badge.advanced?.opacity ?? 1;
  const border = badge.advanced?.border ?? 0;
  const borderColor = badge.advanced?.borderColor ?? '#ffffff';
  const shadowIntensity = typeof badge.advanced?.shadow === 'number' ? badge.advanced.shadow : 0;
  const shadowAngle = badge.advanced?.shadowAngle ?? 135;
  const glowIntensity = typeof badge.advanced?.glow === 'number' ? badge.advanced.glow : 0;
  const rotate = badge.advanced?.rotate ?? 0;

  // Shadow / glow calculations
  const shadowDistance = shadowIntensity / 3;
  const shadowDx = Math.cos((shadowAngle - 90) * Math.PI / 180) * shadowDistance;
  const shadowDy = Math.sin((shadowAngle - 90) * Math.PI / 180) * shadowDistance;

  const effectiveScale = getEffectiveScale(badge, 1);
  const svgWidth = (totalWidth + border * 2) * effectiveScale;
  const svgHeight = (height + border * 2) * effectiveScale;
  const filterId = `filter-${badge.id}`;
  const gradientId = `gradient-${badge.id}`;
  const foldGradientId = `fold-${badge.id}`;

  let segmentsSvg = '';

  // Render segments (match component logic)
  layouts.forEach((layout, index) => {
    const isFirst = index === 0;
    const isLast = index === layouts.length - 1;
    const nextLayout = layouts[index + 1];

    // Segment background with proper rounded corners
    if (isFirst && radius > 0) {
      // First segment with rounded left corners
      const path = `M ${layout.x + radius},0 L ${layout.x + layout.width},0 L ${layout.x + layout.width},${height} L ${layout.x + radius},${height} Q ${layout.x},${height} ${layout.x},${height - radius} L ${layout.x},${radius} Q ${layout.x},0 ${layout.x + radius},0 Z`;
      segmentsSvg += `<path d="${path}" fill="${layout.segment.color}"/>`;
    } else if (isLast && radius > 0) {
      // Last segment with rounded right corners
      const path = `M ${layout.x},0 L ${layout.x + layout.width - radius},0 Q ${layout.x + layout.width},0 ${layout.x + layout.width},${radius} L ${layout.x + layout.width},${height - radius} Q ${layout.x + layout.width},${height} ${layout.x + layout.width - radius},${height} L ${layout.x},${height} Z`;
      segmentsSvg += `<path d="${path}" fill="${layout.segment.color}"/>`;
    } else {
      // Middle segments with no rounding
      segmentsSvg += `<rect x="${layout.x}" y="0" width="${layout.width}" height="${height}" fill="${layout.segment.color}"/>`;
    }

    // Folded corner on last segment
    if (isLast && badge.style === 'folded') {
      segmentsSvg += `<polygon points="${totalWidth - foldSize},0 ${totalWidth},0 ${totalWidth},${foldSize}" fill="#0f172a"/>`;
      segmentsSvg += `<polygon points="${totalWidth - foldSize},0 ${totalWidth},${foldSize} ${totalWidth - foldSize},${foldSize}" fill="url(#${foldGradientId})"/>`;
    }

    // Cover inner joins
    if (!isLast && nextLayout) {
      segmentsSvg += `<rect x="${layout.x + layout.width - 1}" y="0" width="2" height="${height}" fill="${layout.segment.color}"/>`;
      segmentsSvg += `<rect x="${layout.x + layout.width}" y="0" width="1" height="${height}" fill="${nextLayout.segment.color}"/>`;
    }

    // Icon
    if (layout.hasIcon && iconData) {
      const iconY = height / 2 - 6;
      const iconX = layout.x + (badge.style === 'for-the-badge' ? 6 : 5);
      if (iconData.type === 'simple') {
        segmentsSvg += `<g transform="translate(${iconX}, ${iconY}) scale(0.5)"><path d="${iconData.path}" fill="#fff"/></g>`;
      } else {
        segmentsSvg += `<g transform="translate(${iconX}, ${iconY}) scale(0.5)"><path d="${iconData.path}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
      }
    }

    // Text
    const textX = layout.x + layout.iconWidth + (layout.width - layout.iconWidth) / 2;
    const textColor = isLightColor(layout.segment.color) ? '#000' : '#fff';
    const textValue = badge.style === 'for-the-badge'
      ? layout.segment.text.toUpperCase()
      : layout.segment.text;
    const fontWeight = badge.style === 'for-the-badge'
      ? (index === 0 ? 600 : 700)
      : (index === 0 ? 500 : 600);

    segmentsSvg += `<text x="${textX}" y="${height / 2 + 1}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" font-family="'JetBrains Mono', 'DejaVu Sans', Verdana, Geneva, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" letter-spacing="${badge.style === 'for-the-badge' ? '0.5px' : '0'}" style="text-transform:${badge.style === 'for-the-badge' ? 'uppercase' : 'none'}">${textValue}</text>`;
  });

  // Build full SVG
  const viewBoxWidth = totalWidth + border * 2;
  const viewBoxHeight = height + border * 2;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" role="img" aria-label="${segments.map(s => s.text).join(': ')}" style="cursor:${link ? 'pointer' : 'default'};opacity:${opacity};${rotate ? `transform:rotate(${rotate}deg);` : ''}">`;

  // Filters & gradients
  svg += `<defs>`;

  if (shadowIntensity > 0 || glowIntensity > 0) {
    svg += `<filter id="${filterId}-effects" x="-100%" y="-100%" width="300%" height="300%">`;
    if (glowIntensity > 0) {
      svg += `
        <feGaussianBlur in="SourceAlpha" stdDeviation="${glowIntensity / 3}" result="glowBlur" />
        <feColorMatrix in="glowBlur" type="matrix" values="0 0 0 0 0  0 0 0 0 0.8  0 0 0 0 1  0 0 0 0.6 0" result="coloredGlow" />
        <feMerge result="glow">
          <feMergeNode in="coloredGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      `;
    }
    if (shadowIntensity > 0) {
      svg += `<feDropShadow dx="${shadowDx}" dy="${shadowDy}" stdDeviation="${shadowIntensity / 4}" flood-color="#000" flood-opacity="${Math.min(0.7, shadowIntensity / 15)}" result="shadow" />`;
    }
    svg += `</filter>`;
  }

  // Plastic gradient
  svg += `<linearGradient id="${gradientId}" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".1" />
    <stop offset="1" stop-opacity=".1" />
  </linearGradient>`;

  // Fold gradient
  if (badge.style === 'folded') {
    svg += `<linearGradient id="${foldGradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#000" stop-opacity="0.4" />
    </linearGradient>`;
  }

  svg += `</defs>`;

  // Main badge group with border offset & effects
  svg += `<g transform="translate(${border}, ${border})"${shadowIntensity > 0 || glowIntensity > 0 ? ` filter="url(#${filterId}-effects)"` : ''}>`;

  // Border
  if (border > 0) {
    svg += `<rect x="${-border}" y="${-border}" width="${totalWidth + border * 2}" height="${height + border * 2}" fill="none" stroke="${borderColor}" stroke-width="${border}" />`;
  }

  // Segments
  svg += segmentsSvg;

  // Plastic overlay
  if (badge.style === 'plastic') {
    svg += `<rect x="0" y="0" width="${totalWidth}" height="${height}" rx="${radius}" fill="url(#${gradientId})" />`;
  }

  svg += `</g>`;

  // Clickable link wrapper
  svg += `<a href="${link}" target="_blank" rel="noopener noreferrer"></a>`;

  svg += `</svg>`;

  return svg;
};
