// import React, { useState } from 'react';
// import { Attributes } from '@/types';
// import Dialog from '@/components/Utils/DialogsProps';

// interface AttributesComponentProps {
//     attributes: Attributes;
//     file: string;
// }

// const AttributesComponent: React.FC<AttributesComponentProps> = ({ attributes, file}) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currency, setCurrency] = useState('');

//     if (!attributes) return null;

//     const openDialog = (key: string) => {
//         setCurrency(key);
//         setIsModalOpen(true);
//     };

//     const closeDialog = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="attributes-section">
//             <h3 className="text-2xl font-bold mb-4">Attributes</h3>
//             <ul className="space-y-2">
//                 {Object.entries(attributes).map(([key, value]) => (
//                     <li key={key} className="hover:cursor-pointer hover:text-blue-500 hover:underline flex justify-between items-center" onClick={() => openDialog(key)}>
//                         <span className="capitalize">{key}</span>
//                         <span>{value}</span>
//                     </li>
//                 ))}
//             </ul>
//             <Dialog
//                 isOpen={isModalOpen}
//                 title={currency}
//                 url={`${ __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`}/player/${file}/attribute`}
//                 close={closeDialog}
//             />
//         </div>
//     );
// };

// export default AttributesComponent;
