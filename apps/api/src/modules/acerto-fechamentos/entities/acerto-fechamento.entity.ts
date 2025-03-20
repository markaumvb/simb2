import { ApiProperty } from '@nestjs/swagger';
import { acerto_fechamento } from '@prisma/client';
import { Type } from 'class-transformer';
import { ItensAcertoEntity } from 'src/modules/itens-acertos/entities/itens-acerto.entity';

export class AcertoFechamentoEntity implements acerto_fechamento {
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

  @ApiProperty({ type: [ItensAcertoEntity], required: false })
  @Type(() => ItensAcertoEntity)
  itens_acerto?: ItensAcertoEntity[];

  constructor(partial: Partial<AcertoFechamentoEntity>) {
    Object.assign(this, partial);
  }
}
