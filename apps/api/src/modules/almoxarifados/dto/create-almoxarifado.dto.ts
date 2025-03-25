import { ApiProperty } from '@nestjs/swagger';
import { StatusAlmoxarifado } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
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
  valor_unitario: Decimal;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  saldo: Decimal;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  saldo_min: Decimal;

  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  saldo_max: Decimal;

  @IsNotEmpty()
  @IsEnum(StatusAlmoxarifado)
  @ApiProperty()
  status: string;
}
