// components/Navbar.js
'use client';
import { hasAccess } from "utils/auth";
import Link from "next/link";
import Image from "next/image";
import LanguageSelector from "./LanguageSelector";
import Logout from "./Logout";
import ProfileImage from "./../../public/images/profile-img.jpg"
import { NotificationIcon, SearchIcon } from "./svgIcons/icons";
import { usePathname } from 'next/navigation';


const TopBarNav = ({session}) => {
  const pathName = usePathname();
  const pageName = pathName.split('/').pop() || '';

  return (
    <nav className="bg-white py-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold capitalize">{pageName}</h1>

        <div className="flex gap-x-6 items-center">
          <button className="bg-white rounded-full w-11 h-11 shadow-lg shadow-[#8E8E8E45] text-center">
            <SearchIcon/>
          </button>

          <button className="bg-white rounded-full w-11 h-11 shadow-lg shadow-[#8E8E8E45] text-center">
            <NotificationIcon/>
          </button>

          <Link href="#" className="flex px-2.5 py-2.5 gap-4 items-center justify-between shadow-lg shadow-[#8E8E8E45] rounded-2xl">
            <Image src={ProfileImage} width={"32"} height={"32"} 
            className="rounded-full w-8	h-8" alt="Profile Image"/>
            <div className="flex flex-col">
                <span className="text-[#8E8E8E] text-base font-medium">{session.userData?.firstName} {session.userData?.lastName}</span>
                <span className="text-[#133664] text-sm font-normal">View profile</span>
            </div>
          </Link>

        </div>

        {/* <ul className="flex space-x-6">
          {session && hasAccess(session.userData?.role, ["admin", "user"]) && (
            <li>
              <Link href="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
            </li>
          )}

          {session && hasAccess(session.userData?.role, ["admin", "user"]) && (
            <li>
              <Link href="/transaction" className="hover:text-blue-300">
                Transaction
              </Link>
            </li>
          )}

          {session && hasAccess(session.userData?.role, ["admin", "user"]) && (
            <li>
              <Link href="/services" className="hover:text-blue-300">
                Services
              </Link>
            </li>
          )}

          {session && hasAccess(session.userData?.role, ["admin"]) && (
            <li>
              <Link href="/contact" className="hover:text-blue-300">
                Contact
              </Link>
            </li>
          )}

          <Logout />
          <LanguageSelector />
        </ul> */}
      </div>
    </nav>
  );
};

export default TopBarNav;
