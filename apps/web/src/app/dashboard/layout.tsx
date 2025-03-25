import { Sidebar } from "@/components/layouts/sidebar";
import { Header } from "@/components/layouts/header";
import { TenantProvider } from "@/providers/tenant-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TenantProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </TenantProvider>
  );
}
