import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ItensAcertoEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  valor: number;

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
    Object.assign(this, partial);
  }
}
