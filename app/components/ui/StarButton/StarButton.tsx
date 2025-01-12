import React, { useState } from 'react';
import './star-styles.css';
import { IconStar } from '@tabler/icons-react';

const StarButton = () => {
    const [isFilled, setIsFilled] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleClick = () => {
        setIsFilled(!isFilled);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
    };

    return (
        <div className="star-button">
            <button
                onClick={handleClick}
                className="star-button__btn"
                aria-label="Toggle star"
            >
                <IconStar
                    className='text-primary'
                    size={32}
                    fill={isFilled ? "rgb(227, 83, 64)" : "none"}
                    stroke={1} />            </button>

            {showConfetti && (
                <div className="confetti-container">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className={`confetti confetti-${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StarButton;