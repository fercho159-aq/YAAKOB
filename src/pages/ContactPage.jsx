import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './ContactPage.scss';

export default function ContactPage() {
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Entrance animation
        gsap.fromTo(containerRef.current,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );

        const handleMouseMove = (e) => {
            if (!wrapperRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calcular posición normalizada (-1 a 1)
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            // Aplicar rotación (Tilt 3D)
            // Invertimos Y para que al subir el mouse, el elemento "mire" hacia arriba
            const rotateX = -y * 15; // 15 grados max
            const rotateY = x * 15;

            wrapperRef.current.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="contact-page game-ui">
            <div className="content-wrapper" ref={wrapperRef} style={{ transition: 'transform 0.1s ease-out' }}>

                <h1 className="main-title" data-text="COMIENZA AHORA">
                    COMIENZA<br />AHORA
                </h1>


                <div className="buttons-row">
                    <Link to="/" className="action-btn">
                        BE FREE
                    </Link>
                    <Link to="/contacto-form" className="action-btn outline">
                        CONTACTO
                    </Link>
                </div>
            </div>
        </div>
    );
}
