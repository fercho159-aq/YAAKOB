import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/ui.scss';

export default function UI() {
    const containerRef = useRef(null);
    const tiltRef = useRef(null);

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

            const rect = tiltElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            // Apply tilt - subtle effect
            gsap.to(tiltElement, {
                rotateX: -y * 3,  // Tilt up/down (reduced)
                rotateY: x * 3,   // Tilt left/right (reduced)
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
                <div className="top-links">
                    <span>COOKIES</span>
                    <span>ACCESSIBILITY</span>
                    <span className="dots">........</span>
                    <button className="cc-btn">CC</button>
                </div>
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

                    <button className="signin-btn stagger-anim">
                        INICIO
                    </button>
                </div>
            </main>

            <footer className="ui-footer stagger-anim">

            </footer>
        </div>
    );
}
