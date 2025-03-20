import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateMembrosLinhaDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  status: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_alteracao: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_inclusao: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_funcionario: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_funcao: number;
}
