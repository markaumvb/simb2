import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export type MesasSummary = {
  DISPONIVEL: number;
  OCUPADA: number;
  MANUTENCAO: number;
  NO_DEPOSITO: number;
  total: number;
  mesasAtivas: number;
  mesasInativas: number;
};

export type PeriodoFaturamento = {
  valor: number;
  periodo: string;
};

export type FaturamentoSummary = {
  diario: PeriodoFaturamento;
  semanal: PeriodoFaturamento;
  mensal: PeriodoFaturamento;
};

export type UtilizacaoDiaria = {
  data: string;
  mesasUtilizadas: number;
  taxaOcupacao: number;
};

export type UtilizacaoData = {
  dadosGrafico: UtilizacaoDiaria[];
  totalMesas: number;
};

export type DashboardSummary = {
  mesas: MesasSummary;
  faturamento: FaturamentoSummary;
  utilizacao: UtilizacaoData;
};

/**
 * Hook para obter todos os dados do dashboard
 */
export function useDashboardSummary() {
  return useQuery<DashboardSummary>({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => {
      const response = await apiClient.get<DashboardSummary>(
        "/dashboard/summary"
      );
      return response;
    },
    refetchInterval: 5 * 60 * 1000, // Atualiza a cada 5 minutos
  });
}

/**
 * Hook para obter apenas os dados de mesas
 */
export function useMesasSummary() {
  return useQuery<MesasSummary>({
    queryKey: ["dashboard", "mesas"],
    queryFn: async () => {
      const response = await apiClient.get<MesasSummary>("/dashboard/mesas");
      return response;
    },
    refetchInterval: 2 * 60 * 1000, // Atualiza a cada 2 minutos
  });
}

/**
 * Hook para obter apenas os dados de faturamento
 */
export function useFaturamentoSummary() {
  return useQuery<FaturamentoSummary>({
    queryKey: ["dashboard", "faturamento"],
    queryFn: async () => {
      const response = await apiClient.get<FaturamentoSummary>(
        "/dashboard/faturamento"
      );
      return response;
    },
    refetchInterval: 5 * 60 * 1000, // Atualiza a cada 5 minutos
  });
}

/**
 * Hook para obter apenas os dados de utilização
 */
export function useUtilizacaoData() {
  return useQuery<UtilizacaoData>({
    queryKey: ["dashboard", "utilizacao"],
    queryFn: async () => {
      const response = await apiClient.get<UtilizacaoData>(
        "/dashboard/utilizacao"
      );
      return response;
    },
    refetchInterval: 10 * 60 * 1000, // Atualiza a cada 10 minutos
  });
}
