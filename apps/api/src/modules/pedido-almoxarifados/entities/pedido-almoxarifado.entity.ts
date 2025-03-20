import { ApiProperty } from '@nestjs/swagger';
import { pedido_almoxarifado } from '@prisma/client';

export class PedidoAlmoxarifadoEntity implements pedido_almoxarifado {
  @ApiProperty()
  id: number;

  @ApiProperty()
  data: Date;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  status: string;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_movimentacao: number;

  constructor(partial: Partial<PedidoAlmoxarifadoEntity>) {
    Object.assign(this, partial);
  }
}
