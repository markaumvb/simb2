import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateCidadeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  uf: string;

  @ApiProperty()
  @IsOptional()
  dt_alteracao: Date;

  // Novo campo
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  tenant_id?: number;
}
