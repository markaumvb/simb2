"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuthContext } from "@/providers/auth-provider";
import { TenantProvider } from "@/providers/tenant-provider";
import { Button } from "@/components/ui/button";
import { useTenantDetails } from "@/hooks/use-tenant-details";

// Componente para exibir informações do usuário (agora dentro do contexto correto)
function UserInfo() {
  const { user, logout } = useAuthContext();
  const { data: tenant, isLoading: tenantLoading } = useTenantDetails(
    user?.tenantId
  );

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">SIMB</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">{user?.name || "Usuário"}</p>
          <p className="text-gray-500 text-xs">
            {tenantLoading
              ? "Carregando..."
              : `Tenant: ${
                  tenant?.nome || tenant?.id || `ID: ${user?.tenantId}`
                }`}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-red-500 hover:text-red-700"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}

// Conteúdo interno protegido (usa AuthContext quando já disponível)
function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TenantProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 bg-white border-b p-4">
          <UserInfo />
        </header>
        <div className="flex flex-1">
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </TenantProvider>
  );
}

// Layout principal que providencia o contexto de autenticação
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
