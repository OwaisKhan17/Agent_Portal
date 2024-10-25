'use client';

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <span onClick={() => signOut()} style={{ cursor: "pointer", color: "blue" }}>
            Logout
        </span>
    );
}
