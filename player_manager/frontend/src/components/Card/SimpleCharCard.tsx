// // src/components/Card/SimpleCharCard.tsx
// import React from 'react';
// import ClickableHealthBar from '@/components/Card/ClickableHealthBar';
// import { HealthData } from '@/types';
// import Link from 'next/link';

// interface SimpleCharCardProps {
//     jsonData: HealthData;
//     onUpdateCurrent: (name: string, monitor: string, newCurrent: number) => Promise<void> | null;
// }

// const SimpleCharCard: React.FC<SimpleCharCardProps> = ({ jsonData, onUpdateCurrent }) => {
//     return (
//         <div className="rounded-lg bg-gray-600 px-5 py-4 min-w-[180px]">
//             <Link href={{ pathname: `/player`, query: { name: jsonData["file"] }}}>
//                 <h2 className="mb-0 text-xl font-semibold text-center p-2 hover:bg-blue-700 rounded-lg transition-colors duration-300">
//                     {jsonData["name"]}
//                 </h2>
//             </Link>

//             <div className="space-y-2">
//                     <div>
//                         <p className="text-xs font-medium mb-1">Physique</p>
//                         <ClickableHealthBar
//                             current={jsonData["physical health"][0]}
//                             max={jsonData["physical health"][1]}
//                             onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "physical health", n)}
//                             barColor='bg-pink-500'
//                             backBarColor='bg-gray-500'
//                         />
//                     </div>
//                     <div>
//                         <p className="text-xs font-medium mb-1">Endurance</p>
//                         <ClickableHealthBar
//                             current={jsonData["endurance health"][0]}
//                             max={jsonData["endurance health"][1]}
//                             onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "endurance health", n)}
//                             barColor='bg-yellow-500'
//                             backBarColor='bg-gray-500'
//                         />
//                     </div>
//                     <div>
//                         <p className="text-xs font-medium mb-1">Mental</p>
//                         <ClickableHealthBar
//                             current={jsonData["mental health"][0]}
//                             max={jsonData["mental health"][1]}
//                             onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "mental health", n)}
//                             barColor='bg-blue-500'
//                             backBarColor='bg-gray-500'
//                         />
//                     </div>
//                     <div>
//                         <p className="text-xs font-medium mb-1">Pathologique</p>
//                         <ClickableHealthBar
//                             current={jsonData["pathological health"][0]}
//                             max={jsonData["pathological health"][1]}
//                             onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "pathological health", n)}
//                             barColor='bg-green-500'
//                             backBarColor='bg-gray-500'
//                         />
//                     </div>
//                     <div>
//                         <p className="text-xs font-medium mb-1">Mana</p>
//                         <ClickableHealthBar
//                             current={jsonData["mana"][0]}
//                             max={jsonData["mana"][1]}
//                             onUpdateCurrent={(n: number) => onUpdateCurrent(jsonData["file"], "mana", n)}
//                             barColor='bg-purple-500'
//                             backBarColor='bg-gray-500'
//                         />
//                     </div>
//             </div>
//         </div>
//     );
// };

// export default SimpleCharCard;
