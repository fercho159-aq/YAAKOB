import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useTransition } from '../context/TransitionContext';
import '../styles/ui.scss';

export default function UI() {
    const containerRef = useRef(null);
    const tiltRef = useRef(null);
    const navigate = useNavigate();
    const { startTransition, isTransitioning } = useTransition();

    useEffect(() => {
        if (isTransitioning) {
            // Fade out UI when transition starts
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    }, [isTransitioning]);

    const handleStartClick = (e) => {
        e.preventDefault();
        startTransition(() => {
            navigate('/apps');
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial load animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('.stagger-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.5 }
            );

        }, containerRef);

        // Tilt effect - follows cursor for 3D physical feel
        const tiltElement = tiltRef.current;

        const handleMouseMove = (e) => {
            if (!tiltElement) return;

            // Calculate distance from center (normalized to window size)
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            // Apply tilt - moderate effect
            gsap.to(tiltElement, {
                rotateX: -y * 10,
                rotateY: x * 10,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000,
                transformOrigin: 'center center'
            });
        };

        const handleMouseLeave = () => {
            if (!tiltElement) return;

            gsap.to(tiltElement, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        tiltElement?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
            tiltElement?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="ui-layer" ref={containerRef}>
            <header className="ui-header stagger-anim">
                <nav className="nav-links">
                    <Link to="/" className="nav-link active">Inicio</Link>
                    <Link to="/apps" className="nav-link">Apps</Link>
                    <Link to="/contacto" className="nav-link">Contacto</Link>
                </nav>
            </header>

            <main className="ui-main">
                {/* Tilt container - wraps all tiltable content */}
                <div className="tilt-container" ref={tiltRef}>
                    <div className="logo-section-top stagger-anim">
                        {/* Geometric logo */}
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="wings-icon"
                            style={{ width: '240px', height: 'auto' }}
                        />
                    </div>

                    {/* Space reserved for 3D E.C.H.O. text rendered in Canvas */}
                    <div className="echo-container stagger-anim">
                        {/* Text rendered in WebGL Canvas layer */}
                    </div>

                    <h2 className="subtitle stagger-anim">
                        <span>BE</span>
                        <span>FREE</span>
                    </h2>

                    <a href="/apps" onClick={handleStartClick} className="signin-btn stagger-anim">
                        INICIO
                    </a>
                </div>
            </main>

            <footer className="ui-footer stagger-anim">

            </footer>
        </div>
    );
}
