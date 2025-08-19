import { useState } from "react";

export default function Star() {
    const [active, setActive] = useState<boolean>();

    return (
        <div
            className="star-wrapper"
            onClick={() => (active ? setActive(false) : setActive(true))}
        >
            <svg
                className={`star ${active ? "active" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <defs>
                    {/* A circular mask that grows */}
                    <mask id="revealMask">
                        <circle
                            className="mask-circle"
                            cx="12"
                            cy="12"
                            r="0"
                            fill="white"
                        />
                    </mask>
                </defs>

                {/* Outline */}
                <path
                    d="M12 2.5 
             L14.6 8.5 
             L21.2 9.2 
             L16.5 13.5 
             L17.8 20 
             L12 16.8 
             L6.2 20 
             L7.5 13.5 
             L2.8 9.2 
             L9.4 8.5 Z"
                    stroke="gold"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    fill="none"
                />

                {/* Filled star, revealed by mask */}
                <path
                    className="filled-star"
                    d="M12 2.5 
             L14.6 8.5 
             L21.2 9.2 
             L16.5 13.5 
             L17.8 20 
             L12 16.8 
             L6.2 20 
             L7.5 13.5 
             L2.8 9.2 
             L9.4 8.5 Z"
                    fill="gold"
                    mask="url(#revealMask)"
                />
            </svg>

            {/* Firework particles */}
            {active &&
                [...Array(8)].map((_, i) => (
                    <span key={i} className={`particle p${i + 1}`} />
                ))}
        </div>
    );
}
