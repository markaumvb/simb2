// src/hooks/use-tipo-mesas.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

// Definição dos tipos
export interface TipoMesa {
  id: number;
  descricao: string;
  dt_inclusao: string;
  dt_alteracao: string;
  composicao: boolean;
  tenant_id: number;
}

export type CreateTipoMesaInput = Pick<TipoMesa, "descricao" | "composicao">;
export type UpdateTipoMesaInput = Partial<CreateTipoMesaInput>;

// Hook para listar tipos de mesa
export function useTipoMesasQuery() {
  return useQuery({
    queryKey: ["tipo-mesas"],
    queryFn: async () => {
      const response = await apiClient.get<TipoMesa[]>("/tipo-mesas");
      return response;
    },
  });
}

// Hook para criar novo tipo de mesa
export function useCreateTipoMesa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTipoMesaInput) => {
      const response = await apiClient.post<TipoMesa>("/tipo-mesas", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipo-mesas"] });
    },
  });
}
