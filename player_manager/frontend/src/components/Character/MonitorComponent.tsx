// import React from 'react';
// import { Monitor } from '@/types';

// interface MonitorComponentProps {
//     monitor: Monitor;
// }

// const MonitorComponent: React.FC<MonitorComponentProps> = ({ monitor }) => {
//     if (!monitor) return null;

//     return (
//         <div className="monitor-section">
//             <h3 className="text-2xl font-bold mb-4">Monitor</h3>
//             <ul className="space-y-2">
//                 {Object.entries(monitor).map(([key, values]) => (
//                     <li key={key} className="flex justify-between">
//                         <span className="capitalize">{key}</span>
//                         <span>{values.join(' / ')}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MonitorComponent;
