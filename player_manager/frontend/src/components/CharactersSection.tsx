// // src/components/Characters.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import SimpleCharCard from "@/components/Card/SimpleCharCard";
// import io from 'socket.io-client';

// interface CharactersProps {}

// const Characters: React.FC<CharactersProps> = () => {
//     const [data, setData] = useState<[]>([]);
//     const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'); // Connect to your Flask server

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`${ __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`}/players/health`);
//                 if (!response.ok) {
//                     throw new Error('Réponse réseau incorrecte');
//                 }
//                 const jsonData = await response.json();
//                 if (jsonData.status === 'success') {
//                     setData(jsonData.content);
//                     console.log(jsonData.content);
//                 } else {
//                     console.error('Erreur de l\'API:', jsonData);
//                 }
//             } catch (error) {
//                 console.error('Erreur lors de la requête:', error);
//             }
//         };

//         fetchData();

//         socket.on('updateData', () => {
//             fetchData();
//         });

//         return () => {
//             socket.off('updateData');
//         };
//     }, []);

//     const onUpdateMonitor = async (name: string, monitor: string, newCurrent: number) => {
//         console.log(name, monitor, newCurrent);

//         const response = await fetch(`${ __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`}/player/${name}/monitor`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 monitor: monitor,
//                 value: newCurrent,
//                 type: 'update'
//             })
//         });

//         if (!response.ok) {
//             console.error('Erreur lors de la requête:', response.statusText);
//         } else {
//             const jsonResponse = await response.json();
//             if (jsonResponse.status === 'success') {
//                 console.log('Mise à jour réussie');
//                 socket.emit('updateMonitor', { name, monitor, newCurrent });
//             } else {
//                 console.error('Erreur lors de la mise à jour:', jsonResponse);
//             }
//         }
//     };

//     return (
//         <>
//             <div className="flex flex-col items-center">
//                 <h2 className="text-3xl font-bold mb-4">Characters</h2>
//                 <div className="flex flex-wrap gap-4 justify-center">
//                     {data.map((item, index) => (
//                         <div key={index} className="flex justify-center">
//                             <SimpleCharCard
//                                 key={index}
//                                 jsonData={item}
//                                 onUpdateCurrent={onUpdateMonitor}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Characters;
