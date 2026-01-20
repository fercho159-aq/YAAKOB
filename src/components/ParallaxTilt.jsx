import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ParallaxTilt({ children, className = '', options = {} }) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        // Configuración del tilt
        const settings = {
            max: 15, // Max tilt rotation in degrees
            perspective: 1000,
            scale: 1.0, // No scale by default for global tracking
            speed: 1000,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            ...options // Merge user options
        };

        // Global mouse tracking - works even when mouse is outside the element
        const handleGlobalMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const centerX = rect.left + width / 2;
            const centerY = rect.top + height / 2;

            // Calculate distance from element center
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Use window dimensions for smoother global effect
            const windowCenterX = window.innerWidth / 2;
            const windowCenterY = window.innerHeight / 2;
            const globalMouseX = e.clientX - windowCenterX;
            const globalMouseY = e.clientY - windowCenterY;

            // Calculate rotation based on global mouse position relative to window
            const rotateX = ((globalMouseY / windowCenterY) * settings.max).toFixed(2);
            const rotateY = (-(globalMouseX / windowCenterX) * settings.max).toFixed(2);

            gsap.to(content, {
                transform: `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`,
                duration: 0.6,
                ease: 'power2.out'
            });
        };

        // Add global listener to window
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`parallax-tilt-container ${className}`}
            style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
        >
            <div
                ref={contentRef}
                style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                }}
            >
                {children}
            </div>
        </div>
    );
}
