// src/modules/log-mesas/dto/create-log-mesa.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMesaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_mesa: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  contador_anterior: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  contador_atual: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: Number, nullable: true })
  valor_anterior: number | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: Number, nullable: true })
  valor_atual: number | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: Number, nullable: true })
  porcentagem_anterior: number | null;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: Number, nullable: true })
  porcentagem_atual: number | null;

  @IsDate()
  @ApiProperty()
  data: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_movimentacao: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  cord_x: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  cord_y: string | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  id_funcionario: number | null;
}
