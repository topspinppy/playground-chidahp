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
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 40%, #4a3c00 70%, #fbbf24 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Modern Yellow-Black Mesh Gradient Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(250, 204, 21, 0.25) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated Yellow Blob Shapes */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            borderRadius: '50% 40% 60% 30%',
            opacity: 0.15,
            transform: 'rotate(15deg)',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '-300px',
            left: '-300px',
            width: '700px',
            height: '700px',
            background: 'linear-gradient(225deg, #facc15, #eab308)',
            borderRadius: '60% 30% 50% 40%',
            opacity: 0.12,
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Glass-morphism Header */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 24,
            background: 'rgba(251, 191, 36, 0.1)',
            backdropFilter: 'blur(20px)',
            padding: '24px 32px',
            borderRadius: '24px',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            boxShadow: '0 8px 32px rgba(251, 191, 36, 0.2)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              boxShadow: '0 4px 16px rgba(251, 191, 36, 0.4)',
            }}
          >
            <img
              src="https://playground.chidahp.com/_next/image?url=%2Fchuloh.png&w=96&q=75"
              alt="logo"
              width={40}
              height={50}
              style={{ borderRadius: '0' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span 
              style={{ 
                fontSize: 28, 
                fontWeight: 700,
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
              }}
            >
              สนามเด็กเล่นโรงเรียนชูโล่วิทยาคม 
            </span>
            <span 
              style={{ 
                fontSize: 18, 
                fontWeight: 500,
                color: '#facc15',
                textTransform: 'lowercase',
                letterSpacing: '0.5px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
              }}
            >
              playground.chidahp.com
            </span>
          </div>
        </div>

        {/* Modern Title with Yellow Gradient Text */}
        <div
          style={{
            fontSize: title.length > 50 ? 42 : title.length > 30 ? 52 : 64,
            fontWeight: 900,
            color: 'white',
            maxWidth: 1000,
            lineHeight: 1.1,
            textAlign: 'left',
            background: 'linear-gradient(135deg, #ffffff 0%, #facc15 30%, #fbbf24 70%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            zIndex: 10,
          }}
        >
          {title}
        </div>

        {/* Futuristic Author Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.3))',
            backdropFilter: 'blur(16px)',
            color: '#ffffff',
            padding: '20px 32px',
            borderRadius: '60px',
            fontSize: 22,
            fontWeight: 600,
            border: '1px solid rgba(251, 191, 36, 0.4)',
            boxShadow: '0 8px 24px rgba(251, 191, 36, 0.3)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            ✍️
          </div>
          <span style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
            โดย {author || 'นักเล่าเรื่อง'}
          </span>
        </div>

        {/* Minimalist Corner Accent - Yellow Theme */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '60px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              background: '#fbbf24',
              borderRadius: '50%',
              opacity: 0.8,
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#f59e0b',
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              width: '10px',
              height: '10px',
              background: '#d97706',
              borderRadius: '50%',
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}