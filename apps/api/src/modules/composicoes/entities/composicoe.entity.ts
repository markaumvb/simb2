import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Composicao } from '@database';
import { Transform, Type } from 'class-transformer';
import { AlmoxarifadoEntity } from '@app/modules/almoxarifados/entities/almoxarifado.entity';

export class ComposicoeEntity implements Composicao {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_mesa: number;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  saldo: Prisma.Decimal | null;

  @ApiProperty()
  id_almoxarifado: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  tenant_id: number;

  @ApiProperty({ type: [AlmoxarifadoEntity], required: false })
  @Type(() => AlmoxarifadoEntity)
  almoxarifado?: AlmoxarifadoEntity;

  constructor(partial: Partial<ComposicoeEntity>) {
    Object.assign(this, partial);
  }
}
