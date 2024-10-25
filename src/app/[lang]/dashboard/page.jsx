import { getServerSession } from "next-auth";
import Image from "next/image";
import TopBarNav from "components/TopBarNav";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";


const Dashboard = async () => {
  const session = await getServerSession(authOptions);

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
      <div>
        <h1>Dashboard</h1>
        <p>
          Welcome, {session.userData?.firstName} {session.userData?.lastName}!
        </p>
        <p>Username: {session.userData?.username}</p>
        <p>Email: {session.userData?.email}</p>
        <p>Gender: {session.userData?.gender}</p>
        <img
          src={session.userData?.image}
          alt={`${session.userData?.firstName} ${session.userData?.lastName}`}
        />
      </div>
    </>
  );
};

export default Dashboard;
