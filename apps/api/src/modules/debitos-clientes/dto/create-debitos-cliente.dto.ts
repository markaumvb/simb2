import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateDebitosClienteDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_cliente: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsDate()
  @ApiProperty()
  dt_inclusao: Date | null;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

  @IsString()
  @ApiProperty()
  debito_credito: string;
}
