import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItensAcertoDto {
  @IsString()
  @ApiProperty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

  @IsDate()
  @ApiProperty()
  data: Date;

  @IsNumber()
  @ApiProperty()
  id_acerto_fechamento: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  debito_credito: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_inclusao: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_alteracao: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id_item_acerto: number | null;
}
