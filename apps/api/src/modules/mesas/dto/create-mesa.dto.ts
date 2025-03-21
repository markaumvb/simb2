import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMesaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O número da mesa ou máquina, deve ser único no sistema',
    example: '1',
  })
  id: number;

  @IsString()
  @ApiProperty()
  status: string;

  @IsNumber()
  @ApiProperty()
  cont_atual: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  cont_anterior: number;

  @ApiProperty()
  tipo_cobranca: string | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  porcentagem_cliente: Prisma.Decimal | null;

  @ApiProperty()
  dt_locacao: Date | null;

  @ApiProperty()
  id_linha: number | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

  @IsNumber()
  @ApiProperty()
  id_tipo: number;

  @ApiProperty()
  meses_cobranca: number | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  cord_x: string | null;

  @ApiProperty()
  cord_y: string | null;

  @ApiProperty()
  dt_entrada_linha: Date;

  @ApiProperty()
  dt_saida_linha: Date;

  @ApiProperty()
  id_ponto: number;

  @ApiProperty()
  chave: string;

  @ApiProperty()
  cont_brinde_anterior: number;

  @ApiProperty()
  cont_brinde_atual: number;

  @ApiProperty()
  @IsBoolean()
  ativa: boolean;
}
