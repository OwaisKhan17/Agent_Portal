import { getServerSession } from "next-auth";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";
import MainLayout from "../layout/page";

const SendMoney = async () => {
  const session = await getServerSession();
  const columns = ["firstName", "age"];
  const apiUrl = "/api/users";

  if (!session) {
    return (
      <div>
        <h1>You are not authorized to view this page.</h1>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container"></div>
    </MainLayout>
  );
};

export default SendMoney;
