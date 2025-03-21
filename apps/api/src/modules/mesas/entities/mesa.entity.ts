import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Mesa } from '@database';
import { Transform, Type } from 'class-transformer';
import { CobrancaEntitity } from '@app/modules/cobrancas/entities/cobranca.entity';
import { ComposicoeEntity } from '@app/modules/composicoes/entities/composicoe.entity';
import { PontoEntity } from '@app/modules/pontos/entities/ponto.entity';
import { TipoMesaEntity } from '@app/modules/tipo-mesas/entities/tipo-mesa.entity';

export class MesaEntity implements Mesa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  cont_atual: number;

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
  ativa: boolean;

  @ApiProperty()
  tenant_id: number;

  @ApiProperty({ required: false, type: TipoMesaEntity })
  @Type(() => TipoMesaEntity)
  tipomesa?: TipoMesaEntity;

  @ApiProperty({ type: [ComposicoeEntity], required: false })
  @Type(() => ComposicoeEntity)
  composicao?: ComposicoeEntity[];

  @ApiProperty({ type: [CobrancaEntitity], required: false })
  @Type(() => CobrancaEntitity)
  cobranca?: CobrancaEntitity[];

  @ApiProperty({ type: [PontoEntity], required: false })
  @Type(() => PontoEntity)
  ponto?: PontoEntity;

  constructor(partial: Partial<MesaEntity>) {
    Object.assign(this, partial);
  }
}
