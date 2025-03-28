// src/types/mesa.ts
export interface Mesa {
  id: number;
  descricao: string;
  status: "DISPONIVEL" | "OCUPADA" | "MANUTENCAO" | "NO_DEPOSITO";
  cont_atual: number;
  cont_anterior: number;
  tipo_cobranca: string | null;
  porcentagem_cliente: number | null;
  dt_locacao: string | null;
  id_linha: number | null;
  valor: number;
  id_tipo: number;
  meses_cobranca: number | null;
  dt_alteracao: string | null;
  dt_inclusao: string | null;
  cord_x: string | null;
  cord_y: string | null;
  dt_entrada_linha: string;
  dt_saida_linha: string;
  id_ponto: number;
  chave: string;
  cont_brinde_anterior: number;
  cont_brinde_atual: number;
  ativa: boolean;
  tenant_id: number;
  tipomesa?: {
    id: number;
    descricao: string;
    composicao: boolean;
  };
}
