import { TenantProvider } from "../providers/tenant-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TenantProvider>
      <div className="flex h-screen overflow-hidden"></div>
    </TenantProvider>
  );
}
