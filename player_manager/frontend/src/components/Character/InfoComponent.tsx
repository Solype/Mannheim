// import React, { useState } from 'react';
// import { Infos } from '@/types';
// import Dialog from '@/components/Utils/DialogsProps';

// interface InfoComponentProps {
//     infos: Infos | undefined;
//     file: string | undefined;
// }

// const InfoComponent: React.FC<InfoComponentProps> = ({ infos, file }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalContent, setModalContent] = useState('');
//     const [selectedInfo, setSelectedInfo] = useState<string>("");

//     if (!infos) return null;

//     const openPopup = (infoType: string) => {
//         setSelectedInfo(infoType);
//         setIsModalOpen(true);
//     };


//     const closePopup = () => {
//         setIsModalOpen(false);
//     };

//     const className = "flex justify-between hover:cursor-pointer hover:text-blue-500 hover:underline"

//     return (
//         <div className="info-section">
//             <h3 className="text-2xl font-bold mb-4">Informations</h3>
//             <ul className="space-y-2">
//                 <li className={className} onClick={() => openPopup('name')}>
//                     <span className="capitalize">Name</span>
//                     <span>{infos.name}</span>
//                 </li>
//                 <li className={className} onClick={() => openPopup('age')}>
//                     <span className="capitalize">Age</span>
//                     <span>{infos.age}</span>
//                 </li>
//                 <li className={className} onClick={() => openPopup('gender')}>
//                     <span className="capitalize">Gender</span>
//                     <span>{infos.gender}</span>
//                 </li>
//                 <li className={className} onClick={() => openPopup('race')}>
//                     <span className="capitalize">Race</span>
//                     <span>{infos.race}</span>
//                 </li>
//             </ul>

//             <Dialog
//                 url={`${ __DOCKER_HOST_IP__ ? `http://${__DOCKER_HOST_IP__}:8080` : `http://${__MY_LOCAL_IP__}:8080`}/player/${file}/infos`}
//                 isOpen={isModalOpen}
//                 title={selectedInfo}
//                 close={closePopup}
//             />
//         </div>
//     );
// };

// export default InfoComponent;
