import { ApiProperty } from '@nestjs/swagger';
import { Itens_pedido_almoxarifado } from '@database';
import { Transform } from 'class-transformer';

export class ItensPedidoAlmoxarifadoEntity
  implements Itens_pedido_almoxarifado
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_almoxarifado: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  qtdeDecimal;

  @ApiProperty()
  status: string;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valorDecimal;

  @ApiProperty()
  id_pedido: number;

  constructor(partial: Partial<ItensPedidoAlmoxarifadoEntity>) {
    Object.assign(this, partial);
  }
}
