import { ApiProperty } from '@nestjs/swagger';
import { Prisma, ponto } from '@prisma/client';
import { Transform } from 'class-transformer';

export class PontoEntity implements ponto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  id_cidade: number;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  numero_endereco: number | null;

  @ApiProperty()
  cep: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  coord_x: string | null;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  complemento: string | null;

  @ApiProperty()
  bairro: string | null;

  @ApiProperty()
  numero_ponto: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  paga_aluguel: boolean;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor_aluguel: Prisma.Decimal | null;

  constructor(partial: Partial<PontoEntity>) {
    Object.assign(this, partial);
  }
}
