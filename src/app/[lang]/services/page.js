// components/Services.js

import TopBarNav from "components/TopBarNav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ServicesPage = () => {
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
                    <h1 className="text-4xl font-bold">Our Services</h1>
                </header>
                <main className="p-6">
                    <section>
                        <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
                        <p className="mb-4">
                            Our diverse range of services are tailored to meet the specific needs of our clients.
                            Here are some of the key services we provide:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Consulting:</strong> Expert advice to help you make informed decisions.</li>
                            <li><strong>Project Management:</strong> Ensuring your projects are delivered on time and within budget.</li>
                            <li><strong>Software Development:</strong> Custom software solutions to fit your business needs.</li>
                            <li><strong>Marketing Services:</strong> Strategies to enhance your brand visibility and reach.</li>
                        </ul>
                        <a href="/contact" className="text-blue-500 underline">Contact us for more details</a>
                    </section>
                </main>
            </div>
        </>
    );
};

export default ServicesPage;
