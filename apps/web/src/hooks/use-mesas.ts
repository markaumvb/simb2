// src/hooks/use-mesas.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Mesa } from "@/types/mesa";

// Tipos para as operações de mesa
export type CreateMesaInput = Omit<Mesa, "id" | "tipomesa">;
export type UpdateMesaInput = Partial<Omit<Mesa, "tipomesa">>;

// Hook para consultar todas as mesas
export function useMesasQuery() {
  return useQuery({
    queryKey: ["mesas"],
    queryFn: async () => {
      const response = await apiClient.get<Mesa[]>("/mesas");
      return response;
    },
  });
}

// Hook para consultar uma mesa específica
export function useMesaQuery(id: number) {
  return useQuery({
    queryKey: ["mesas", id],
    queryFn: async () => {
      const response = await apiClient.get<Mesa>(`/mesas/${id}`);
      return response;
    },
    enabled: !!id,
  });
}

// Hook para criar uma nova mesa
export function useCreateMesa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMesaInput) => {
      const response = await apiClient.post<Mesa>("/mesas", data);
      return response;
    },
    onSuccess: () => {
      // Invalidar a consulta para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ["mesas"] });
    },
  });
}

// Hook para atualizar uma mesa
export function useUpdateMesa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateMesaInput & { id: number }) => {
      const response = await apiClient.patch<Mesa>(`/mesas/${id}`, data);
      return response;
    },
    onSuccess: (_, variables) => {
      // Invalidar consultas específicas
      queryClient.invalidateQueries({ queryKey: ["mesas"] });
      queryClient.invalidateQueries({ queryKey: ["mesas", variables.id] });
    },
  });
}

// Hook para alternar o status de ativa/inativa
export function useToggleMesaStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ativa }: { id: number; ativa: boolean }) => {
      const response = await apiClient.patch<Mesa>(`/mesas/${id}`, { ativa });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mesas"] });
    },
  });
}
