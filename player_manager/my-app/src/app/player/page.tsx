"use client";

import { useSearchParams } from 'next/navigation';
import Tools from '@/components/Tools';

const PlayerPage: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || "";

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Tools />
            <h1>{name}</h1>
        </main>
    );
};

export default PlayerPage;
