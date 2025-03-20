import { ApiProperty } from '@nestjs/swagger';
import { Permissoes_usuario } from '@database';

export class PermissaoUsuarioEntity implements Permissoes_usuario {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  num_telefone: string | null;

  @ApiProperty()
  id_funcionario: number;

  @ApiProperty()
  permitido: boolean;

  @ApiProperty()
  dt_solicitacao: Date;

  @ApiProperty({ required: false })
  dt_alteracao: Date | null;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  coord_x: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  token: string | null;

  @ApiProperty()
  id_sistema: number;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<PermissaoUsuarioEntity>) {
    Object.assign(this, partial);
  }
}
