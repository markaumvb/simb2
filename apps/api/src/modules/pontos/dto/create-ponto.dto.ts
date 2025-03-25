// src/modules/pontos/dto/create-ponto.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { TipoPonto } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePontoDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_cidade: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endereco: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  cep: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  coord_y: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  coord_x: string | null;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_inclusao: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  dt_alteracao: Date | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TipoPonto)
  @ApiProperty({ enum: TipoPonto, enumName: 'TipoPonto' })
  tipo: TipoPonto;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  complemento: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  bairro: string | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  numero_ponto: number;

  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  paga_aluguel: boolean;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: Number, nullable: true })
  valor_aluguel: number | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  numero_endereco: number | null;
}
