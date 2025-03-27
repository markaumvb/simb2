"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MesasSummary } from "@/hooks/use-dashboard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type MesaStatusChartProps = {
  data: MesasSummary;
};

// Definir cores para cada status
const COLORS = {
  DISPONIVEL: "#22c55e", // verde
  OCUPADA: "#3b82f6", // azul
  MANUTENCAO: "#f59e0b", // amarelo
  NO_DEPOSITO: "#ef4444", // vermelho
};

// Mapeamento de status para nomes amigáveis
const STATUS_NAMES = {
  DISPONIVEL: "Disponível",
  OCUPADA: "Ocupada",
  MANUTENCAO: "Manutenção",
  NO_DEPOSITO: "No Depósito",
};

export function MesaStatusChart({ data }: MesaStatusChartProps) {
  // Transformar dados para formato adequado ao gráfico
  const chartData = Object.entries(data)
    .filter(([key]) =>
      ["DISPONIVEL", "OCUPADA", "MANUTENCAO", "NO_DEPOSITO"].includes(key)
    )
    .map(([key, value]) => ({
      name: STATUS_NAMES[key as keyof typeof STATUS_NAMES],
      value: value,
      color: COLORS[key as keyof typeof COLORS],
    }))
    .filter((item) => item.value > 0); // Remover itens com valor zero

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status das Mesas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} mesas`, "Quantidade"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Não há dados de mesas disponíveis
              </p>
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Total de Mesas</span>
            <span className="font-medium">{data.total}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Mesas Ativas</span>
            <span className="font-medium">{data.mesasAtivas}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
