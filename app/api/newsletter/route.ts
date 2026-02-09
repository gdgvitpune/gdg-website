// app/api/newsletter/route.ts
// app/api/newsletter/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/app/lib/firestore';
import { checkRateLimit } from '@/app/lib/ratelimit';

const MAX_REQUESTS = 3;

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return `newsletter:${ip}`;
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  const rateLimitKey = getRateLimitKey(request);
  const rateLimit = await checkRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    const secondsUntilReset = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
    return NextResponse.json(
      {
        success: false,
        error: `Too many requests. Please try again in ${secondsUntilReset} seconds.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          'Retry-After': secondsUntilReset.toString(),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const result = await addSubscriber(email);

    const headers = {
      'X-RateLimit-Limit': MAX_REQUESTS.toString(),
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      'X-RateLimit-Reset': rateLimit.resetTime.toString(),
    };

    if (result.success) {
      return NextResponse.json(result, { status: 201, headers });
    } else {
      return NextResponse.json(result, { status: 409, headers });
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}