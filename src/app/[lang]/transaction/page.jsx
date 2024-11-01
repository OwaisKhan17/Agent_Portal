import { getServerSession } from "next-auth";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";
import MainLayout from "../layout/page";
import TableComponent from "components/Table/Table";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const columns = [
    {name: "Name", uid: "firstName"},
    {name: "Age", uid: "age"},
    {name: "Role", uid: "role"},
    {name: "Email", uid: "email"},
    {name: "ACTIONS", uid: "actions"},
  ];
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
      <div className="container">
        <TableComponent columns={columns} rowsPerPage={5} apiUrl={apiUrl} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
