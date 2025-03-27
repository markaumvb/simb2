export interface Tenant {
  id: number;
  nome: string;
  cnpj: string;
  razaoSocial?: string | null;
  ativo: boolean;
  dt_alteracao?: Date | null;
  dt_inclusao?: Date | null;
}
