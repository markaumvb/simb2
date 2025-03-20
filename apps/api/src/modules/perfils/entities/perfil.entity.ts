import { ApiProperty } from '@nestjs/swagger';
import { perfil } from '@prisma/client';

export class PerfilEntity implements perfil {
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

  constructor(partial: Partial<PerfilEntity>) {
    Object.assign(this, partial);
  }
}
