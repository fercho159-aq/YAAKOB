import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './AppsPage.scss';
import ParallaxTilt from '../components/ParallaxTilt';

export default function AppsPage() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        // ... (existing animation code remains the same, assuming it's hidden in the replaced block but I need to include it if I replace the whole file imports?)
        // Wait, replace_file_content keeps lines outside start/end. 
        // I need to import ParallaxTilt at the top first.

        // Actually, to make this clean, I will just replicate the needed imports and the component part.
        // But since I can't edit imports AND component body in one generic chunk easily without context lines.
        // I will do two edits or one big edit.

        // Let's do imports first manually? No, I can replace the top block.
        const container = containerRef.current;
        if (!container) return;

        // Set initial states
        gsap.set(container, { opacity: 1 });
        gsap.set('.apps-header', { y: -30, opacity: 0 });
        gsap.set('.app-card', { y: 50, opacity: 0 });
        gsap.set('.apps-footer', { opacity: 0 });

        // Create a timeline for better sequencing
        const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            delay: 0.2
        });

        // Animate header
        tl.to('.apps-header', {
            y: 0,
            opacity: 1,
            duration: 0.8
        });

        // Animate cards with stagger
        tl.to('.app-card', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            clearProps: 'transform'
        }, '-=0.4');

        // Animate footer
        tl.to('.apps-footer', {
            opacity: 1,
            duration: 0.5
        }, '-=0.3');

        // Start floating animation - DISABLED for parallax items to avoid conflict
        // Or applied to the container? Let's keep it simple and just tilt.

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="apps-page" ref={containerRef}>
            {/* Animated background */}
            <div className="apps-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <header className="apps-header">
                <Link to="/" className="back-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Volver
                </Link>
                <ParallaxTilt options={{ max: 5, scale: 1.02 }}>
                    <div className="header-content">
                        <img src="/logo.png" alt="YAAKOB Logo" className="header-logo" />
                        <h1>Nuestras Apps</h1>
                        <p className="header-subtitle">Transforma tu vida con nuestras aplicaciones de bienestar</p>
                    </div>
                </ParallaxTilt>
            </header>

            <main className="apps-container">
                {/* Soy Corazón Card */}
                <article className="app-card soy-corazon">
                    {/* Glow removed via CSS, no need to render div if CSS handles it or empty */}
                    <div className="card-glow"></div>
                    <div className="card-content">
                        <div className="mockup-container">
                            <ParallaxTilt options={{ max: 15, scale: 1.05 }}>
                                <img
                                    src="/soy_corazon_v2.png"
                                    alt="Soy Corazón App"
                                    className="app-mockup"
                                />
                            </ParallaxTilt>
                        </div>
                        <ParallaxTilt className="app-info-tilt" options={{ max: 8, scale: 1.01 }}>
                            <div className="app-info">
                                <div className="app-badge">
                                    <span className="badge-icon">❤️</span>
                                    <span>Bienestar</span>
                                </div>
                                <h2 className="app-title">Soy Corazón</h2>
                                <p className="app-description">
                                    Conecta con tu esencia interior a través de meditaciones guiadas
                                    enfocadas en el corazón. Descubre la coherencia cardíaca, practica
                                    ejercicios de respiración consciente y cultiva el amor propio.
                                </p>
                                <ul className="app-features">
                                    <li>
                                        <span className="feature-icon">🧘</span>
                                        Meditaciones del Corazón
                                    </li>
                                    <li>
                                        <span className="feature-icon">🌬️</span>
                                        Respiración Consciente
                                    </li>
                                    <li>
                                        <span className="feature-icon">💓</span>
                                        Coherencia Cardíaca
                                    </li>
                                    <li>
                                        <span className="feature-icon">✨</span>
                                        Amor Propio
                                    </li>
                                </ul>
                                <div className="download-buttons">
                                    <a href="#" className="download-btn app-store">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="small">Descargar en</span>
                                            <span className="large">App Store</span>
                                        </div>
                                    </a>
                                    <a href="#" className="download-btn play-store">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="small">Disponible en</span>
                                            <span className="large">Google Play</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </ParallaxTilt>
                    </div>
                </article>

                {/* Mente Abundante Card */}
                <article className="app-card mente-abundante">
                    <div className="card-glow"></div>
                    <div className="card-content">
                        <div className="mockup-container">
                            <ParallaxTilt options={{ max: 15, scale: 1.05 }}>
                                <img
                                    src="/mente_abundante_v2.png"
                                    alt="Mente Abundante App"
                                    className="app-mockup"
                                />
                            </ParallaxTilt>
                        </div>
                        <ParallaxTilt className="app-info-tilt" options={{ max: 8, scale: 1.01 }}>
                            <div className="app-info">
                                <div className="app-badge">
                                    <span className="badge-icon">✨</span>
                                    <span>Manifestación</span>
                                </div>
                                <h2 className="app-title">Mente Abundante</h2>
                                <p className="app-description">
                                    Reprograma tu mente para la abundancia y el éxito. Esta aplicación
                                    te guía en un viaje de transformación personal a través de
                                    afirmaciones poderosas, visualizaciones guiadas y prácticas de
                                    gratitud que atraerán prosperidad a todas las áreas de tu vida.
                                </p>
                                <ul className="app-features">
                                    <li>
                                        <span className="feature-icon">🌟</span>
                                        Afirmaciones Diarias de Abundancia
                                    </li>
                                    <li>
                                        <span className="feature-icon">🎯</span>
                                        Visualizaciones de Manifestación
                                    </li>
                                    <li>
                                        <span className="feature-icon">📔</span>
                                        Diario de Gratitud Interactivo
                                    </li>
                                    <li>
                                        <span className="feature-icon">🔮</span>
                                        Patrones de Geometría Sagrada
                                    </li>
                                </ul>
                                <div className="download-buttons">
                                    <a href="#" className="download-btn app-store">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="small">Descargar en</span>
                                            <span className="large">App Store</span>
                                        </div>
                                    </a>
                                    <a href="#" className="download-btn play-store">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                        </svg>
                                        <div className="btn-text">
                                            <span className="small">Disponible en</span>
                                            <span className="large">Google Play</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </ParallaxTilt>
                    </div>
                </article>
            </main>

            <footer className="apps-footer">
                <p>© 2026 YAAKOB. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
