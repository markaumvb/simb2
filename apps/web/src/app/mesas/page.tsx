// src/app/mesas/page.tsx
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
import { MesaFormModal } from "@/components/mesas/mesa-form-modal";

// Tipo para dados de exemplo da mesa
type Mesa = {
  id: number;
  status: "DISPONIVEL" | "OCUPADA" | "MANUTENCAO" | "NO_DEPOSITO";
  descricao: string;
  tipo: string;
  valor: number;
  ativa: boolean;
  id_tipo: number;
};

// Dados de exemplo para teste
const dadosExemplo: Mesa[] = [
  {
    id: 1,
    status: "DISPONIVEL",
    descricao: "Mesa 01",
    tipo: "Sinuca",
    valor: 20.0,
    ativa: true,
    id_tipo: 1,
  },
  {
    id: 2,
    status: "OCUPADA",
    descricao: "Mesa 02",
    tipo: "Sinuca Profissional",
    valor: 30.0,
    ativa: true,
    id_tipo: 2,
  },
  {
    id: 3,
    status: "MANUTENCAO",
    descricao: "Mesa 03",
    tipo: "Bilhar",
    valor: 25.0,
    ativa: false,
    id_tipo: 4,
  },
  {
    id: 4,
    status: "NO_DEPOSITO",
    descricao: "Mesa 04",
    tipo: "Snooker",
    valor: 40.0,
    ativa: false,
    id_tipo: 3,
  },
];

// Mapeamento de status para cores de badge
const statusColors: Record<string, string> = {
  DISPONIVEL: "bg-green-100 text-green-800 border-green-200",
  OCUPADA: "bg-blue-100 text-blue-800 border-blue-200",
  MANUTENCAO: "bg-yellow-100 text-yellow-800 border-yellow-200",
  NO_DEPOSITO: "bg-red-100 text-red-800 border-red-200",
};

// Mapeamento de status para nomes amigáveis
const statusNames: Record<string, string> = {
  DISPONIVEL: "Disponível",
  OCUPADA: "Ocupada",
  MANUTENCAO: "Em Manutenção",
  NO_DEPOSITO: "No Depósito",
};

export default function MesasPage() {
  // Estado para controlar o modal de formulário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMesa, setCurrentMesa] = useState<Mesa | null>(null);

  // Estado para armazenar os dados das mesas (em uma implementação real, usaríamos React Query)
  const [mesas, setMesas] = useState<Mesa[]>(dadosExemplo);

  // Função para abrir o modal para adicionar nova mesa
  const handleAddMesa = () => {
    setCurrentMesa(null); // Não estamos editando, então reset
    setIsModalOpen(true);
  };

  // Função para abrir o modal para editar mesa
  const handleEditMesa = (mesa: Mesa) => {
    setCurrentMesa(mesa);
    setIsModalOpen(true);
  };

  // Função para lidar com a submissão do formulário
  const handleFormSubmit = (data: Partial<Mesa>) => {
    // Em uma implementação real, isso seria uma chamada API
    if (currentMesa?.id) {
      // Editando uma mesa existente
      setMesas(
        mesas.map((m) => (m.id === currentMesa.id ? { ...m, ...data } : m))
      );
    } else {
      // Adicionando nova mesa
      const newMesa: Mesa = {
        id: mesas.length + 1, // Em produção, o backend geraria o ID
        descricao: data.descricao || "",
        tipo: data.tipo || "Desconhecido",
        valor: data.valor || 0,
        status: data.status || "NO_DEPOSITO",
        ativa: data.ativa !== undefined ? data.ativa : true,
        id_tipo: data.id_tipo || 1,
      };
      setMesas([...mesas, newMesa]);
    }
  };

  // Função para alternar o status ativo/inativo
  const toggleAtivo = (mesa: Mesa) => {
    if (mesa.status === "OCUPADA") {
      alert("Não é possível desativar uma mesa ocupada");
      return;
    }

    setMesas(
      mesas.map((m) => (m.id === mesa.id ? { ...m, ativa: !m.ativa } : m))
    );
  };

  // Definição das colunas para a tabela
  const columns: ColumnDef<Mesa>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>#{row.original.id}</div>,
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: ({ row }) => <div>{row.original.descricao}</div>,
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: ({ row }) => <div>{row.original.tipo}</div>,
    },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: ({ row }) => <div>{formatCurrency(row.original.valor)}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge className={statusColors[status]} variant="outline">
            {statusNames[status] || status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "ativa",
      header: "Ativa",
      cell: ({ row }) => (
        <div className={row.original.ativa ? "text-green-600" : "text-red-600"}>
          {row.original.ativa ? "Sim" : "Não"}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(mesa.id.toString())
                }
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEditMesa(mesa)}>
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
                      onClick={() => toggleAtivo(mesa)}
                    >
                      Desativar
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="text-green-600"
                      onClick={() => toggleAtivo(mesa)}
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
        <Button onClick={handleAddMesa}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Mesa
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <DataTable
          columns={columns}
          data={mesas}
          searchColumn="descricao"
          searchPlaceholder="Buscar por descrição..."
          filterColumn={{
            id: "status",
            options: statusOptions,
          }}
        />
      </div>

      {/* Modal de Formulário */}
      <MesaFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        defaultValues={currentMesa || undefined}
        isEditing={!!currentMesa}
      />
    </div>
  );
}
