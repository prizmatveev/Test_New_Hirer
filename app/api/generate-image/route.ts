import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type ReqBody = {
  prompt?: string;
  style?: 'real' | 'cartoon' | 'static';
};

export async function POST(req: Request) {
  const body: ReqBody = await req.json().catch(() => ({}));
  const style = body.style || 'static';

  if (style === 'static') {
    // return a few static placeholders (user should add real images into public/uploads)
    return NextResponse.json({ url: '/uploads/illustrations/static1.png' });
  }

  if (style === 'cartoon') {
    return NextResponse.json({ url: '/uploads/illustrations/cartoon1.png', lottie: 'https://assets4.lottiefiles.com/packages/lf20_touohxv0.json' });
  }

  // style === 'real'
  const prompt = body.prompt || 'A professional headshot of a friendly developer, studio lighting';
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured on server' }, { status: 400 });
  }

  try {
    // call OpenAI images generation (classic images endpoint)
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ prompt, n: 1, size: '1024x1024', response_format: 'b64_json' }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: txt }, { status: res.status });
    }

    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return NextResponse.json({ error: 'no image data' }, { status: 500 });

    const buffer = Buffer.from(b64, 'base64');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'generated');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const fileName = `img-${Date.now()}.png`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ url: `/uploads/generated/${fileName}` });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
