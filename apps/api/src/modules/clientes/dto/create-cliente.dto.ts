import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_cidade: number;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{11}$|^[0-9]{14}$/, {
    message: 'Documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)',
  })
  @ApiProperty()
  documento: string;

  @ApiProperty()
  endereco: string | null;

  @ApiProperty()
  bairro: string | null;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{10,11}$/, {
    message: 'Telefone deve conter entre 10 e 11 dígitos',
  })
  @ApiProperty()
  fone: string;

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
