import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBrindeDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  taco: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  trofeu: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  outros: boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  dt_alteracao: Date | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  @IsNumber()
  id_linha: number;

  @ApiProperty()
  @IsNumber()
  id_movimentacao: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id_mesa: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  troca_pano: boolean;

  @IsDate()
  @ApiProperty()
  data: Date;
}
