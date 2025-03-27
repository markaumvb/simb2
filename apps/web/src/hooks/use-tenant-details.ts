import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Tenant } from "@/types/tenant";

export function useTenantDetails(tenantId: number | undefined) {
  return useQuery<Tenant>({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      const response = await apiClient.get<Tenant>(`/tenants/${tenantId}`);
      return response;
    },
    enabled: !!tenantId, // Só executa se tenantId existir
    staleTime: 1000 * 60 * 60, // Cache por 5 minutos
  });
}
