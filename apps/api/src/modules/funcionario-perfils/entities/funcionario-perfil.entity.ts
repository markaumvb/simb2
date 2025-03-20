import { ApiProperty } from '@nestjs/swagger';
import { funcionario_perfil } from '@prisma/client';

export class FuncionarioPerfilEntity implements funcionario_perfil {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  num_telefone: string | null;

  @ApiProperty()
  id_funcionario: number;

  @ApiProperty()
  id_perfil: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  id_sistema: number | null;

  @ApiProperty()
  coord_x: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  token: string;

  constructor(partial: Partial<FuncionarioPerfilEntity>) {
    Object.assign(this, partial);
  }
}
