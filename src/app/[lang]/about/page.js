// components/About.js

import TopBarNav from "components/TopBarNav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const AboutPage = () => {
    const session = getServerSession(authOptions);

    if (!session) {
        return (
            <div>
                <h1>You are not authorized to view this page.</h1>
            </div>
        );
    }

    return (
        <>
            {session ? <TopBarNav /> : null}
            <div className="bg-gray-100">
                <header className="bg-purple-900 text-white p-6">
                    <h1 className="text-4xl font-bold">About Us</h1>
                </header>
                <main className="p-6">
                    <section>
                        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                        <p className="mb-4">
                            To deliver exceptional services that exceed our clients expectations. We believe in
                            fostering strong relationships and understanding the unique needs of each client.
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
                        <p className="mb-4">
                            Our team consists of industry experts with diverse backgrounds. We collaborate closely
                            to ensure that we provide innovative solutions and outstanding results.
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="text-3xl font-semibold mb-4">Core Values</h2>
                        <ul className="list-disc pl-6">
                            <li>Integrity</li>
                            <li>Quality</li>
                            <li>Innovation</li>
                            <li>Customer-Centricity</li>
                        </ul>
                    </section>
                </main>
            </div>
        </>
    );
};

export default AboutPage;
