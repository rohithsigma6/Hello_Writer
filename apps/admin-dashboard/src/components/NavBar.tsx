// import { useEffect, useRef, useState } from "react";
import Logo from "@/assets/navbar/logo.svg";
import Desktop from "@/assets/navbar/desktopIcon.svg";
import defaultProfileImage from "@/assets/navbar/defaultProfile.svg";
import notificationbell from "@/assets/navbar/notifyBell.svg";
import { FiSearch } from "react-icons/fi";

const NavBar = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const dropdownRef: any = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className='w-full bg-white font-["Poppins"] font-semibold px-8 py-3 flex flex-row items-center justify-between shadow-lg shadow-slate-200 sticky top-0 z-10'
      // ref={dropdownRef}
    >
      <div className="flex gap-10">
        <section className={'flex flex-row gap-6 items-start'}>
          <img src={Logo} alt="ScreePlay.INK" className="object-contain h-10 my-1" />
        </section>

        <section className="flex flex-row gap-10">
          <button className="flex flex-row gap-1.5 items-center">
            <img src={Desktop} alt="Dashboard" className="w-5 h-5" />
            Dashboard
          </button>
        </section>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex flex-row items-center relative">
          <input type="text" name="search" id="" className="py-2 px-4 rounded-xl bg-[#E9E9EA] font-normal pr-10" placeholder="Search" />
          <span className="absolute right-4 text-xl">
            <FiSearch />
          </span>
        </div>
        <button className="relative">
          <div className="w-3 h-3 rounded-full bg-red-600 absolute right-0.5 top-0.5"></div>
          <img src={notificationbell} alt="Profile Image" className="w-10 h-10 rounded-full" />
        </button>
        <button>
          <img src={defaultProfileImage} alt="Profile Image" className="w-12 h-12 rounded-full" />
        </button>
      </div>
    </div>
  )
}

export default NavBar