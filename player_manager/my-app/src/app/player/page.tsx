// src/app/player/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Player = () => {
    const router = useRouter();
    const { name } = router.query;

    console.log(name);
    return (
        <div>
            <h1>Player Page</h1>
        </div>
    );
};

export default Player;
