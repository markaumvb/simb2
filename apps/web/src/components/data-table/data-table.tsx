// src/components/data-table/data-table.tsx
"use client";

import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn?: string;
  searchPlaceholder?: string;
  filterColumn?: {
    id: string;
    options: { label: string; value: string }[];
  };
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn,
  searchPlaceholder = "Buscar...",
  filterColumn,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchAvailable, setSearchAvailable] = useState(false);
  const [filterAvailable, setFilterAvailable] = useState(false);

  // Removi a importação não utilizada 'table' daqui

  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // Verifique se as colunas de pesquisa e filtro existem após a renderização da tabela
  useEffect(() => {
    if (searchColumn) {
      const searchCol = tableInstance.getColumn(searchColumn);
      setSearchAvailable(!!searchCol);
      if (!searchCol) {
        console.warn(`Coluna de pesquisa "${searchColumn}" não encontrada.`);
      }
    }

    if (filterColumn) {
      const filterCol = tableInstance.getColumn(filterColumn.id);
      setFilterAvailable(!!filterCol);
      if (!filterCol) {
        console.warn(`Coluna de filtro "${filterColumn.id}" não encontrada.`);
      }
    }
  }, [tableInstance, searchColumn, filterColumn]);

  // Calcula a contagem de linhas exibidas atualmente
  const { pageSize, pageIndex } = tableInstance.getState().pagination;
  const totalRows = tableInstance.getFilteredRowModel().rows.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  // Altera a página para a primeira ao mudar o filtro
  const handleFilterChange = (value: string) => {
    if (filterColumn && filterAvailable) {
      const column = tableInstance.getColumn(filterColumn.id);
      if (column) {
        column.setFilterValue(value === "all" ? undefined : value);
        tableInstance.setPageIndex(0);
      }
    }
  };

  // Handle de busca que reseta para a primeira página
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchColumn && searchAvailable) {
      const column = tableInstance.getColumn(searchColumn);
      if (column) {
        column.setFilterValue(event.target.value);
        tableInstance.setPageIndex(0);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Barra de filtros e busca */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        {/* Barra de busca */}
        {searchColumn && (
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                searchAvailable ? searchPlaceholder : "Busca indisponível"
              }
              className="pl-8"
              onChange={handleSearchChange}
              value={
                searchAvailable
                  ? (tableInstance
                      .getColumn(searchColumn)
                      ?.getFilterValue() as string) ?? ""
                  : ""
              }
              disabled={!searchAvailable}
            />
            {!searchAvailable && searchColumn && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                Coluna &quot;{searchColumn}&quot; não disponível para busca
              </div>
            )}
          </div>
        )}

        {/* Filtro por status */}
        {filterColumn && (
          <div className="w-full sm:w-auto">
            <Select
              onValueChange={handleFilterChange}
              value={
                filterAvailable
                  ? (tableInstance
                      .getColumn(filterColumn.id)
                      ?.getFilterValue() as string) ?? "all"
                  : ""
              }
              disabled={!filterAvailable}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue
                  placeholder={
                    filterAvailable
                      ? "Filtrar por status"
                      : "Filtro indisponível"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {filterColumn.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!filterAvailable && filterColumn && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                Coluna &quot;{filterColumn.id}&quot; não disponível para filtro
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Carregando...
                </TableCell>
              </TableRow>
            ) : tableInstance.getRowModel().rows?.length ? (
              // Rows with zebra striping
              tableInstance.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? "bg-muted/50" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Empty state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {totalRows > 0 ? startRow : 0} a {endRow} de {totalRows}{" "}
          registros
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.setPageIndex(0)}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
            }
            disabled={!tableInstance.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
