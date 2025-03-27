import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Tenant } from "@/types/tenant";

export function useTenantDetails(tenantId: number | undefined) {
  return useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      if (!tenantId) return null;
      return apiClient.get<Tenant>(`/tenants/${tenantId}`);
    },
    enabled: !!tenantId, // Só executa se tenantId existir
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
}
