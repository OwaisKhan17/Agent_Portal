// components/Contact.js
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TopBarNav from "components/TopBarNav";

const Contact = () => {

  const session = getServerSession(authOptions);

  return (
    <>
      {session ? <TopBarNav /> : null}
      <div className="bg-gray-100">
        <header className="bg-purple-900 text-white p-6">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </header>
        <main className="p-6">
          <section>
            <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
            <form className="bg-white p-4 rounded shadow-md">
              <div className="mb-4">
                <label className="block mb-1" htmlFor="name">Name</label>
                <input className="border rounded w-full p-2" type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="email">Email</label>
                <input className="border rounded w-full p-2" type="email" id="email" placeholder="Your Email" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="message">Message</label>
                <textarea className="border rounded w-full p-2" id="message" rows="4" placeholder="Your Message" required></textarea>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Send Message</button>
            </form>
          </section>
          <section className="mt-8">
            <h2 className="text-3xl font-semibold mb-4">Our Location</h2>
            <p>123 Main Street, Suite 100</p>
            <p>Your City, Your State, ZIP Code</p>
          </section>
        </main>
      </div>
    </>
  );
};

export default Contact;
