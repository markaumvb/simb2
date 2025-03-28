// src/components/mesas/mesa-form.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { useTipoMesasQuery } from "@/hooks/use-tipo-mesas";
import { Mesa } from "@/types/mesa";
import { Loader2 } from "lucide-react";

// Schema de validação para o formulário
const mesaFormSchema = z.object({
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  id_tipo: z.number().min(1, "Selecione um tipo de mesa"),
  valor: z.number().min(0, "Valor não pode ser negativo"),
  status: z.enum(["DISPONIVEL", "OCUPADA", "MANUTENCAO", "NO_DEPOSITO"]),
  ativa: z.boolean().default(true),
});

type MesaFormValues = z.infer<typeof mesaFormSchema>;

interface MesaFormProps {
  initialData?: Partial<Mesa>;
  onSubmit: (data: MesaFormValues) => void;
  isSubmitting?: boolean;
  onNovoTipo?: () => void;
}

export function MesaForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  onNovoTipo,
}: MesaFormProps) {
  // Busca os tipos de mesa disponíveis
  const { data: tiposMesa, isLoading: isLoadingTipos } = useTipoMesasQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MesaFormValues>({
    resolver: zodResolver(mesaFormSchema),
    defaultValues: {
      descricao: initialData?.descricao || "",
      id_tipo: initialData?.id_tipo || 0,
      valor: initialData?.valor || 0,
      status: initialData?.status || "NO_DEPOSITO",
      ativa: initialData?.ativa ?? true,
    },
  });

  // Observa valores para exibição formatada
  const currentValor = watch("valor");
  const currentStatus = watch("status");
  const currentTipo = watch("id_tipo");

  // Efeito para atualizar valores quando os dados iniciais mudam
  useEffect(() => {
    if (initialData) {
      setValue("descricao", initialData.descricao || "");
      setValue("id_tipo", initialData.id_tipo || 0);
      setValue("valor", initialData.valor || 0);
      setValue("status", initialData.status || "NO_DEPOSITO");
      setValue("ativa", initialData.ativa ?? true);
    }
  }, [initialData, setValue]);

  // Processar o envio do formulário
  const processSubmit = (data: MesaFormValues) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Erro ao salvar mesa:", error);
      toast.error("Erro ao salvar mesa. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
      <div className="grid gap-4">
        {/* Campo de Descrição */}
        <div className="grid gap-2">
          <Label htmlFor="descricao">
            Descrição <span className="text-red-500">*</span>
          </Label>
          <Input
            id="descricao"
            {...register("descricao")}
            placeholder="Ex: Mesa 01"
          />
          {errors.descricao && (
            <p className="text-sm text-red-500">{errors.descricao.message}</p>
          )}
        </div>

        {/* Campo de Tipo de Mesa */}
        <div className="grid gap-2">
          <Label htmlFor="id_tipo">
            Tipo <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Select
              value={currentTipo ? String(currentTipo) : undefined}
              onValueChange={(value) => setValue("id_tipo", Number(value))}
              disabled={isLoadingTipos}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingTipos ? (
                  <div className="flex items-center justify-center p-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Carregando...
                  </div>
                ) : (
                  tiposMesa?.map((tipo) => (
                    <SelectItem key={tipo.id} value={String(tipo.id)}>
                      {tipo.descricao}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onNovoTipo}
              disabled={isSubmitting}
            >
              +
            </Button>
          </div>
          {errors.id_tipo && (
            <p className="text-sm text-red-500">{errors.id_tipo.message}</p>
          )}
        </div>

        {/* Campo de Valor */}
        <div className="grid gap-2">
          <Label htmlFor="valor">
            Valor <span className="text-red-500">*</span>
          </Label>
          <Input
            id="valor"
            type="number"
            step="0.01"
            min="0"
            {...register("valor", { valueAsNumber: true })}
          />
          <p className="text-sm text-muted-foreground">
            {formatCurrency(currentValor || 0)}
          </p>
          {errors.valor && (
            <p className="text-sm text-red-500">{errors.valor.message}</p>
          )}
        </div>

        {/* Campo de Status */}
        <div className="grid gap-2">
          <Label htmlFor="status">
            Status <span className="text-red-500">*</span>
          </Label>
          <Select
            value={currentStatus}
            onValueChange={(value) =>
              setValue("status", value as MesaFormValues["status"])
            }
            disabled={initialData?.id && currentStatus === "OCUPADA"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DISPONIVEL">Disponível</SelectItem>
              <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
              <SelectItem value="NO_DEPOSITO">No Depósito</SelectItem>
              {!initialData?.id && (
                <SelectItem value="OCUPADA" disabled>
                  Ocupada (somente via entrada de mesa)
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {initialData?.id && currentStatus === "OCUPADA" && (
            <p className="text-sm text-amber-500">
              Mesa ocupada não pode ter status alterado
            </p>
          )}
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Campo Ativa */}
        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id="ativa"
            checked={watch("ativa")}
            onCheckedChange={(checked) => setValue("ativa", checked as boolean)}
            disabled={currentStatus === "OCUPADA"}
          />
          <div className="space-y-1">
            <Label htmlFor="ativa">Mesa ativa</Label>
            <p className="text-sm text-muted-foreground">
              Mesa disponível para uso no sistema
            </p>
          </div>
        </div>
        {currentStatus === "OCUPADA" && (
          <p className="text-sm text-amber-500">
            Mesa ocupada não pode ser desativada
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar"
          )}
        </Button>
      </div>
    </form>
  );
}
