import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMovimentacoeDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  descricao: string;

  @IsBoolean()
  @ApiProperty({ required: true })
  status: boolean;

  @IsDate()
  @ApiProperty({ required: true })
  dt_inicio: Date;

  @ApiProperty()
  dt_encerramento: Date | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id_linha: number;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_possivel_encerramento: Date | null;
}
