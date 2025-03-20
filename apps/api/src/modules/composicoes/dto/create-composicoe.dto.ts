import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateComposicoeDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id_mesa: number;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  dt_alteracao: Date;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  saldo: Prisma.Decimal | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id_almoxarifado: number;

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
