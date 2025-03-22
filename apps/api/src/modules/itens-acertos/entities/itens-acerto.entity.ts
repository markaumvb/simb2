import { ApiProperty } from '@nestjs/swagger';
// Importe apenas Prisma, não o modelo específico
import { Prisma } from '@database';

// Crie a interface manualmente
export class ItensAcertoEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  // Use tipo de dados mais genérico para o Decimal
  @ApiProperty({ type: Number, nullable: true })
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
