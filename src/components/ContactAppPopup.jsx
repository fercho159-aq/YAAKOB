import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// Apple Logo SVG Component
const AppleLogo = () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
)

// Google Play Logo SVG Component
const GooglePlayLogo = () => (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
)

export default function ContactAppPopup({ onClose }) {
    const containerRef = useRef()

    useEffect(() => {
        // Fade in background
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        )
    }, [])

    const handleClose = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: onClose
        })
    }

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.85)',
                zIndex: 3000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(5px)'
            }}
        >
            <div style={{ position: 'absolute', top: '20px', right: '40px', zIndex: 3001 }}>
                <button
                    onClick={handleClose}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }}
                >
                    Cerrar
                </button>
            </div>

            {/* Content Overlay */}
            <div style={{
                zIndex: 3002,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                textAlign: 'center',
                color: '#fff',
                fontFamily: "'Outfit', sans-serif"
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    letterSpacing: '0.1rem',
                    marginBottom: '10px',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                    margin: 0
                }}>
                    CONTACTO APP
                </h2>
                <p style={{
                    fontSize: '1rem',
                    letterSpacing: '0.05rem',
                    color: '#a0a0a0',
                    maxWidth: '400px',
                    lineHeight: '1.6'
                }}>
                    Mantente conectado con nosotros. <br /> Descarga nuestra app de contacto.
                </p>

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    {/* App Store Button */}
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            height: '70px',
                            minWidth: '200px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        <AppleLogo />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7 }}>Download on the</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>App Store</div>
                        </div>
                    </button>

                    {/* Google Play Button */}
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            color: '#fff',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            height: '70px',
                            minWidth: '200px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                    >
                        <GooglePlayLogo />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7 }}>Get it on</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Google Play</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
