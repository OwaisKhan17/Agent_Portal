// components/Navbar.js

import { getServerSession } from "next-auth";
import { hasAccess } from 'utils/auth';
import Link from 'next/link';
import LanguageSelector from "./LanguageSelector";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";
import Logout from "./Logout";

const TopBarNav = async () => {

    const session = await getServerSession(authOptions);

    return (
        <nav className="bg-purple-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Agent Portal</h1>
                <ul className="flex space-x-6">
                    {session && hasAccess(session.userData?.role, ["admin", "user"]) && (
                        <li>
                            <Link href="/dashboard" className="hover:text-blue-300">Home</Link>
                        </li>
                    )}

                    {session && hasAccess(session.userData?.role, ["admin", "user"]) && (
                        <li>
                            <Link href="/about" className="hover:text-blue-300">About</Link>
                        </li>
                    )}

                    {session && hasAccess(session.userData?.role, ["admin", "user"]) && (
                        <li>
                            <Link href="/services" className="hover:text-blue-300">Services</Link>
                        </li>
                    )}

                    {session && hasAccess(session.userData?.role, ["admin"]) && (
                        <li>
                            <Link href="/contact" className="hover:text-blue-300">Contact</Link>
                        </li>
                    )}

                    <Logout />
                    <LanguageSelector />

                </ul>
            </div>
        </nav>
    );
};

export default TopBarNav;
