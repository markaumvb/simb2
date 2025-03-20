import { ApiProperty } from '@nestjs/swagger';
import { Pedido_almoxarifado } from '@database';

export class PedidoAlmoxarifadoEntity implements Pedido_almoxarifado {
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

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<PedidoAlmoxarifadoEntity>) {
    Object.assign(this, partial);
  }
}
