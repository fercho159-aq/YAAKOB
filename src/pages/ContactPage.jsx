import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import BeFreePopup from '../components/BeFreePopup';
import ContactAppPopup from '../components/ContactAppPopup';
import './ContactPage.scss';

export default function ContactPage() {
    const wrapperRef = useRef(null);
    const containerRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showContactPopup, setShowContactPopup] = useState(false);

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
            {showPopup && <BeFreePopup onClose={() => setShowPopup(false)} />}
            {showContactPopup && <ContactAppPopup onClose={() => setShowContactPopup(false)} />}

            <div className="content-wrapper" ref={wrapperRef} style={{ transition: 'transform 0.1s ease-out' }}>

                <h1 className="main-title" data-text="COMIENZA AHORA">
                    COMIENZA<br />AHORA
                </h1>


                <div className="buttons-row">
                    <button
                        className="action-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPopup(true);
                        }}
                    >
                        BE FREE
                    </button>
                    <button
                        className="action-btn outline"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowContactPopup(true);
                        }}
                    >
                        CONTACTO
                    </button>
                </div>
            </div>
        </div>
    );
}
