// src/app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import SimpleCharCard from "../components/SimpleCharCard";
import NumberInputPopup from "../components/NumberInput";
import io from 'socket.io-client';

export default function Home() {
    const [data, setData] = useState<[]>([]);
    const socket = io('http://192.168.1.128:5000'); // Connect to your Flask server

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.128:5000/players/health');
                if (!response.ok) {
                    throw new Error('Réponse réseau incorrecte');
                }
                const jsonData = await response.json();
                if (jsonData.status === 'success') {
                    setData(jsonData.content);
                    console.log(jsonData.content);
                } else {
                    console.error('Erreur de l\'API:', jsonData);
                }
            } catch (error) {
                console.error('Erreur lors de la requête:', error);
            }
        };

        fetchData();

        socket.on('updateData', () => {
            fetchData();
        });

        return () => {
            socket.off('updateData');
        };
    }, []);

    const onUpdateMonitor = async (name: string, monitor: string, newCurrent: number) => {
        console.log(name, monitor, newCurrent);

        const response = await fetch(`http://192.168.1.128:5000/player/${name}/monitor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                monitor: monitor,
                value: newCurrent,
                type: 'update'
            })
        });

        if (!response.ok) {
            console.error('Erreur lors de la requête:', response.statusText);
        } else {
            const jsonResponse = await response.json();
            if (jsonResponse.status === 'success') {
                console.log('Mise à jour reussie');
                socket.emit('updateMonitor', { name, monitor, newCurrent });
            } else {
                console.error('Erreur lors de la mise à jour:', jsonResponse);
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left gap-x-4 gap-y-4">
                {data.map((item, index) => (
                    <SimpleCharCard
                        key={index}
                        jsonData={item}
                        onUpdateCurrent={onUpdateMonitor}
                    />
                ))}
            </div>
        </main>
    );
}
