import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Log_mesa } from '@database';
import { Transform, Type } from 'class-transformer';
import { MesaEntity } from '@app/modules/mesas/entities/mesa.entity';
import { Decimal } from '@prisma/client/runtime/library';

export class LogMesaEntity implements Log_mesa {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_mesa: number;

  @ApiProperty()
  contador_anterior: number | null;

  @ApiProperty()
  contador_atual: number | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  @ApiProperty()
  valor_anterior: Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  @ApiProperty()
  valor_atual: Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  porcentagem_anterior: Prisma.Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  @ApiProperty()
  porcentagem_atual: Prisma.Decimal | null;

  @ApiProperty()
  data: Date | null;

  @ApiProperty()
  id_linha: number | null;

  @ApiProperty()
  id_movimentacao: number | null;

  @ApiProperty()
  cord_x: string | null;

  @ApiProperty()
  cord_y: string | null;

  @ApiProperty()
  id_funcionario: number | null;

  @ApiProperty()
  tenant_id: number;

  @ApiProperty({ type: [MesaEntity], required: false })
  @Type(() => MesaEntity)
  mesa?: MesaEntity;

  constructor(partial: Partial<LogMesaEntity>) {
    Object.assign(this, partial);
  }
}
