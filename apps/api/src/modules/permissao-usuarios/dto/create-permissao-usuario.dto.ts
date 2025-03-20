import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePermissaoUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsString()
  @ApiProperty()
  num_telefone: string | null;

  @IsNumber()
  @ApiProperty()
  id_funcionario: number;

  @IsBoolean()
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
}
