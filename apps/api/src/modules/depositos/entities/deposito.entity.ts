import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Deposito, Especie } from '@database';
import { Transform } from 'class-transformer';

export class DepositoEntity implements Deposito {
  @ApiProperty()
  id: number;

  @ApiProperty()
  dt_hora: Date;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor: Prisma.Decimal;

  @ApiProperty({ enum: Especie })
  especie: Especie;

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

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<DepositoEntity>) {
    Object.assign(this, partial);
  }
}
