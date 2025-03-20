import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Almoxarifado } from '@database';
import { Transform } from 'class-transformer';

export class AlmoxarifadoEntity implements Almoxarifado {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  valor_unitario: Prisma.Decimal;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number })
  saldo: Prisma.Decimal;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  saldo_min: Prisma.Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  saldo_max: Prisma.Decimal | null;

  @ApiProperty()
  status: string;

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<AlmoxarifadoEntity>) {
    Object.assign(this, partial);
  }
}
