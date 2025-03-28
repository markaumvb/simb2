// src/components/mesas/tipo-mesa-form-modal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateTipoMesa } from "@/hooks/use-tipo-mesas";
import { Loader2 } from "lucide-react";

// Schema de validação
const tipoMesaFormSchema = z.object({
  descricao: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  composicao: z.boolean().default(false),
});

type TipoMesaFormValues = z.infer<typeof tipoMesaFormSchema>;

interface TipoMesaFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function TipoMesaFormModal({ open, onClose }: TipoMesaFormModalProps) {
  const createTipoMesa = useCreateTipoMesa();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TipoMesaFormValues>({
    resolver: zodResolver(tipoMesaFormSchema),
    defaultValues: {
      descricao: "",
      composicao: false,
    },
  });

  // Função para lidar com o envio do formulário
  const onSubmit = async (data: TipoMesaFormValues) => {
    try {
      await createTipoMesa.mutateAsync(data);
      toast.success("Tipo de mesa criado com sucesso!");
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao criar tipo de mesa:", error);
      toast.error("Erro ao criar tipo de mesa. Tente novamente.");
    }
  };

  // Tratamento para fechar o modal
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Tipo de Mesa</DialogTitle>
          <DialogDescription>
            Crie um novo tipo de mesa para o sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid gap-4">
            {/* Campo de Descrição */}
            <div className="grid gap-2">
              <Label htmlFor="descricao">
                Descrição <span className="text-red-500">*</span>
              </Label>
              <Input
                id="descricao"
                {...register("descricao")}
                placeholder="Ex: Sinuca Profissional"
              />
              {errors.descricao && (
                <p className="text-sm text-red-500">
                  {errors.descricao.message}
                </p>
              )}
            </div>

            {/* Campo Composição */}
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="composicao"
                checked={watch("composicao")}
                onCheckedChange={(checked) =>
                  setValue("composicao", checked as boolean)
                }
              />
              <div className="space-y-1">
                <Label htmlFor="composicao">Possui composição</Label>
                <p className="text-sm text-muted-foreground">
                  Permite associar componentes a este tipo de mesa
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createTipoMesa.isPending}>
              {createTipoMesa.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
