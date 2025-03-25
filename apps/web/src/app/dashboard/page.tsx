import { Card } from "@/components/ui/card";
import { DashboardStats } from "@/components/data-display/dashboard-stats";
import { DashboardCharts } from "@/components/data-display/dashboard-charts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-medium text-sm text-muted-foreground">
            Mesas Ativas
          </h3>
          <p className="text-2xl font-bold">24</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium text-sm text-muted-foreground">
            Faturamento Hoje
          </h3>
          <p className="text-2xl font-bold">R$ 1.250,00</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium text-sm text-muted-foreground">
            Mesas em Manutenção
          </h3>
          <p className="text-2xl font-bold">3</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium text-sm text-muted-foreground">
            Clientes Ativos
          </h3>
          <p className="text-2xl font-bold">42</p>
        </Card>
      </div>

      {/* Estatísticas e gráficos placeholder */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-medium mb-4">Faturamento Recente</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Gráfico de faturamento será exibido aqui
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium mb-4">Desempenho por Mesa</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Gráfico de desempenho será exibido aqui
          </div>
        </Card>
      </div>
    </div>
  );
}
