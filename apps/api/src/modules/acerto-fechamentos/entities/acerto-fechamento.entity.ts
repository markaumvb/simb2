import { ApiProperty } from '@nestjs/swagger';
import { Acerto_fechamento } from '@database';
import { Type } from 'class-transformer';
import { ItensAcertoEntity } from '@app/modules/itens-acertos/entities/itens-acerto.entity';

export class AcertoFechamentoEntity implements Acerto_fechamento {
  @ApiProperty()
  id: number;

  @ApiProperty()
  data: Date;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_movimentacao: number;

  @ApiProperty()
  id_funcionario: number;

  @ApiProperty({ nullable: true })
  dt_alteracao: Date | null;

  @ApiProperty({ nullable: true })
  dt_inclusao: Date | null;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  tenant_id: number;

  @ApiProperty({ type: [ItensAcertoEntity], required: false })
  @Type(() => ItensAcertoEntity)
  itens_acerto?: ItensAcertoEntity[];

  constructor(partial: Partial<AcertoFechamentoEntity>) {
    Object.assign(this, partial);
  }
}
