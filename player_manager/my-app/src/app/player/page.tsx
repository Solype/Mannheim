"use client";

import { useSearchParams } from 'next/navigation';
import Tools from '@/components/Tools';
import { useEffect, useState } from 'react';
import AttributesComponent from '@/components/Character/AttributesComponent';
import InfoComponent from '@/components/Character/InfoComponent';
import MonitorComponent from '@/components/Character/MonitorComponent';
import SkillsComponent from '@/components/Character/SkillsComponent';
import RolesComponent from '@/components/Character/RolesComponent';
import ReligionComponent from '@/components/Character/ReligionComponent';
import PriorityComponent from '@/components/Character/PriorityComponent';
import OtherComponent from '@/components/Character/OtherComponent';
import { Attributes, Infos, Monitor, Other, Priority, Religion, Roles, Skills } from '@/types';

interface PlayerData {
    attributes?: Attributes;
    file: string;
    infos?: Infos;
    monitor?: Monitor;
    priority?: Priority;
    religion?: Religion;
    roles?: Roles;
    skills?: Skills;
    other?: Other;
    [key: string]: any;
}


const PlayerPage: React.FC = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || "";

    const [data, setData] = useState<PlayerData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/player/${name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                if (jsonData.status === 'success') {
                    setData(jsonData.content);
                    console.log(jsonData.content);
                } else {
                    console.error('API error:', jsonData);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [name]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
            <Tools />
            <h1 className="text-center text-6xl font-bold mb-8">{data?.infos?.name}</h1>
            <h2 className="text-center text-2xl font-bold mb-8">{name}.json</h2>
            {data ? (
                <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
                    <div className="md:w-1/6 min-w-[200px]">
                        {data.infos && data.file && <InfoComponent infos={data.infos} file={data.file} />}
                        {data.priority && <PriorityComponent priority={data.priority} />}
                        {data.attributes && <AttributesComponent attributes={data.attributes} />}
                        {data.roles && <RolesComponent roles={data.roles} />}
                        {data.monitor && <MonitorComponent monitor={data.monitor} />}
                        {data.religion && <ReligionComponent religion={data.religion} />}
                        {data.other && <OtherComponent other={data.other} />}
                    </div>
                    <div className="border-l-2 border-gray-400"></div>
                    <div className="md:w-1/6 min-w-[200px]">
                        {data.skills && <SkillsComponent skills={data.skills} file={data.file} />}
                    </div>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </main>
    );
};

export default PlayerPage;
