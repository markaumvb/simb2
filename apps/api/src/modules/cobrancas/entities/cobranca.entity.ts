import { ApiProperty } from '@nestjs/swagger';
import { Prisma, cobranca } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CobrancaEntitity implements cobranca {
  @ApiProperty()
  id: number;

  @ApiProperty()
  data_hora: Date;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_mesa: number;

  @ApiProperty()
  id_movimentacao: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  valor_cobrado: Prisma.Decimal;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  desconto: Prisma.Decimal | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  contador_anterior: number;

  @ApiProperty()
  contador_atual: number;

  @ApiProperty()
  motivo_visita: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  coord_x: string | null;

  @ApiProperty()
  id_ponto: number | null;

  @ApiProperty()
  tipo_cobranca: string | null;

  @ApiProperty()
  id_funcionario: number;

  @ApiProperty()
  contador_brinde_atual: number | null;

  @ApiProperty()
  contador_brinde_anterior: number | null;

  constructor(partial: Partial<CobrancaEntitity>) {
    Object.assign(this, partial);
  }
}
