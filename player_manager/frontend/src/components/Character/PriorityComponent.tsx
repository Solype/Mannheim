// import React, { useState } from 'react';
// import { Priority } from '@/types';
// import Dialog from '@/components/Utils/DialogsProps';

// interface PriorityComponentProps {
//     priority: Priority;
//     file: string;
// }

// const PriorityComponent: React.FC<PriorityComponentProps> = ({ priority, file }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPriority, setSelectedPriority] = useState<string>("");

//     if (!priority) return null;

//     const closePopup = () => {
//         setIsModalOpen(false);
//     }
//     const openPopup = (priority: string) => {
//         setSelectedPriority(priority);
//         setIsModalOpen(true);
//     }
//     const className = "flex justify-between hover:cursor-pointer hover:text-blue-500 hover:underline"

//     return (
//         <div className="priority-section">
//             <h3 className="text-2xl font-bold mb-4">Priority</h3>
//             <ul className="space-y-2">
//                 {Object.entries(priority).map(([key, value]) => (
//                     <li key={key} className={className} onClick={() => openPopup(key)}>
//                         <span className="capitalize">{key}</span>
//                         <span>{value}</span>
//                     </li>
//                 ))}
//             </ul>
//             <Dialog
//                 url={`${ __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`}/player/${file}/priority`}
//                 isOpen={isModalOpen} title={selectedPriority}
//                 close={closePopup}
//             />
//         </div>
//     );
// };

// export default PriorityComponent;
