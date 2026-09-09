import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'How Long Does It Take to Charge an Electric Car? Real-World Guide';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B0F17',
          padding: '60px 70px',
          fontFamily: 'sans-serif',
          position: 'relative',
          justifyContent: 'space-between',
        }}
      >
        {/* Background glow accents */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
          }}
        />

        {/* Header Branding */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              ⚡
            </div>
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#F8FAFC', letterSpacing: '-0.5px' }}>
              EV Charge Curve
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '9999px',
              padding: '8px 20px',
              color: '#34D399',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            Real-World Technical Guide
          </div>
        </div>

        {/* Center Content: Title & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1050px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              margin: 0,
            }}
          >
            How Long Does It Take to Charge an Electric Car?
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#94A3B8',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            The truth about Level 1, Level 2 (240V), and DC Fast Charging curves, 80% taper cliffs, and cold-gate thermal limits.
          </p>
        </div>

        {/* Visual Metric Pillars */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: '#131B2A',
              border: '1px solid #1E293B',
              borderRadius: '16px',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '15px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>
              Level 1 (120V)
            </span>
            <span style={{ fontSize: '24px', color: '#F8FAFC', fontWeight: '800' }}>
              40–50+ Hours
            </span>
            <span style={{ fontSize: '14px', color: '#94A3B8' }}>3–5 miles/hr</span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#131B2A',
              border: '1px solid #1E293B',
              borderRadius: '16px',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '15px', color: '#10B981', fontWeight: '600', textTransform: 'uppercase' }}>
              Level 2 (240V)
            </span>
            <span style={{ fontSize: '24px', color: '#F8FAFC', fontWeight: '800' }}>
              6–9 Hours
            </span>
            <span style={{ fontSize: '14px', color: '#94A3B8' }}>25–35 miles/hr</span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: '#131B2A',
              border: '1px solid #1E293B',
              borderRadius: '16px',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '15px', color: '#06B6D4', fontWeight: '600', textTransform: 'uppercase' }}>
              Level 3 (DCFC)
            </span>
            <span style={{ fontSize: '24px', color: '#F8FAFC', fontWeight: '800' }}>
              18–35 Min (10-80%)
            </span>
            <span style={{ fontSize: '14px', color: '#94A3B8' }}>Up to 350 kW</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
