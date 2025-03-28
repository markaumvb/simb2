// src/components/mesas/mesa-form-modal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// Definição do tipo para mesa baseado nos dados da API
type MesaFormValues = {
  id?: number;
  descricao: string;
  id_tipo: number;
  valor: number;
  status: "DISPONIVEL" | "OCUPADA" | "MANUTENCAO" | "NO_DEPOSITO";
  ativa: boolean;
};

// Schema de validação com Zod
const mesaFormSchema = z.object({
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  id_tipo: z.number().min(1, "Selecione um tipo de mesa"),
  valor: z.number().min(0, "Valor não pode ser negativo"),
  status: z.enum(["DISPONIVEL", "OCUPADA", "MANUTENCAO", "NO_DEPOSITO"]),
  ativa: z.boolean(),
});

// Dados mockados para tipos de mesa (em uma implementação real, seriam carregados da API)
const tiposMesa = [
  { id: 1, descricao: "Sinuca" },
  { id: 2, descricao: "Sinuca Profissional" },
  { id: 3, descricao: "Snooker" },
  { id: 4, descricao: "Bilhar" },
];

type MesaFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MesaFormValues) => void;
  defaultValues?: Partial<MesaFormValues>;
  isEditing?: boolean;
};

export function MesaFormModal({
  open,
  onClose,
  onSubmit,
  defaultValues = {
    descricao: "",
    id_tipo: 0,
    valor: 0,
    status: "NO_DEPOSITO", // Status padrão ao criar
    ativa: true,
  },
  isEditing = false,
}: MesaFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MesaFormValues>({
    resolver: zodResolver(mesaFormSchema),
    defaultValues,
  });

  // Observa o valor atual para exibir formatado
  const currentValor = watch("valor");
  const currentStatus = watch("status");

  // Função para lidar com o envio do formulário
  const processSubmit = async (data: MesaFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset(); // Limpa o formulário
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar mesa:", error);
      // Aqui poderia mostrar um toast de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tratamento para fechar o modal - limpa o form
  const handleClose = () => {
    reset();
    onClose();
  };

  // Abertura do modal de novo tipo (exemplo)
  const handleNovoTipo = () => {
    alert("Abrir modal de cadastro de tipo de mesa");
    // Aqui implementaria a lógica para abrir um modal de cadastro rápido
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Mesa" : "Nova Mesa"}</DialogTitle>
          <DialogDescription>
            Preencha os dados da mesa no formulário abaixo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Campo de Descrição */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <div className="col-span-3">
                <Input
                  id="descricao"
                  {...register("descricao")}
                  placeholder="Ex: Mesa 01"
                />
                {errors.descricao && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.descricao.message}
                  </p>
                )}
              </div>
            </div>

            {/* Campo de Tipo de Mesa */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id_tipo" className="text-right">
                Tipo
              </Label>
              <div className="col-span-3 flex gap-2">
                <Select
                  onValueChange={(value) => setValue("id_tipo", Number(value))}
                  defaultValue={defaultValues.id_tipo?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposMesa.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.id.toString()}>
                        {tipo.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleNovoTipo}
                >
                  +
                </Button>
                {errors.id_tipo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.id_tipo.message}
                  </p>
                )}
              </div>
            </div>

            {/* Campo de Valor */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <div className="col-span-3">
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("valor", { valueAsNumber: true })}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formatCurrency(currentValor || 0)}
                </p>
                {errors.valor && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.valor.message}
                  </p>
                )}
              </div>
            </div>

            {/* Campo de Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <div className="col-span-3">
                <Select
                  onValueChange={(value) =>
                    setValue("status", value as MesaFormValues["status"])
                  }
                  defaultValue={defaultValues.status}
                  disabled={isEditing && currentStatus === "OCUPADA"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                    <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
                    <SelectItem value="NO_DEPOSITO">No Depósito</SelectItem>
                    {!isEditing && (
                      <SelectItem value="OCUPADA" disabled>
                        Ocupada (somente via entrada de mesa)
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {isEditing && currentStatus === "OCUPADA" && (
                  <p className="text-sm text-amber-500 mt-1">
                    Mesa ocupada não pode ter status alterado
                  </p>
                )}
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Campo Ativa */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ativa" className="text-right">
                Ativa
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Checkbox
                  id="ativa"
                  checked={watch("ativa")}
                  onCheckedChange={(checked) =>
                    setValue("ativa", checked as boolean)
                  }
                  disabled={currentStatus === "OCUPADA"}
                />
                <label
                  htmlFor="ativa"
                  className="text-sm text-muted-foreground"
                >
                  Mesa está ativa para uso
                </label>
                {currentStatus === "OCUPADA" && (
                  <p className="text-sm text-amber-500 ml-2">
                    Mesa ocupada não pode ser desativada
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
