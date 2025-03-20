import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePedidoAlmoxarifadoDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  data: Date;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_inclusao: Date | null;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_alteracao: Date | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_movimentacao: number;
}
