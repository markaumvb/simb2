import { useAuthContext } from "@/providers/auth-provider";
import { useTenant } from "@/providers/tenant-provider";
import { LogOut } from "lucide-react";

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
