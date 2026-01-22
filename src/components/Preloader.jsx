import { useState, useEffect } from 'react'
import './Preloader.scss'

const WORDS = [
    'FORTUNA',
    'AMOR',
    'ABUNDANCIA',
    'PROSPERIDAD',
    'ÉXITO',
    'ARMONÍA',
    'LIBERTAD',
    'PODER'
]

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0)
    const [currentWord, setCurrentWord] = useState(WORDS[0])
    const [isVisible, setIsVisible] = useState(true)
    const [isFadingOut, setIsFadingOut] = useState(false)

    useEffect(() => {
        // Simulate loading progress
        const duration = 3000 // 3 seconds total load time
        const interval = 30 // Update every 30ms
        const increment = 100 / (duration / interval)

        let currentProgress = 0
        const timer = setInterval(() => {
            currentProgress += increment
            if (currentProgress >= 100) {
                currentProgress = 100
                clearInterval(timer)

                // Start fade out
                setTimeout(() => {
                    setIsFadingOut(true)
                    // Complete after fade animation
                    setTimeout(() => {
                        setIsVisible(false)
                        if (onComplete) onComplete()
                    }, 800)
                }, 300)
            }
            setProgress(Math.round(currentProgress))
        }, interval)

        return () => clearInterval(timer)
    }, [onComplete])

    // Cycle through words
    useEffect(() => {
        const wordInterval = setInterval(() => {
            setCurrentWord(prev => {
                const currentIndex = WORDS.indexOf(prev)
                const nextIndex = (currentIndex + 1) % WORDS.length
                return WORDS[nextIndex]
            })
        }, 400) // Change word every 400ms

        return () => clearInterval(wordInterval)
    }, [])

    if (!isVisible) return null

    return (
        <div className={`preloader ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="preloader-content">
                {/* Animated Word */}
                <div className="word-container">
                    <span className="word" key={currentWord}>
                        {currentWord}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="progress-text">
                        <span className="percentage">{progress}%</span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="decorative-line left" />
                <div className="decorative-line right" />
            </div>
        </div>
    )
}
