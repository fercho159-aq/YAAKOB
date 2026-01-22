import React, { useState, useEffect, useRef } from 'react';
import './AppsPage.scss';

export default function AppsPage() {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        // Crear audio y conectar al window para que HumanoidParticles pueda acceder
        const audio = new Audio('/YTDown.com_Shorts_LA-MEJOR-FRASE-DE-ADAM-SANDLER-Garra-Mot_Media_MtwBVhkLd3s_007_48k.m4a');
        audio.loop = true;
        audioRef.current = audio;

        // Exponer audio al window para sincronización
        window.sharedAudio = audio;

        return () => {
            audio.pause();
            window.sharedAudio = null;
        };
    }, []);

    const handlePlayAudio = () => {
        if (audioRef.current) {
            // Crear AudioContext en respuesta a click del usuario
            if (!audioContextRef.current) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                audioContextRef.current = audioContext;

                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;

                const source = audioContext.createMediaElementSource(audioRef.current);
                source.connect(analyser);
                analyser.connect(audioContext.destination);

                // Exponer analyser para HumanoidParticles
                window.sharedAnalyser = analyser;
            }

            audioRef.current.play();
            setAudioPlaying(true);
        }
    };

    const handleStopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setAudioPlaying(false);
        }
    };

    return (
        <div className="apps-page empty-canvas">
            <button
                onClick={audioPlaying ? handleStopAudio : handlePlayAudio}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '15px 30px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    background: audioPlaying ? '#333' : '#1e293b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    zIndex: 1000,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease'
                }}
            >
                {audioPlaying ? '⏹ Detener Audio' : '▶ Reproducir Audio'}
            </button>
        </div>
    );
}
