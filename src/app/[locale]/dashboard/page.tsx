import { cookies } from "next/headers";
import LogoutButton from "@/auth/components/LogoutButton";

export default async function DashboardPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return <div>You must be logged in</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
}