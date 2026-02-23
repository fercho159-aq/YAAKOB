import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './AboutPage.scss';

const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
);

const MessageIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const VideoIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);

const ShieldIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const UsersIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const GlobeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

export default function AboutPage() {
    const pageRef = useRef(null);

    const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="about-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
        }} />
    )), []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.about-hero-title',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
            );
            gsap.fromTo('.about-hero-subtitle',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
            );
            gsap.fromTo('.about-hero-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 1.4, ease: 'power3.inOut', delay: 0.4 }
            );
            gsap.fromTo('.about-section',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15, delay: 0.7 }
            );
            gsap.fromTo('.about-feature-card',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 1.0 }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="about-page" ref={pageRef}>
            {/* Ambient particles - memoized to avoid regeneration on re-render */}
            <div className="about-particles">
                {particles}
            </div>

            {/* Navigation */}
            <nav className="about-nav">
                <Link to="/" className="about-nav-logo">
                    <img src="/logo.png" alt="Yaakob" />
                </Link>
                <div className="about-nav-links">
                    <Link to="/">Inicio</Link>
                    <Link to="/apps">Apps</Link>
                    <Link to="/nosotros" className="active">Nosotros</Link>
                    <Link to="/contacto">Contacto</Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-badge">
                    <HeartIcon />
                    <span>Be Heart</span>
                </div>
                <h1 className="about-hero-title">
                    Sobre<br />Yaakob
                </h1>
                <p className="about-hero-subtitle">
                    Somos la plataforma oficial de mensajería y consultoría profesional.<br />
                    Conectamos personas con asesores certificados de manera segura.
                </p>
                <div className="about-hero-line" />
            </section>

            {/* Quiénes somos */}
            <section className="about-section about-who">
                <div className="about-section-inner">
                    <span className="about-label">Quiénes somos</span>
                    <h2>Nuestra misión</h2>
                    <p>
                        <strong>Yaakob</strong> es una empresa de tecnología dedicada al desarrollo de soluciones digitales
                        de comunicación. Nuestro producto principal es la <strong>aplicación móvil Yaakob</strong>, una plataforma
                        de mensajería y consultoría profesional disponible para iOS y Android.
                    </p>
                    <p>
                        Este sitio web, <strong>yaakob.com</strong>, es el portal oficial de la aplicación. Aquí encontrarás
                        información sobre nuestros servicios, soporte técnico, políticas de privacidad y canales de contacto
                        para nuestros usuarios.
                    </p>
                    <p>
                        Nuestra misión es facilitar la conexión entre personas y profesionales de confianza a través
                        de herramientas digitales seguras, accesibles y fáciles de usar.
                    </p>
                </div>
            </section>

            {/* La App */}
            <section className="about-section about-app">
                <div className="about-section-inner">
                    <span className="about-label">La aplicación</span>
                    <h2>Yaakob App</h2>
                    <p>
                        La aplicación Yaakob permite a los usuarios comunicarse con asesores y consultores
                        profesionales a través de chat en tiempo real, llamadas de voz y videollamadas.
                        Está diseñada para ofrecer un entorno seguro y privado de comunicación.
                    </p>

                    <div className="about-features-grid">
                        <div className="about-feature-card">
                            <div className="about-feature-icon"><MessageIcon /></div>
                            <h3>Mensajería en tiempo real</h3>
                            <p>Chat de texto, notas de voz, imágenes y documentos con notificaciones instantáneas.</p>
                        </div>
                        <div className="about-feature-card">
                            <div className="about-feature-icon"><VideoIcon /></div>
                            <h3>Llamadas de voz y video</h3>
                            <p>Comunicación directa con consultores mediante llamadas VoIP y videollamadas.</p>
                        </div>
                        <div className="about-feature-card">
                            <div className="about-feature-icon"><ShieldIcon /></div>
                            <h3>Seguridad y privacidad</h3>
                            <p>Comunicaciones protegidas con controles de privacidad configurables por el usuario.</p>
                        </div>
                        <div className="about-feature-card">
                            <div className="about-feature-icon"><UsersIcon /></div>
                            <h3>Roles profesionales</h3>
                            <p>Sistema de usuarios, asesores y consultores con permisos diferenciados.</p>
                        </div>
                        <div className="about-feature-card">
                            <div className="about-feature-icon"><PhoneIcon /></div>
                            <h3>Multiplataforma</h3>
                            <p>Disponible para dispositivos iOS (App Store) y Android (Google Play).</p>
                        </div>
                        <div className="about-feature-card">
                            <div className="about-feature-icon"><GlobeIcon /></div>
                            <h3>Soporte en español</h3>
                            <p>Plataforma completamente en español, diseñada para el mercado hispanohablante.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Este sitio web */}
            <section className="about-section about-website">
                <div className="about-section-inner">
                    <span className="about-label">Este sitio web</span>
                    <h2>yaakob.com</h2>
                    <p>
                        El sitio web <strong>yaakob.com</strong> es el portal oficial de la aplicación Yaakob
                        y sirve como punto de referencia para nuestros usuarios. A través de este sitio puedes:
                    </p>
                    <ul className="about-list">
                        <li>Conocer las funcionalidades de la aplicación Yaakob</li>
                        <li>Acceder al centro de ayuda y soporte técnico</li>
                        <li>Consultar nuestra política de privacidad y términos de uso</li>
                        <li>Solicitar la eliminación de tu cuenta</li>
                        <li>Contactar a nuestro equipo directamente</li>
                    </ul>
                    <p>
                        Este sitio no recopila datos personales de los visitantes más allá de lo necesario para
                        el funcionamiento estándar del sitio web. Para más información, consulta nuestra{' '}
                        <a href="/politica-privacidad.html">política de privacidad</a>.
                    </p>
                </div>
            </section>

            {/* Contacto */}
            <section className="about-section about-contact-section">
                <div className="about-section-inner">
                    <span className="about-label">Contacto</span>
                    <h2>Comunícate con nosotros</h2>
                    <p>
                        Estamos disponibles para atender tus dudas, comentarios o solicitudes de soporte.
                    </p>
                    <div className="about-contact-cards">
                        <a href="mailto:contacto@yaakob.com" className="about-contact-card">
                            <div className="about-contact-icon"><MailIcon /></div>
                            <div>
                                <h4>Correo electrónico</h4>
                                <span>contacto@yaakob.com</span>
                            </div>
                        </a>
                        <Link to="/soporte" className="about-contact-card">
                            <div className="about-contact-icon"><HeartIcon /></div>
                            <div>
                                <h4>Centro de ayuda</h4>
                                <span>Soporte y preguntas frecuentes</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="about-footer">
                <div className="about-footer-inner">
                    <div className="about-footer-brand">
                        <img src="/logo.png" alt="Yaakob" />
                        <span>Yaakob</span>
                    </div>
                    <p>Be Heart — Conecta con tu corazón</p>
                    <div className="about-footer-links">
                        <Link to="/nosotros">Nosotros</Link>
                        <span className="about-footer-sep" />
                        <a href="/politica-privacidad.html">Privacidad</a>
                        <span className="about-footer-sep" />
                        <a href="/eliminar-cuenta.html">Eliminar cuenta</a>
                        <span className="about-footer-sep" />
                        <Link to="/soporte">Soporte</Link>
                        <span className="about-footer-sep" />
                        <a href="mailto:contacto@yaakob.com">contacto@yaakob.com</a>
                    </div>
                    <p className="about-footer-copy">&copy; {new Date().getFullYear()} Yaakob. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
