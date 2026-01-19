import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/ui.scss';

export default function UI() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial load animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('.stagger-anim',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.5 }
            );

            // Mouse move parallax for text
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 2;
                const y = (clientY / window.innerHeight - 0.5) * 2;

                gsap.to('.echo-container', {
                    rotationX: -y * 5,
                    rotationY: x * 5,
                    duration: 1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => window.removeEventListener('mousemove', handleMouseMove);

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="ui-layer" ref={containerRef}>
            <header className="ui-header stagger-anim">
                <div className="top-links">
                    <span>COOKIES</span>
                    <span>ACCESSIBILITY</span>
                    <span className="dots">........</span>
                    <button className="cc-btn">CC</button>
                </div>
            </header>

            <main className="ui-main">
                <div className="logo-section-top stagger-anim">
                    {/* More detailed Air Force wings logo */}
                    <div className="wings-icon">
                        <svg viewBox="0 0 120 70" fill="currentColor">
                            {/* Main Wings */}
                            <path d="M60 55 L10 15 C10 15 15 25 25 30 C35 35 50 42 60 48 C70 42 85 35 95 30 C105 25 110 15 110 15 L60 55 Z"
                                fill="#1a2e3a" />
                            {/* Wing highlights */}
                            <path d="M60 50 L20 18 C25 22 40 32 60 42 C80 32 95 22 100 18 L60 50 Z"
                                fill="#2a4050" opacity="0.6" />
                            {/* Center star/emblem */}
                            <path d="M60 12 L63 22 L73 22 L65 28 L68 38 L60 32 L52 38 L55 28 L47 22 L57 22 Z"
                                fill="#1a2e3a" />
                            {/* Inner star */}
                            <path d="M60 16 L62 22 L68 22 L63 26 L65 32 L60 28 L55 32 L57 26 L52 22 L58 22 Z"
                                fill="#4a6878" />
                        </svg>
                    </div>
                    <div className="usaf-text">U.S. AIR FORCE</div>
                    {/* Shadow/reflection text */}
                    <div className="usaf-shadow">U.S. AIR FORCE</div>
                </div>

                {/* Space reserved for 3D E.C.H.O. text rendered in Canvas */}
                <div className="echo-container stagger-anim">
                    {/* Text rendered in WebGL Canvas layer */}
                </div>

                <h2 className="subtitle stagger-anim">
                    <span>BE</span>
                    <span>FREE</span>

                </h2>

                <button className="signin-btn stagger-anim">
                    INICIO
                </button>
            </main>

            <footer className="ui-footer stagger-anim">
                <div className="history-text">
                    Click to go back or hold to<br />view history
                </div>
            </footer>
        </div>
    );
}
