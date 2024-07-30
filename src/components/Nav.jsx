import React from "react";
import { FaBars, FaChevronLeft } from "react-icons/fa";

const Nav = ({ isLibOpen, setIsLibOpen }) => {
 
  const handleLibClick = () => {
    setIsLibOpen((isLibOpen) => !isLibOpen);
  };

  return (
    <div className="min-h-[10vh] flex justify-around items-center">
      <nav className="flex justify-between items-center w-full px-4">
        <h1 className="text-xl font-bold">Waves</h1>
        <button
          onClick={handleLibClick}
          className="bg-transparent w-[50px] rounded-[10%] cursor-pointer border-none p-2 transition-all duration-300 ease-in-out hover:text-[#03a9f4]"
        >
          {isLibOpen ? <FaChevronLeft size={24} /> : <FaBars size={24} />}
        </button>
      </nav>
    </div>
  );
};

export default Nav;
