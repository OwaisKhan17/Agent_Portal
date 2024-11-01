import SideBarNav from "components/SideBarNav";
import TopBarNav from "components/TopBarNav";
import { getServerSession } from "next-auth";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";

export default async function MainLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log("I am Main Layout");
  return (
    <div className="pl-[330px]">
      <TopBarNav session={session} />
      <div className="flex flex-row">
        <SideBarNav />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
