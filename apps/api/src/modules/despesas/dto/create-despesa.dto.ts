import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDespesaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  favorecido: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  valor: number;

  @IsDate()
  @ApiProperty()
  dt_hora: Date;

  @IsEnum(Status) // Validar como enum
  @ApiProperty({ enum: Status, enumName: 'Status' }) // Tipo para Swagger
  status: Status;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_cheque: Date | null;

  @IsOptional()
  @IsString()
  @ApiProperty()
  num_cheque: string | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_movimentacao: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_inclusao: Date | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_funcionario: number | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_tipo: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  id_ponto: number | null;
}
