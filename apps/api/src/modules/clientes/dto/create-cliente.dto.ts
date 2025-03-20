import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_cidade: number;

  @ApiProperty()
  documento: string | null;

  @ApiProperty()
  endereco: string | null;

  @ApiProperty()
  bairro: string | null;

  @ApiProperty()
  fone: string | null;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, nullable: false })
  nome: string;

  @IsBoolean()
  @ApiProperty({ required: true, nullable: false })
  ativo: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, nullable: false })
  id_linha: number;

  @ApiProperty()
  cep: string | null;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_nascimento: Date | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  complemento: string | null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  numero: string | null;

  @ApiProperty()
  tipo_pessoa: string | null;
}
