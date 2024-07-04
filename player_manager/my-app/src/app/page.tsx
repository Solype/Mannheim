// src/app/page.tsx
"use client";

import React from 'react';
import Tools from '@/components/Tools';
import Characters from '@/components/CharactersSection';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Tools />
            <hr className="my-8 w-full border-t-2 border-gray-300" />
            <Characters />
        </main>
    );
}
