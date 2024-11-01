import { redirect } from 'next/navigation';
import AuthLayout from "./auth/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "app/[lang]/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <AuthLayout />;
  }
  redirect('/dashboard'); 
}
