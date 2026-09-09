import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get the visitor's IP from request headers.
    // Netlify (and most hosts) pass this along in one of these headers.
    const ip =
      request.headers.get('x-nf-client-connection-ip') ||
      request.headers.get('x-forwarded-for') ||
      'unknown';

    // Today's date as a string, e.g. "2026-09-09" — this is what makes the
    // hash rotate daily. Tomorrow, this same visitor gets a different hash.
    const today = new Date().toISOString().split('T')[0];

    // Combine IP + today's date + site_id, then hash it.
    // The raw IP is NEVER stored — only this one-way hash is.
    const rawString = `${ip}-${today}-${body.site_id}`;
    const visitorHash = crypto.createHash('sha256').update(rawString).digest('hex').slice(0, 16);

    const { error } = await supabaseAdmin.from('events').insert({
      site_id: body.site_id,
      path: body.path,
      referrer: body.referrer,
      device_type: body.device_type,
      browser: body.browser,
      os: body.os,
      screen_width: body.screen_width,
      is_404: body.is_404,
      status_code: body.status_code,
            is_outbound: body.is_outbound || false,
      outbound_url: body.outbound_url,
      visitor_hash: visitorHash,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 500 });
  }
}