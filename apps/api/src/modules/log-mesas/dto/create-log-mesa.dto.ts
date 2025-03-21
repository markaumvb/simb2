import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isNotEmpty,
} from 'class-validator';

export class CreateLogMesaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_mesa: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  contador_anterior: number | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  contador_atual: number | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor_anteriorDecimal | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor_atualDecimal | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  porcentagem_anteriorDecimal | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  @ApiProperty()
  porcentagem_atualDecimal | null;

  @IsDate()
  @ApiProperty()
  data: Date | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_movimentacao: number | null;

  @ApiProperty()
  cord_x: string | null;

  @ApiProperty()
  cord_y: string | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_funcionario: number | null;
}
