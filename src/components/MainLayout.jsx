import SideBarNav from "./SideBarNav";
import TopBarNav from "./TopBarNav";

export default function MainLayout({ children }) {
  return (
    <div className="w-full">
      <TopBarNav />
      <div className="flex justify-start items-start">
        <aside>
            <SideBarNav/>
        </aside>
        
        <main>{children}</main>
      </div>
    </div>
  );
}
