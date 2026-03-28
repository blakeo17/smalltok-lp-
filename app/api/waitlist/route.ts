import { NextRequest, NextResponse } from 'next/server';

const LOOPS_FORM_URL =
  'https://app.loops.so/api/newsletter-form/cmn85yiux0kp10i0qxkxjaca3';

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!email?.trim()) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const formBody = new URLSearchParams({
    email: email.trim().toLowerCase(),
    userGroup: '',
    mailingLists: '',
    ...(name?.trim() ? { firstName: name.trim() } : {}),
  }).toString();

  const loopsRes = await fetch(LOOPS_FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody,
  });

  if (!loopsRes.ok) {
    const data = await loopsRes.json().catch(() => ({}));
    console.error('Loops error:', data);
    return NextResponse.json(
      { error: data.message ?? 'Failed to join waitlist' },
      { status: loopsRes.status }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
