"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./auth-provider";

type Tenant = {
  id: number;
  nome: string;
};

type TenantContextType = {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant) => void;
  isLoading: boolean;
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    // Carrega o tenant com base no usuário autenticado
    const loadTenant = async () => {
      try {
        setIsLoading(true);

        if (isAuthenticated && user?.tenantId) {
          // Em produção, você poderia buscar mais detalhes do tenant da API
          // Por enquanto, vamos apenas usar o ID do usuário
          setCurrentTenant({
            id: user.tenantId,
            nome: `Tenant ${user.tenantId}`, // Placeholder, idealmente buscar da API
          });
        } else {
          setCurrentTenant(null);
        }
      } catch (error) {
        console.error("Erro ao carregar tenant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, [isAuthenticated, user]);

  // Fornece o contexto do tenant para a aplicação
  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        setCurrentTenant,
        isLoading,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

// Hook para consumir o contexto do tenant
export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant deve ser usado dentro de um TenantProvider");
  }
  return context;
}
