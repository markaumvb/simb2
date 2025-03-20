import { ApiProperty } from '@nestjs/swagger';
import { Prisma, debitos_cliente } from '@prisma/client';
import { Transform } from 'class-transformer';

export class DebitosClienteEntity implements debitos_cliente {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_cliente: number;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

  @ApiProperty()
  debito_credito: string;

  constructor(partial: Partial<DebitosClienteEntity>) {
    Object.assign(this, partial);
  }
}
