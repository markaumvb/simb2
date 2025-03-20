import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFuncionarioPerfilDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  descricao: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  num_telefone: string | null;

  @IsNumber()
  @ApiProperty()
  id_funcionario: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_perfil: number;

  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_inclusao: Date | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_sistema: number | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  coord_x: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  coord_y: string | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id_linha: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  token: string;
}
