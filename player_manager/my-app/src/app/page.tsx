// src/app/page.tsx
"use client";

import React from 'react';
import Tools from '@/components/Tools';
import Characters from '@/components/CharactersSection';

export default function Home() {
    return (
        <div className="relative flex min-h-screen">
            <main className={`flex-grow flex flex-col items-center justify-between p-24 transition-all`}>
                <Characters />
            </main>
            <Tools />
        </div>
    );
}
