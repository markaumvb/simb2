import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]{3,100}$/, {
    message:
      'Nome deve conter apenas letras e espaços, entre 3 e 100 caracteres',
  })
  @ApiProperty()
  nome: string;
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  dt_nascimento: Date;

  @ApiProperty()
  endereco: string;

  @IsNotEmpty()
  @ApiProperty()
  id_cidade: number;

  @ApiProperty()
  bairro: string;

  @ApiProperty({ required: false })
  telefone: string | null;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter 11 dígitos',
  })
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  cep: string | null;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  dt_admissao: Date;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  celular: string | null;

  @ApiProperty()
  numero_endereco: number | null;

  @ApiProperty({ required: false })
  complemento: string | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  salario_base: number | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  comissao: number | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  vale_alimentacao: number | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  nota_promissoria: number | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  senha: string;

  @ApiProperty()
  dt_aposentadoria: Date | null;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
}
