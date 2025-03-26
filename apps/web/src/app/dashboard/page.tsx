"use client";

import { Card } from "@/components/ui/card";
import { useAuthContext } from "@/providers/auth-provider";
import { useTenant } from "@/providers/tenant-provider";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { currentTenant } = useTenant();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Cartão de informações do usuário */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Nome:</span> {user?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">Tenant ID:</span> {user?.tenantId}
          </p>
          <p>
            <span className="font-medium">Tenant Nome:</span>{" "}
            {currentTenant?.nome || "Carregando..."}
          </p>
        </div>
      </Card>

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
