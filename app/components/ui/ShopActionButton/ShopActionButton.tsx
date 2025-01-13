'use client';

import React, { useState } from 'react';
import styles from './shop-action-button.module.css';
import { IconEdit, IconTrash, IconCopy, IconShare, IconArrowRight } from '@tabler/icons-react';

// Configuration des boutons secondaires
const secondaryButtons = [
    { id: 1, icon: IconEdit, color: 'bg-primary', label: 'Éditer' },
    { id: 2, icon: IconTrash, color: 'bg-primary', label: 'Supprimer' },
    { id: 3, icon: IconCopy, color: 'bg-primary', label: 'Copier' },
    { id: 4, icon: IconShare, color: 'bg-primary', label: 'Partager' },
    // { id: 5, icon: IconShare, color: 'bg-purple-500', label: 'Partager' },
    // Ajoutez ou retirez des boutons ici
];

const ShopActionButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const getButtonPosition = (index: number, totalButtons: number) => {
        // Angle de départ (en degrés) - commence à 225° pour le quadrant supérieur gauche
        const startAngle = 262;
        // L'arc total que nous voulons couvrir (90° pour un quart de cercle)
        const arcSize = 76;

        // Calculer l'angle pour ce bouton spécifique
        const angleStep = (totalButtons > 1) ? arcSize / (totalButtons - 1) : 0;
        const angle = (startAngle - index * angleStep) * (Math.PI / 180); // Conversion en radians

        // Rayon de déploiement (en rem)
        const radius = 13;

        // Calculer les positions x et y
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return { x, y };
    };

    return (
        <div className={styles.container}>
            {/* Bouton principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-primary text-white p-2 rounded-full shadow-xl ${styles.mainButton} ${isOpen ? styles.open : ''}`}
            >
                <IconArrowRight size={52} />
            </button>

            {/* Boutons secondaires */}
            <div className={styles.secondaryButtonsContainer}>
                {secondaryButtons.map((button, index) => {
                    const { x, y } = getButtonPosition(index, secondaryButtons.length);
                    return (
                        <button
                            key={button.id}
                            className={`${styles.secondaryButton} ${button.color} text-white`}
                            style={{
                                transform: isOpen ? `translate(${x}rem, ${y}rem)` : 'translate(0, 0)',
                                opacity: isOpen ? 1 : 0,
                                transition: 'all 0.3s ease-in-out',
                            }}
                            title={button.label}
                        >
                            <button.icon size={24} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ShopActionButton;