'use client';

import React, { useState } from 'react';
import styles from './shop-action-button.module.css';
import { IconListDetails, IconArrowRight, IconTruckDelivery, IconPaperBag, IconToolsKitchen2 } from '@tabler/icons-react';
import { Dialog, Divider } from '@mantine/core';
import Link from 'next/link';
import { Shop } from '@/@types/shop';

// Configuration des boutons secondaires
const secondaryButtons = [
    { id: 1, icon: IconTruckDelivery, color: 'bg-primary', label: 'Livraison', link: 'delivery' },
    { id: 2, icon: IconPaperBag, color: 'bg-primary', label: 'Click & Collect', link: 'clickAndCollect' },
    { id: 3, icon: IconToolsKitchen2, color: 'bg-primary', label: 'Sur place', link: 'onSite' },
    { id: 4, icon: IconListDetails, color: 'bg-primary', label: 'Découvrir', link: 'list' },
    // { id: 5, icon: IconShare, color: 'bg-purple-500', label: 'Partager' },
    // Ajoutez ou retirez des boutons ici
];

const ShopActionButton = ({ shop }: { shop: Shop }) => {
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
        <div className={`${styles.container} `}>
            <Dialog
                position={{ top: "30%", left: 30 }}
                className="fixed inset-0 flex items-center justify-center font-roboto shadow-xl"
                withCloseButton={false}
                opened={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <p className='text-center text-lg font-medium'>
                    Selectionnez une action
                </p>
                <Divider className='my-3' />
                <div className='grid grid-cols-2 gap-8 text-center'>
                    {secondaryButtons.map((button) => (
                        <div key={button.id} className='flex items-center justify-center gap-2'>
                            <p>{button.label}</p>
                            <button.icon
                                key={button.id}
                                className='bg-primary text-white p-2 rounded-full shadow-xl'
                                aria-label={button.label} size={40} stroke={1.2}
                            />
                        </div>
                    ))
                    }
                </div>
            </Dialog>
            {/* Bouton principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-primary/60 text-white p-2 rounded-full shadow-xl ${styles.mainButton} ${isOpen ? styles.open : ''}`}
            >
                <IconArrowRight size={52} />
            </button>

            {/* Boutons secondaires */}
            <div className={styles.secondaryButtonsContainer}>
                {secondaryButtons.map((button, index) => {
                    const { x, y } = getButtonPosition(index, secondaryButtons.length);
                    return (
                        <Link
                            href={`/shop/${shop.id}/menu/?mode=${button.link}`}
                            key={button.id}
                            className={`${styles.secondaryButton} ${button.color} text-white`}
                            onClick={() => setIsOpen(false)}
                            style={{
                                transform: isOpen ? `translate(${x}rem, ${y}rem)` : 'translate(0, 0)',
                                opacity: isOpen ? 1 : 0,
                                transition: 'all 0.3s ease-in-out',
                            }}
                            title={button.label}
                        >
                            <button.icon aria-label={button.label} size={28} stroke={1.2} />
                        </Link>

                    );
                })}
            </div>
        </div>
    );
};

export default ShopActionButton;