import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './ContactPage.scss';

export default function ContactPage() {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    const [submitted, setSubmitted] = useState(false);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.set(container, { opacity: 1 });
        gsap.set('.contact-header', { y: -30, opacity: 0 });
        gsap.set('.contact-card', { y: 50, opacity: 0 });
        gsap.set('.contact-info-item', { x: -30, opacity: 0 });
        gsap.set('.contact-footer', { opacity: 0 });

        const tl = gsap.timeline({
            defaults: { ease: 'power2.out' },
            delay: 0.2
        });

        tl.to('.contact-header', {
            y: 0,
            opacity: 1,
            duration: 0.8
        });

        tl.to('.contact-card', {
            y: 0,
            opacity: 1,
            duration: 0.8
        }, '-=0.4');

        tl.to('.contact-info-item', {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1
        }, '-=0.4');

        tl.to('.contact-footer', {
            opacity: 1,
            duration: 0.5
        }, '-=0.3');

        return () => {
            tl.kill();
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes añadir la lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
        setSubmitted(true);

        // Reset después de 3 segundos
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                mensaje: ''
            });
        }, 3000);
    };

    return (
        <div className="contact-page" ref={containerRef}>
            {/* Animated background */}
            <div className="contact-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <header className="contact-header">
                <Link to="/" className="back-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Volver
                </Link>
                <nav className="nav-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/apps" className="nav-link">Apps</Link>
                    <Link to="/contacto" className="nav-link active">Contacto</Link>
                </nav>
                <div className="header-content">
                    <img src="/logo.png" alt="YAAKOB Logo" className="header-logo" />
                    <h1>Contáctanos</h1>
                    <p className="header-subtitle">Estamos aquí para ayudarte en tu camino hacia el bienestar</p>
                </div>
            </header>

            <main className="contact-container">
                <div className="contact-grid">
                    {/* Formulario de contacto */}
                    <div className="contact-card form-card">
                        <h2>Envíanos un mensaje</h2>
                        {submitted ? (
                            <div className="success-message">
                                <span className="success-icon">✓</span>
                                <h3>¡Mensaje enviado!</h3>
                                <p>Gracias por contactarnos. Te responderemos pronto.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre completo</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono (opcional)</label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="+52 123 456 7890"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mensaje">Mensaje</label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        placeholder="¿En qué podemos ayudarte?"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn">
                                    Enviar mensaje
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Información de contacto */}
                    <div className="contact-card info-card">
                        <h2>Información de contacto</h2>

                        <div className="contact-info-item">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Email</h3>
                                <p>contacto@yaakob.com</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Teléfono</h3>
                                <p>+52 (55) 1234-5678</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="info-content">
                                <h3>Ubicación</h3>
                                <p>Ciudad de México, México</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>Síguenos</h3>
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Facebook">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="Twitter">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-icon" aria-label="YouTube">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="contact-footer">
                <p>© 2026 YAAKOB. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
