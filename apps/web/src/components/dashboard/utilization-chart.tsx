"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtilizacaoDiaria } from "@/hooks/use-dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type UtilizationChartProps = {
  data: UtilizacaoDiaria[];
  totalMesas: number;
};

export function UtilizationChart({ data, totalMesas }: UtilizationChartProps) {
  // Garante que sempre tem dados, mesmo que vazios
  const chartData = data?.length > 0 ? data : [];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Utilização de Mesas</CardTitle>
        <p className="text-sm text-muted-foreground">
          Taxa de ocupação dos últimos {chartData.length} dias
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#82ca9d"
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  name="Mesas Utilizadas"
                  dataKey="mesasUtilizadas"
                  fill="#8884d8"
                />
                <Bar
                  yAxisId="right"
                  name="Taxa de Ocupação"
                  dataKey="taxaOcupacao"
                  fill="#82ca9d"
                  unit="%"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Não há dados de utilização disponíveis
              </p>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Total de mesas disponíveis: {totalMesas}</p>
        </div>
      </CardContent>
    </Card>
  );
}
