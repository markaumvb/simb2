import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateFuncionarioDto {
  @IsNotEmpty()
  @IsString()
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

  @IsNotEmpty()
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
  salario_base: Prisma.Decimal | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  comissao: Prisma.Decimal | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  vale_alimentacao: Prisma.Decimal | null;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  nota_promissoria: Prisma.Decimal | null;

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
