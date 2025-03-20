import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTipoDespesaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  descricao: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_inclusao: Date | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsBoolean()
  @ApiProperty()
  status: boolean | null;
}
