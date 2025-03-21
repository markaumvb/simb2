import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCobrancaDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  data_hora: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_linha: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_mesa: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_movimentacao: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  valor_cobradoDecimal;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  descontoDecimal | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @IsNumber()
  @ApiProperty()
  contador_anterior: number;

  @IsNumber()
  @ApiProperty()
  contador_atual: number;

  @ApiProperty()
  motivo_visita: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  coord_x: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_ponto: number | null;

  @ApiProperty()
  tipo_cobranca: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_funcionario: number;

  @ApiProperty()
  contador_brinde_atual: number | null;

  @ApiProperty()
  contador_brinde_anterior: number | null;
}
