import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@database';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePontoDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_cidade: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endereco: string;

  @ApiProperty()
  cep: string | null;

  @ApiProperty()
  coord_y: string | null;

  @ApiProperty()
  coord_x: string | null;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_inclusao: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  complemento: string | null;

  @ApiProperty()
  bairro: string | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  numero_ponto: number;

  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  paga_aluguel: boolean;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  valor_aluguelDecimal | null;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  numero_endereco: number | null;
}
