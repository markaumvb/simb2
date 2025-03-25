"use client";

import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    // Aqui faremos a lógica para obter o tenant atual
    // Isso pode vir de um cookie, localStorage, ou da sessão do usuário
    const loadTenant = async () => {
      try {
        // Para o setup inicial, simulamos o carregamento de um tenant
        // Em produção, isso viria do backend
        setTimeout(() => {
          setCurrentTenant({
            id: 1,
            nome: "Empresa Demo",
          });
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Erro ao carregar tenant:", error);
        setIsLoading(false);
      }
    };

    loadTenant();
  }, []);

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
