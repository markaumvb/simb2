import { ApiProperty } from '@nestjs/swagger';
import { Prisma, log_mesa } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { MesaEntity } from 'src/modules/mesas/entities/mesa.entity';

export class LogMesaEntity implements log_mesa {
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
  valor_anterior: Prisma.Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  @ApiProperty()
  valor_atual: Prisma.Decimal | null;

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

  @ApiProperty({ type: [MesaEntity], required: false })
  @Type(() => MesaEntity)
  mesa?: MesaEntity;

  constructor(partial: Partial<LogMesaEntity>) {
    Object.assign(this, partial);
  }
}
