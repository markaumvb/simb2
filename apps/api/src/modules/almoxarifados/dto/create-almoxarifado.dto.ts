import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateAlmoxarifadoDto {
  @IsString()
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  @IsOptional()
  dt_alteracao: Date;

  @ApiProperty()
  @IsOptional()
  dt_inclusao: Date;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(0.01)
  @Transform(({ value }) => {
    return Number(value);
  })
  valor_unitario: Prisma.Decimal;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  saldo: Prisma.Decimal;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  saldo_min: Prisma.Decimal;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  saldo_max: Prisma.Decimal;

  @IsNotEmpty()
  @ApiProperty()
  status: string;
}
