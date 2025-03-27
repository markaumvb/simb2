// Em apps/web/src/hooks/use-tenant-details.ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export function useTenantDetails(tenantId: number | undefined) {
  return useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: () => apiClient.get(`/tenants/${tenantId}`),
    enabled: !!tenantId, // Só executa se tenantId existir
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
}
