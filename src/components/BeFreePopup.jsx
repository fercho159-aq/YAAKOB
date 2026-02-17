import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function BeFreePopup({ onClose }) {
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
                fontFamily: "'Orbitron', sans-serif"
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    letterSpacing: '0.3rem',
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
                    margin: 0
                }}>
                    YAAKOB APP
                </h2>
                <p style={{
                    fontSize: '1rem',
                    letterSpacing: '0.1rem',
                    color: '#a0a0a0',
                    maxWidth: '400px',
                    lineHeight: '1.5'
                }}>
                    Nuestra app estará disponible pronto en App Store y Google Play.
                </p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '15px',
                    marginTop: '10px'
                }}>
                    <span style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '3px'
                    }}>
                        Mientras tanto
                    </span>
                    <Link
                        to="/soporte"
                        onClick={handleClose}
                        style={{
                            display: 'inline-block',
                            padding: '14px 40px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '50px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>
        </div>
    )
}
