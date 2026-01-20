export default function HexagonBackground() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                pointerEvents: 'none',
            }}
        >

            {/* Hexagon pattern overlay */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.15,
                }}
            >
                <defs>
                    <pattern
                        id="hexagons"
                        width="56"
                        height="100"
                        patternUnits="userSpaceOnUse"
                        patternTransform="scale(1)"
                    >
                        {/* Hexagon shape - only stroke, no fill */}
                        <path
                            d="M28,2 L50,16 L50,44 L28,58 L6,44 L6,16 Z"
                            fill="none"
                            stroke="rgba(100,120,140,0.8)"
                            strokeWidth="0.5"
                        />
                        <path
                            d="M28,44 L50,58 L50,86 L28,100 L6,86 L6,58 Z"
                            fill="none"
                            stroke="rgba(100,120,140,0.8)"
                            strokeWidth="0.5"
                        />
                        <path
                            d="M0,30 L0,2 L28,16 L28,44 L0,58 L0,30 Z"
                            fill="none"
                            stroke="rgba(100,120,140,0.8)"
                            strokeWidth="0.5"
                            transform="translate(-28, -14)"
                        />
                        <path
                            d="M56,30 L56,2 L28,16 L28,44 L56,58 L56,30 Z"
                            fill="none"
                            stroke="rgba(100,120,140,0.8)"
                            strokeWidth="0.5"
                            transform="translate(28, -14)"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
        </div>
    )
}
