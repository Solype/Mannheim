"use client";

import { useSearchParams } from 'next/navigation';

const PlayerPage: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || "";

    return (
        <>
            <h1>{name}</h1>
        </>
    );
};

export default PlayerPage;
