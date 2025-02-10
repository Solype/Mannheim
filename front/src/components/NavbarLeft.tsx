import React from 'react';
import { GiBowman, GiBrute } from "react-icons/gi";
import { MdExplore, MdMeetingRoom } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavbarLeft: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 h-full bg-foret text-white overflow-hidden transition-all duration-300 group w-20 hover:w-56 z-40">
            <div 
                className="absolute inset-0 bg-repeat" 
                style={{
                    backgroundImage: "url(/bg_leaf_bis.png)",
                    backgroundSize: "130px 130px",
                    backgroundRepeat: "repeat",
                    opacity: 0.1,
                    zIndex: -1
                }}
            ></div>
            <ul className="flex flex-col p-4 space-y-3 mt-20">
                {/* <Link to={"/dashboard"} className="hover:bg-light_foret/50 p-2 rounded flex items-center">
                    <GiMagicGate className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 whitespace-nowrap">Dashboard</span>
                </Link> */}
                <Link to={"/characters"} className="hover:bg-light_foret/50 p-2 rounded flex items-center">
                    <GiBowman className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 whitespace-nowrap">Personnages</span>
                </Link>
                <Link to={"/creatures"} className="hover:bg-light_foret/50 p-2 rounded flex items-center">
                    <GiBrute className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 whitespace-nowrap">Créatures</span>
                </Link>
                <Link to={"/lores"} className="hover:bg-light_foret/50 p-2 rounded flex items-center">
                    <MdExplore className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 whitespace-nowrap">Lores</span>
                </Link>
                <Link to={"/rooms"} className="hover:bg-light_foret/50 p-2 rounded flex items-center">
                    <MdMeetingRoom className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 whitespace-nowrap">Rooms</span>
                </Link>
                {/* <Link to={"/rules"} className="hover:bg-light_foret/50 p-2 rounded flex items-center">
                    <FaBookQuran className="w-6 h-6 flex-shrink-0" />
                    <span className="ml-4 hidden group-hover:inline-block transition-opacity duration-300 whitespace-nowrap">Règles</span>
                </Link> */}
            </ul>
        </div>
    );
};

export default NavbarLeft;

