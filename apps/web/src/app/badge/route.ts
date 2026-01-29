import { NextRequest, NextResponse } from 'next/server';
import { generateBadgeSVGString } from '@/components/BadgeSVG';
import type { Badge, BadgeSegment, BadgeParams } from '@/types/badge';

function parseBadgeFromParams(params: URLSearchParams): Badge {
  const style = (params.get('style') || 'flat') as Badge['style'];
  const icon = params.get('icon') || undefined;
  const iconPosition = params.get('iconPosition') 
    ? parseInt(params.get('iconPosition')!, 10) 
    : 0;

  // Parse segments from JSON string
  let segments: BadgeSegment[] | undefined;
  const segmentsParam = params.get('segments');
  if (segmentsParam) {
    try {
      segments = JSON.parse(decodeURIComponent(segmentsParam)) as BadgeSegment[];
    } catch (e) {
      // Fallback to legacy params if segments parse fails
    }
  }

  // Legacy support: label/message format
  if (!segments || segments.length === 0) {
    const label = params.get('label') || 'your label';
    const message = params.get('message') || 'your message';
    const labelColor = params.get('labelColor') || '#555555';
    const messageColor = params.get('messageColor') || '#22d3ee';

    segments = [
      { text: label, color: labelColor },
      { text: message, color: messageColor },
    ];
  }

  // Build badge object
  const badge: Badge = {
    id: 'api-badge',
    label: segments[0]?.text || '',
    message: segments[1]?.text || '',
    labelColor: segments[0]?.color || '#555555',
    messageColor: segments[1]?.color || '#22d3ee',
    style,
    category: 'custom',
    segments,
    icon,
    iconPosition,
    link: params.get('link') || undefined,
  };

  return badge;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const badge = parseBadgeFromParams(searchParams);
    
    const svgString = generateBadgeSVGString(badge);

    return new NextResponse(svgString, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Badge API error:', error);
    return new NextResponse('Error generating badge', { status: 500 });
  }
}

