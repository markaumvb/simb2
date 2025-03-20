import { ApiProperty } from '@nestjs/swagger';
import { Prisma, deposito } from '@prisma/client';
import { Transform } from 'class-transformer';

export class DepositoEntity implements deposito {
  @ApiProperty()
  id: number;

  @ApiProperty()
  dt_hora: Date;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => {
    return Number(value);
  })
  valor: Prisma.Decimal;

  @ApiProperty({ type: Number })
  especie: string;

  @ApiProperty({ type: Number })
  dt_cheque: Date | null;

  @ApiProperty({ type: Number })
  id_linha: number;

  @ApiProperty({ type: Number })
  id_movimentacao: number;

  @ApiProperty({ type: Number })
  dt_alteracao: Date | null;

  @ApiProperty({ type: Number })
  dt_inclusao: Date | null;

  @ApiProperty({ type: Number })
  id_cliente: number | null;

  @ApiProperty({ type: Number })
  numero_boleto: string | null;

  @ApiProperty({ type: Number })
  id_funcionario: number;

  constructor(partial: Partial<DepositoEntity>) {
    Object.assign(this, partial);
  }
}
