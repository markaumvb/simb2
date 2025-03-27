"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuthContext } from "@/providers/auth-provider";
import { TenantProvider, useTenant } from "@/providers/tenant-provider";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Package,
  DollarSign,
  Settings,
  LogOut,
  Table2,
} from "lucide-react";
import Link from "next/link";

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
          <header className="sticky top-0 z-10 bg-white border-b p-4">
            <UserInfo />
          </header>
          <div className="flex flex-1">
            <nav className="w-64 border-r p-4 hidden md:block">
              <Sidebar />
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
  const { currentTenant, isLoading: tenantLoading } = useTenant();

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
              : `Empresa: ${
                  currentTenant?.nome ||
                  currentTenant?.id ||
                  `ID: ${user?.tenantId}`
                }`}
          </p>
        </div>

        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
          title="Sair"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}

// Definição dos itens do menu
const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Mesas",
    icon: Table2,
    href: "/dashboard/mesas",
  },
  {
    title: "Clientes",
    icon: Users,
    href: "/dashboard/clientes",
  },
  {
    title: "Pedidos",
    icon: ClipboardList,
    href: "/dashboard/pedidos",
  },
  {
    title: "Produtos",
    icon: Package,
    href: "/dashboard/produtos",
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    href: "/dashboard/financeiro",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/configuracoes",
  },
];

// Componente de Sidebar
function Sidebar() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="space-y-6">
      <div>
        <p className="font-medium mb-4">Menu</p>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors ${
                  pathname === item.href
                    ? "bg-gray-100 text-blue-600 font-medium"
                    : ""
                }`}
              >
                <item.icon size={18} />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
