import { isAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "./dashboard";
import { AdminLoginForm } from "./login-form";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const authed = await isAdmin();
  const { e } = await searchParams;

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <AdminLoginForm showError={e === "1"} />
      </div>
    );
  }

  const [shows, releases] = await Promise.all([
    prisma.show.findMany({ orderBy: { date: "asc" } }),
    prisma.release.findMany({
      orderBy: [{ year: "desc" }, { title: "asc" }],
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AdminDashboard shows={shows} releases={releases} />
    </div>
  );
}
