// src/modules/itens-pedido-almoxarifados/entities/itens-pedido-almoxarifado.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Itens_pedido_almoxarifado, Prisma } from '@database';
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
  @ApiProperty({ type: Number })
  qtde: Prisma.Decimal;

  @ApiProperty()
  status: string;

  @ApiProperty()
  dt_alteracao: Date;

  @ApiProperty()
  dt_inclusao: Date;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  valor: Prisma.Decimal;

  @ApiProperty()
  id_pedido: number;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<ItensPedidoAlmoxarifadoEntity>) {
    Object.assign(this, partial);
  }
}
