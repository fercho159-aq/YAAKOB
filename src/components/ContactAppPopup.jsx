import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const MailIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
)

export default function ContactAppPopup({ onClose }) {
    const containerRef = useRef()

    useEffect(() => {
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
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                    margin: 0
                }}>
                    CONTACTO
                </h2>
                <p style={{
                    fontSize: '1rem',
                    letterSpacing: '0.05rem',
                    color: '#a0a0a0',
                    maxWidth: '400px',
                    lineHeight: '1.6'
                }}>
                    Estamos aquí para ayudarte.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
                    <a
                        href="mailto:contacto@yaakob.com"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '16px 30px',
                            borderRadius: '12px',
                            color: '#fff',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            minWidth: '280px',
                            justifyContent: 'center'
                        }}
                    >
                        <MailIcon />
                        <span style={{ fontSize: '16px' }}>contacto@yaakob.com</span>
                    </a>
                    <a
                        href="/soporte"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '16px 30px',
                            borderRadius: '12px',
                            color: '#fff',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            minWidth: '280px',
                            justifyContent: 'center'
                        }}
                    >
                        <span style={{ fontSize: '16px' }}>Centro de Ayuda</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
