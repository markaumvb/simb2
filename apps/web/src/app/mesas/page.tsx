"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";

// Tipo para dados de exemplo da mesa
type Mesa = {
  id: number;
  status: "DISPONIVEL" | "OCUPADA" | "MANUTENCAO" | "NO_DEPOSITO";
  descricao: string;
  tipo: string;
  valor: number;
  ativa: boolean;
};

// Dados de exemplo para teste
const dadosExemplo: Mesa[] = [
  { 
    id: 1, 
    status: "DISPONIVEL", 
    descricao: "Mesa 1", 
    tipo: "Sinuca", 
    valor: 50, 
    ativa: true 
  },
  { 
    id: 2, 
    status: "OCUPADA", 
    descricao: "Mesa 2", 
    tipo: "Sinuca Profissional", 
    valor: 75, 
    ativa: true 
  },
  { 
    id: 3, 
    status: "MANUTENCAO", 
    descricao: "Mesa 3", 
    tipo: "Snooker", 
    valor: 100, 
    ativa: true 
  },
  { 
    id: 4, 
    status: "NO_DEPOSITO", 
    descricao: "Mesa 4", 
    tipo: "Sinuca", 
    valor: 50, 
    ativa: false 
  },
  { 
    id: 5, 
    status: "DISPONIVEL", 
    descricao: "Mesa 5", 
    tipo: "Bilhar", 
    valor: 60, 
    ativa: true 
  },
  { 
    id: 6, 
    status: "DISPONIVEL", 
    descricao: "Mesa 6", 
    tipo: "Sinuca", 
    valor: 50, 
    ativa: true 
  },
  { 
    id: 7, 
    status: "OCUPADA", 
    descricao: "Mesa 7", 
    tipo: "Snooker", 
    valor: 100, 
    ativa: true 
  },
  { 
    id: 8, 
    status: "MANUTENCAO", 
    descricao: "Mesa 8", 
    tipo: "Bilhar", 
    valor: 60, 
    ativa: true 
  },
  { 
    id: 9, 
    status: "DISPONIVEL", 
    descricao: "Mesa 9", 
    tipo: "Sinuca", 
    valor: 50, 
    ativa: true 
  },
  { 
    id: 10, 
    status: "NO_DEPOSITO", 
    descricao: "Mesa 10", 
    tipo: "Snooker", 
    valor: 100, 
    ativa: false 
  },
  { 
    id: 11, 
    status: "DISPONIVEL", 
    descricao: "Mesa 11", 
    tipo: "Bilhar", 
    valor: 60, 
    ativa: true 
  },
];

// Mapeamento de status para cores de badge
const statusColors: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-800 hover:bg-green-100",
  OCUPADA: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  MANUTENCAO: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  NO_DEPOSITO: "bg-red-100 text-red-800 hover:bg-red-100",
};

// Mapeamento de status para nomes amigáveis
const statusNames: Record<string, string> = {
  DISPONIVEL: "Disponível",
  OCUPADA: "Ocupada",
  MANUTENCAO: "Manutenção",
  NO_DEPOSITO: "No Depósito",
};

// Definição das colunas para a tabela
const columns: ColumnDef<Mesa>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge className={statusColors[status]}>
          {statusNames[status]}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value === row.getValue(id);
    },
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue("valor"));
      return <div>{formatCurrency(valor)}</div>;
    },
  },
  {
    accessorKey: "ativa",
    header: "Ativa",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("ativa") ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Sim
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Não
          </Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mesa = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
                <circle cx="5" cy="12" r="1"/>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mesa.id.toString())}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => alert(`Editar mesa ${mesa.id}`)}
            >
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => alert(`Ver detalhes da mesa ${mesa.id}`)}
            >
              Ver detalhes
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {mesa.status !== "OCUPADA" && (
              <>
                {mesa.ativa ? (
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => alert(`Desativar mesa ${mesa.id}`)}
                  >
                    Desativar
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    className="text-green-600"
                    onClick={() => alert(`Ativar mesa ${mesa.id}`)}
                  >
                    Ativar
                  </DropdownMenuItem>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function MesasPage() {
  // Status para filtro
  const statusOptions = [
    { label: "Disponível", value: "DISPONIVEL" },
    { label: "Ocupada", value: "OCUPADA" },
    { label: "Manutenção", value: "MANUTENCAO" },
    { label: "No Depósito", value: "NO_DEPOSITO" },
  ];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mesas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as mesas do sistema
          </p>
        </div>
        <Button asChild>
          <Link href="#" onClick={(e) => { e.preventDefault(); alert("Adicionar nova mesa"); }}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Mesa
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <DataTable
          columns={columns}
          data={dadosExemplo}
          searchColumn="descricao"
          searchPlaceholder="Buscar por descrição..."
          filterColumn={{
            id: "status",
            options: statusOptions,
          }}
        />
      </div>
    </div>
  );
}