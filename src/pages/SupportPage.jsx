import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './SupportPage.scss';

const faqs = [
    {
        q: '¿Qué es Yaakob?',
        a: 'Yaakob es una plataforma de mensajería y consultoría profesional en desarrollo. Conectará a usuarios con asesores y consultores certificados a través de chat en tiempo real, llamadas de voz y video.'
    },
    {
        q: '¿Cuándo estará disponible la app?',
        a: 'Estamos trabajando para lanzar la app próximamente en App Store y Google Play. Contáctanos en contacto@yaakob.com para recibir novedades sobre el lanzamiento.'
    },
    {
        q: '¿Qué funciones incluirá la app?',
        a: 'Chat en tiempo real, llamadas de voz y video, envío de archivos y documentos, escaneo OCR de documentos, integración fiscal (RFC y facturación), notificaciones push, tema claro/oscuro y configuración de privacidad.'
    },
    {
        q: '¿En qué dispositivos estará disponible?',
        a: 'Yaakob estará disponible para iOS (App Store) y Android (Google Play). Requerirá iOS 15+ o Android 10+ para funcionar correctamente.'
    },
    {
        q: '¿Cómo puedo eliminar mi cuenta?',
        a: 'Podrás solicitar la eliminación de tu cuenta desde Ajustes > Privacidad > Eliminar cuenta dentro de la app, o visitando nuestra página de eliminación de cuenta en yaakob.com.'
    },
    {
        q: '¿Las conversaciones serán seguras?',
        a: 'Sí. Todas las comunicaciones en Yaakob estarán protegidas. Podrás configurar tu privacidad incluyendo última conexión, foto de perfil y confirmaciones de lectura desde los ajustes de la app.'
    }
];

const HeartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const ChevronIcon = ({ open }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const ChatIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const ShieldIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export default function SupportPage() {
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const formRef = useRef(null);
    const faqRef = useRef(null);
    const cardsRef = useRef(null);
    const [openFaq, setOpenFaq] = useState(null);
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance
            gsap.fromTo('.support-hero-title',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
            );
            gsap.fromTo('.support-hero-subtitle',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
            );
            gsap.fromTo('.support-hero-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 1.4, ease: 'power3.inOut', delay: 0.4 }
            );

            // Cards stagger
            gsap.fromTo('.support-card',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.7 }
            );

            // Form entrance
            gsap.fromTo('.support-form-section',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.0 }
            );

            // FAQ entrance
            gsap.fromTo('.support-faq-section',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        // Build mailto link as fallback
        const subject = encodeURIComponent(formState.subject || 'Solicitud de soporte');
        const body = encodeURIComponent(
            `Nombre: ${formState.name}\nCorreo: ${formState.email}\n\n${formState.message}`
        );
        window.location.href = `mailto:contacto@yaakob.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setSending(false);
            setSubmitted(true);
            setFormState({ name: '', email: '', subject: '', message: '' });
        }, 600);
    };

    return (
        <div className="support-page" ref={pageRef}>
            {/* Ambient particles */}
            <div className="support-particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="support-particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${6 + Math.random() * 8}s`,
                        width: `${2 + Math.random() * 3}px`,
                        height: `${2 + Math.random() * 3}px`,
                    }} />
                ))}
            </div>

            {/* Navigation */}
            <nav className="support-nav">
                <Link to="/" className="support-nav-logo">
                    <img src="/logo.png" alt="Yaakob" />
                </Link>
                <div className="support-nav-links">
                    <Link to="/">Inicio</Link>
                    <Link to="/apps">Apps</Link>
                    <Link to="/nosotros">Nosotros</Link>
                    <Link to="/contacto">Contacto</Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="support-hero" ref={heroRef}>
                <div className="support-hero-badge">
                    <HeartIcon />
                    <span>Be Heart</span>
                </div>
                <h1 className="support-hero-title">
                    Centro de<br />Ayuda
                </h1>
                <p className="support-hero-subtitle">
                    Estamos aquí para ti. Encuentra respuestas, envía tu consulta<br />
                    o contáctanos directamente.
                </p>
                <div className="support-hero-line" />
            </section>

            {/* Quick contact cards */}
            <section className="support-cards" ref={cardsRef}>
                <a href="mailto:contacto@yaakob.com" className="support-card">
                    <div className="support-card-icon"><MailIcon /></div>
                    <h3>Correo Electrónico</h3>
                    <p>contacto@yaakob.com</p>
                    <span className="support-card-action">Enviar correo</span>
                </a>
                <div className="support-card">
                    <div className="support-card-icon"><ChatIcon /></div>
                    <h3>Chat en la App</h3>
                    <p>Soporte directo desde Yaakob</p>
                    <span className="support-card-action">Próximamente</span>
                </div>
                <div className="support-card">
                    <div className="support-card-icon"><ShieldIcon /></div>
                    <h3>Privacidad</h3>
                    <p>Política de datos y privacidad</p>
                    <a href="/politica-privacidad.html" className="support-card-action">Consultar</a>
                </div>
            </section>

            {/* Contact Form */}
            <section className="support-form-section" ref={formRef}>
                <div className="support-form-container">
                    <div className="support-form-header">
                        <span className="support-form-label">Formulario de contacto</span>
                        <h2>¿En qué podemos ayudarte?</h2>
                        <p>Completa el formulario y nuestro equipo te responderá lo antes posible.</p>
                    </div>

                    {submitted ? (
                        <div className="support-form-success">
                            <div className="support-form-success-icon">
                                <HeartIcon />
                            </div>
                            <h3>Mensaje enviado</h3>
                            <p>Se abrió tu cliente de correo con los datos del formulario. Si no se abrió, envía tu consulta directamente a <strong>contacto@yaakob.com</strong></p>
                            <button className="support-btn-outline" onClick={() => setSubmitted(false)}>
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form className="support-form" onSubmit={handleSubmit}>
                            <div className="support-form-row">
                                <div className="support-form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Tu nombre"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="support-form-group">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="tu@correo.com"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="support-form-group">
                                <label htmlFor="subject">Asunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="¿Sobre qué tema necesitas ayuda?"
                                    value={formState.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="support-form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Describe tu consulta o problema con el mayor detalle posible..."
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="support-btn-submit" disabled={sending}>
                                <span>{sending ? 'Enviando...' : 'Enviar mensaje'}</span>
                                {!sending && <SendIcon />}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* FAQ */}
            <section className="support-faq-section" ref={faqRef}>
                <div className="support-faq-container">
                    <span className="support-faq-label">FAQ</span>
                    <h2>Preguntas frecuentes</h2>
                    <div className="support-faq-list">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`support-faq-item ${openFaq === i ? 'open' : ''}`}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div className="support-faq-question">
                                    <span>{faq.q}</span>
                                    <ChevronIcon open={openFaq === i} />
                                </div>
                                <div className="support-faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="support-footer">
                <div className="support-footer-inner">
                    <div className="support-footer-brand">
                        <img src="/logo.png" alt="Yaakob" />
                        <span>Yaakob</span>
                    </div>
                    <p>Be Heart — Conecta con tu corazón</p>
                    <div className="support-footer-links">
                        <Link to="/nosotros">Nosotros</Link>
                        <span className="support-footer-sep" />
                        <a href="/politica-privacidad.html">Privacidad</a>
                        <span className="support-footer-sep" />
                        <a href="/eliminar-cuenta.html">Eliminar cuenta</a>
                        <span className="support-footer-sep" />
                        <a href="mailto:contacto@yaakob.com">contacto@yaakob.com</a>
                    </div>
                    <p className="support-footer-copy">&copy; {new Date().getFullYear()} Yaakob. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
