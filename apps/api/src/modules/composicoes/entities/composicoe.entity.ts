import { ApiProperty } from '@nestjs/swagger';
import { Prisma, composicao } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { AlmoxarifadoEntity } from 'src/modules/almoxarifados/entities/almoxarifado.entity';

export class ComposicoeEntity implements composicao {
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

  @ApiProperty({ type: [AlmoxarifadoEntity], required: false })
  @Type(() => AlmoxarifadoEntity)
  almoxarifado?: AlmoxarifadoEntity;

  constructor(partial: Partial<ComposicoeEntity>) {
    Object.assign(this, partial);
  }
}
