import { ApiProperty } from '@nestjs/swagger';
import { Perfil } from '@database';

export class PerfilEntity implements Perfil {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  cidade: boolean;

  @ApiProperty()
  cliente: boolean;

  @ApiProperty()
  debitos_cliente: boolean;

  @ApiProperty()
  movimentacao: boolean;

  @ApiProperty()
  deposito: boolean;

  @ApiProperty()
  despesa: boolean;

  @ApiProperty()
  funcionario: boolean;

  @ApiProperty()
  linha: boolean;

  @ApiProperty()
  mesa: boolean;

  @ApiProperty()
  cobranca: boolean;

  @ApiProperty()
  perfil: boolean;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  per_gestor: boolean;

  @ApiProperty()
  ponto: boolean;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<PerfilEntity>) {
    Object.assign(this, partial);
  }
}
