import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDepositoDto {
  @IsDate()
  @ApiProperty()
  dt_hora: Date;

  @IsNumber()
  @ApiProperty({ type: Number })
  @Transform(({ value }) => {
    return Number(value);
  })
  valorDecimal;

  @IsString()
  @ApiProperty({ type: Number })
  especie: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Number })
  dt_cheque: Date | null;

  @IsNumber()
  @ApiProperty({ type: Number })
  id_linha: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  id_movimentacao: number;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Number })
  dt_alteracao: Date | null;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Number })
  dt_inclusao: Date | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number })
  id_cliente: number | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: Number })
  numero_boleto: string | null;

  @IsNumber()
  @ApiProperty({ type: Number })
  id_funcionario: number;
}
