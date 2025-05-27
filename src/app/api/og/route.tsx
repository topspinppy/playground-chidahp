// /src/app/api/og/route.tsx

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Playground by ชี้ดาบ'
  const author = searchParams.get('author') || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #facc15 30%, #fde68a 100%)',
          color: '#111',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="https://playground.chidahp.com/_next/image?url=%2Fchuloh.png&w=96&q=75"
            alt="logo"
            width={80}
            height={100}
            style={{ borderRadius: '0' }}
          />
          <span style={{ fontSize: 28, fontWeight: 700 }}>สนามเด็กเล่นโรงเรียนชูโล่ | Playground.chidahp.com</span>
        </div>

        {/* TITLE */}
        <div
          style={{
            fontSize: 48, // ⬇️ ลดลงจาก 60
            fontWeight: 800,
            maxWidth: 900, // ⬇️ แคบลงนิดหน่อย ให้ไม่กินจอ
            lineHeight: 1.4,
            textAlign: 'left',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.4)', // ⬇️ เบาลง
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>

        {/* AUTHOR */}
        <div
          style={{
            fontSize: 24,
            marginTop: 40,
            opacity: 0.8,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          ✍️ โดย {author || 'นักเล่าเรื่อง'}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
