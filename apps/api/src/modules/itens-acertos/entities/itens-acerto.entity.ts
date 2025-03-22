import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Prisma } from '@database';

export class ItensAcertoEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @Transform(({ value }) => {
    return value === null ? null : Number(value);
  })
  @ApiProperty({ type: Number })
  valor: Prisma.Decimal | number; // Aceita ambos os tipos

  @ApiProperty()
  data: Date;

  @ApiProperty()
  id_acerto_fechamento: number;

  @ApiProperty()
  debito_credito: string;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  id_item_acerto: number | null;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<ItensAcertoEntity>) {
    // Garantir que valores Decimal sejam convertidos para number
    if (
      partial &&
      partial.valor &&
      typeof partial.valor === 'object' &&
      'toNumber' in partial.valor
    ) {
      partial = {
        ...partial,
        valor: Number(partial.valor),
      };
    }
    Object.assign(this, partial);
  }
}
