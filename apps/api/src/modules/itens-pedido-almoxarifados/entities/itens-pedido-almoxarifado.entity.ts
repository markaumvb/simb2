import { ApiProperty } from '@nestjs/swagger';
import { Prisma, itens_pedido_almoxarifado } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ItensPedidoAlmoxarifadoEntity
  implements itens_pedido_almoxarifado
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_almoxarifado: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
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
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

  @ApiProperty()
  id_pedido: number;

  constructor(partial: Partial<ItensPedidoAlmoxarifadoEntity>) {
    Object.assign(this, partial);
  }
}
