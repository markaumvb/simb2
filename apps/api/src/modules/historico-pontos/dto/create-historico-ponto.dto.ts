import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistoricoPontoDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_ponto: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_linha: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_movimentacao: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  numero_ponto: number | null;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_inclusao_ponto: Date | null;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_alteracao_ponto: Date | null;

  @IsString()
  @ApiProperty()
  cliente: string;

  @ApiProperty()
  dt_inicio_cliente: Date | null;

  @ApiProperty()
  dt_encerramento_cliente: Date | null;

  @IsString()
  @ApiProperty()
  fantasia: string | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  qtde_mesa: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  media_cobrancaDecimal | null;
}
