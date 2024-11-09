import React from 'react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavbarTop: React.FC = () => {
    return (
        <div className="fixed top-0 p-2 left-0 right-0 bg-foret text-white z-50 shadow-[0_0_18px_4px_rgba(255,255,255,0.2)]">
            <div 
                className="absolute inset-0 bg-repeat" 
                style={{
                    backgroundImage: "url(./bg_leaf_bis.png)",
                    backgroundSize: "130px 130px",
                    backgroundRepeat: "repeat",
                    opacity: 0.1,
                    zIndex: -1
                }}
            ></div>
            <div className="flex justify-between items-center px-4 relative z-10">
                <div className="text-xl font-bold">Mannheim</div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="bg-light_foret border-2 border-or p-1 rounded-full cursor-pointer">
                            <img src="./witch.png" alt="Profile" className="w-10 h-10 rounded-full" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="hover:bg-[#9AC1C1]" >
                        <DropdownMenuItem>
                            <Link to={"/profile"} className='flex items-center space-x-2 '>
                                <FaUser className="w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-foret">
                            <FaSignOutAlt className="w-4 h-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default NavbarTop;
