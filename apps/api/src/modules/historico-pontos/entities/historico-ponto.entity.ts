import { ApiProperty } from '@nestjs/swagger';
import { Prisma, historico_ponto } from '@prisma/client';
import { Transform } from 'class-transformer';

export class HistoricoPontoEntity implements historico_ponto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_ponto: number;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_movimentacao: number;

  @ApiProperty()
  numero_ponto: number | null;

  @ApiProperty()
  dt_inclusao_ponto: Date | null;

  @ApiProperty()
  dt_alteracao_ponto: Date | null;

  @ApiProperty()
  cliente: string;

  @ApiProperty()
  dt_inicio_cliente: Date | null;

  @ApiProperty()
  dt_encerramento_cliente: Date | null;

  @ApiProperty()
  fantasia: string | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  qtde_mesa: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  media_cobranca: Prisma.Decimal | null;

  constructor(partial: Partial<HistoricoPontoEntity>) {
    Object.assign(this, partial);
  }
}
