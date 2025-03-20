import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFuncaoDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ nullable: false })
  dt_alteracao: Date | null;

  @IsDate()
  @IsOptional()
  @ApiProperty({ nullable: false })
  dt_inclusao: Date | null;

  @IsNumber()
  @ApiProperty()
  id_sistema: number;
}
