"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuthContext } from "@/providers/auth-provider";
import { TenantProvider } from "@/providers/tenant-provider";

// Componente para proteger rotas
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Mostra nada enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza o conteúdo
  if (!isAuthenticated) {
    return null;
  }

  // Se estiver autenticado, renderiza dentro do TenantProvider
  return <TenantProvider>{children}</TenantProvider>;
}

// Layout do Dashboard com providers necessários
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedLayout>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 bg-white  border-b p-4">
            <UserInfo />
          </header>
          <div className="flex flex-1">
            <nav className="w-64 border-r p-4 hidden md:block">
              {/* Sidebar vai aqui */}
              <p className="font-medium mb-4">Menu</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/dashboard"
                    className="text-blue-600 hover:underline"
                  >
                    Dashboard
                  </a>
                </li>
                {/* Outros links do menu */}
              </ul>
            </nav>
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </ProtectedLayout>
    </AuthProvider>
  );
}

// Componente para exibir informações do usuário
function UserInfo() {
  const { user, logout } = useAuthContext();
  const { currentTenant } = useTenant();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold">SIMB</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="font-medium">{user?.name || "Usuário"}</p>
          <p className="text-gray-500 text-xs">
            Tenant: {currentTenant?.nome || `ID: ${user?.tenantId}`}
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

// Importando o botão depois de usá-lo para evitar erro de referência
import { Button } from "@/components/ui/button";
import { useTenant } from "@/providers/tenant-provider";
