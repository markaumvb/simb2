// src/components/mesas/mesa-table.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, RefreshCw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useMesasQuery } from "@/hooks/use-mesas";
import { MesaSkeleton } from "./mesa-skeleton";

// Definições de tipos para as Mesas
export type MesaTableProps = {
  onEditMesa: (id: number) => void;
  onCreateMesa: () => void;
};

// Cores para badges de status
const statusColors = {
  DISPONIVEL: "bg-green-100 text-green-800 border-green-200",
  OCUPADA: "bg-blue-100 text-blue-800 border-blue-200",
  MANUTENCAO: "bg-yellow-100 text-yellow-800 border-yellow-200",
  NO_DEPOSITO: "bg-red-100 text-red-800 border-red-200",
};

// Nomes amigáveis para status
const statusNames = {
  DISPONIVEL: "Disponível",
  OCUPADA: "Ocupada",
  MANUTENCAO: "Em Manutenção",
  NO_DEPOSITO: "No Depósito",
};

export function MesaTable({ onEditMesa, onCreateMesa }: MesaTableProps) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Usar React Query para buscar os dados
  const { data: mesas, isLoading, isError, refetch } = useMesasQuery();

  // Filtrar mesas por status se houver um filtro ativo
  const filteredMesas = statusFilter
    ? mesas?.filter((mesa) => mesa.status === statusFilter)
    : mesas;

  if (isLoading) {
    return <MesaSkeleton />;
  }

  if (isError || !mesas) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md">
        <h3 className="font-medium text-red-800">Erro ao carregar mesas</h3>
        <p className="text-red-600 mt-1">
          Não foi possível obter os dados das mesas.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            Todas
          </Button>
          <Button
            variant={statusFilter === "DISPONIVEL" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("DISPONIVEL")}
            className="text-green-600"
          >
            Disponíveis
          </Button>
          <Button
            variant={statusFilter === "OCUPADA" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("OCUPADA")}
            className="text-blue-600"
          >
            Ocupadas
          </Button>
          <Button
            variant={statusFilter === "MANUTENCAO" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("MANUTENCAO")}
            className="text-yellow-600"
          >
            Manutenção
          </Button>
          <Button
            variant={statusFilter === "NO_DEPOSITO" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("NO_DEPOSITO")}
            className="text-red-600"
          >
            Depósito
          </Button>
        </div>

        <Button onClick={onCreateMesa}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Mesa
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ativa</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMesas?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhuma mesa encontrada
              </TableCell>
            </TableRow>
          ) : (
            filteredMesas?.map((mesa, index) => (
              <TableRow
                key={mesa.id}
                className={index % 2 === 0 ? "bg-muted/50" : ""}
              >
                <TableCell>#{mesa.id}</TableCell>
                <TableCell>{mesa.descricao}</TableCell>
                <TableCell>{mesa.tipomesa?.descricao || "—"}</TableCell>
                <TableCell>{formatCurrency(Number(mesa.valor))}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusColors[mesa.status] || ""}
                  >
                    {statusNames[mesa.status] || mesa.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={mesa.ativa ? "text-green-600" : "text-red-600"}
                  >
                    {mesa.ativa ? "Sim" : "Não"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEditMesa(mesa.id)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/mesas/${mesa.id}`)}
                      >
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {mesa.status !== "OCUPADA" && (
                        <>
                          {mesa.ativa ? (
                            <DropdownMenuItem className="text-red-600">
                              Desativar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-green-600">
                              Ativar
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
