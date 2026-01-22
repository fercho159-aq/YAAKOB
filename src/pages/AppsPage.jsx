import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import './AppsPage.scss';

export default function AppsPage() {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const navigate = useNavigate();
    const { startTransition } = useTransition();

    useEffect(() => {
        // Crear audio
        const audio = new Audio('/YTDown.com_Shorts_LA-MEJOR-FRASE-DE-ADAM-SANDLER-Garra-Mot_Media_MtwBVhkLd3s_007_48k.m4a');
        audioRef.current = audio;

        // Configuración para flujo automático
        audio.loop = false; // Importante: NO loop para que termine

        // Al terminar, ir a /contacto
        audio.onended = () => {
            console.log("Audio terminado. Iniciando transición a contacto...");
            startTransition(() => {
                navigate('/contacto');
            });
        };

        // Exponer audio al window
        window.sharedAudio = audio;

        // Intentar AUTO-PLAY e inicializar AudioContext
        const initAudio = async () => {
            try {
                // Crear Contexto de Audio
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                audioContextRef.current = audioContext;

                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;

                // Conectar nodos
                const source = audioContext.createMediaElementSource(audio);
                source.connect(analyser);
                analyser.connect(audioContext.destination);

                // Exponer analyser
                window.sharedAnalyser = analyser;

                // Reproducir
                await audio.play();
                setAudioPlaying(true);
            } catch (err) {
                console.warn("Autoplay bloqueado por el navegador. Se requiere interacción.", err);
                // Si falla el autoplay, el botón manual sigue disponible
            }
        };

        initAudio();

        return () => {
            audio.pause();
            window.sharedAudio = null;
            // Limpiar listener
            audio.onended = null;
        };
    }, [navigate]);

    const handlePlayAudio = () => {
        if (audioRef.current) {
            // Si el contexto existe pero está suspendido (browsers policy), reanudarlo
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            // Si no existe (caso raro si el useEffect falló parcialmente), crearlo
            if (!audioContextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                audioContextRef.current = audioContext;
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                const source = audioContext.createMediaElementSource(audioRef.current);
                source.connect(analyser);
                analyser.connect(audioContext.destination);
                window.sharedAnalyser = analyser;
            }

            audioRef.current.play().then(() => setAudioPlaying(true)).catch(e => console.error(e));
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
