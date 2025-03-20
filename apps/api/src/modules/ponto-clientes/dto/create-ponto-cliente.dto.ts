import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePontoClienteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fantasia: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_linha: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_ponto: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_cliente: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsOptional()
  documento: string | null;

  @IsBoolean()
  @ApiProperty()
  ativo: boolean;

  @IsDate()
  @ApiProperty()
  dt_inclusao: Date;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_alteracao: Date | null;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dt_encerramento: Date | null;
}
