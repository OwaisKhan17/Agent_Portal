import { getServerSession } from "next-auth";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";
import MainLayout from "../layout/page";
import { GetUserInfo } from "lib/actions/authActions";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>You are not authorized to view this page.</h1>
      </div>
    );
  }

  // if (session) {
  //   console.log("SESSION SESSION SESSION");
  //   GetUserInfo(
  //     session.accessToken,
  //     session.userData.username,
  //     session.userData.uniqueIdentifier,
  //     session.userData.portalID
  //   );
  // }

  console.log("sessionsessionsessionsession", session);

  return (
    <MainLayout>
      <div className="container">
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
    </MainLayout>
  );
};

export default Dashboard;
