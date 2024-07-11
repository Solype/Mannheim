// src/app/page.tsx
"use client";

import React from 'react';
import Tools from '@/components/Tools';
import Characters from '@/components/CharactersSection';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Characters />
            <Tools />
        </main>
    );
}
