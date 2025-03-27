"use client";

import { SummaryCard } from "@/components/dashboard/summary-card";
import { UtilizationChart } from "@/components/dashboard/utilization-chart";
import { MesaStatusChart } from "@/components/dashboard/mesa-status-chart";
import { useDashboardSummary } from "@/hooks/use-dashboard";
import { formatCurrency } from "@/lib/utils";
import { CircleDollarSign, Users, Table2, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: dashboardData, isLoading, error } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando dados do dashboard...</span>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-md">
        <h2 className="text-lg font-medium text-red-800">
          Erro ao carregar dashboard
        </h2>
        <p className="text-red-600">
          Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais
          tarde.
        </p>
      </div>
    );
  }

  // Desestruturação segura com valores padrão para evitar undefined
  const {
    mesas = {
      DISPONIVEL: 0,
      OCUPADA: 0,
      MANUTENCAO: 0,
      NO_DEPOSITO: 0,
      total: 0,
      mesasAtivas: 0,
      mesasInativas: 0,
    },
    faturamento = {
      diario: { valor: 0, periodo: "Hoje" },
      semanal: { valor: 0, periodo: "Esta semana" },
      mensal: { valor: 0, periodo: "Este mês" },
    },
    utilizacao = {
      dadosGrafico: [],
      totalMesas: 0,
    },
  } = dashboardData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Faturamento Diário"
          value={formatCurrency(faturamento?.diario?.valor || 0)}
          description={`Período: ${faturamento?.diario?.periodo || "Hoje"}`}
          icon={CircleDollarSign}
        />

        <SummaryCard
          title="Faturamento Mensal"
          value={formatCurrency(faturamento?.mensal?.valor || 0)}
          description={`Período: ${faturamento?.mensal?.periodo || "Este mês"}`}
          icon={CircleDollarSign}
        />

        <SummaryCard
          title="Mesas Ocupadas"
          value={mesas?.OCUPADA || 0}
          description={`De um total de ${mesas?.total || 0} mesas`}
          icon={Table2}
          valueClassName="text-blue-600"
        />

        <SummaryCard
          title="Mesas Disponíveis"
          value={mesas?.DISPONIVEL || 0}
          description="Prontas para uso"
          icon={Table2}
          valueClassName="text-green-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <UtilizationChart
          data={utilizacao?.dadosGrafico || []}
          totalMesas={utilizacao?.totalMesas || 0}
        />

        <MesaStatusChart data={mesas} />
      </div>
    </div>
  );
}
