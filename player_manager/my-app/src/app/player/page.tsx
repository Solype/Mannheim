// src/app/player/page.tsx
"use client";

import React from 'react';
import { useParams } from 'next/navigation';

const Player = () => {
    const params = useParams();

    // Vérification de la disponibilité de router.query avant de déstructurer
    console.log(params);
    return (
        <div>
            <h1>Player Page</h1>
        </div>
    );
};

export default Player;
