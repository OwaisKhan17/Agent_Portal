import { notFound } from "next/navigation";
import Dashboard from "../dashboard/page";
import Notifications from "../notifications/page";

const pages = {
  dashboard: Dashboard,
  notifications: Notifications,
};

export default function Page({ params }) {
  const PageComponent = pages[params.page];
  console.log("PageComponent");
  if (!PageComponent) {
    notFound();
  }

  return <PageComponent />;
}
