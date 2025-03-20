import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Prisma, itens_acerto } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ItensAcertoEntity implements itens_acerto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

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

  constructor(partial: Partial<ItensAcertoEntity>) {
    Object.assign(this, partial);
  }
}
