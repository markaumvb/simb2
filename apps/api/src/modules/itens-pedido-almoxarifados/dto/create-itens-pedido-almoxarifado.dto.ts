import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateItensPedidoAlmoxarifadoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_almoxarifado: number;

  @IsNumber()
  @ApiProperty()
  id_pedido: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  qtdeDecimal;

  @IsString()
  @ApiProperty()
  status: string;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_alteracao: Date;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_inclusao: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valorDecimal;
}
