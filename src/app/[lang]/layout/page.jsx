import SideBarNav from "components/SideBarNav";
import TopBarNav from "components/TopBarNav";
import { getServerSession } from "next-auth";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";
import { GetUserInfo } from "lib/actions/authActions";

export default async function MainLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="rtl:pr-[330px] rtl:pl-0 pl-[330px]">
      <TopBarNav session={session} />
      <div className="flex flex-row">
        <SideBarNav />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
