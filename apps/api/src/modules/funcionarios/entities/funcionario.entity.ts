import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Funcionario } from '@database';
import { Exclude, Transform, Type } from 'class-transformer';
import { PermissaoUsuarioEntity } from 'src/modules/permissao-usuarios/entities/permissao-usuario.entity';

export class FuncionarioEntity implements Funcionario {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ type: Date })
  dt_nascimento: Date;

  @ApiProperty()
  endereco: string;

  @ApiProperty()
  id_cidade: number;

  @ApiProperty()
  bairro: string;

  @ApiProperty({ required: false, nullable: true })
  telefone: string | null;

  @ApiProperty()
  cpf: string;

  @ApiProperty({ required: false, nullable: true })
  cep: string | null;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  dt_admissao: Date;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty({ required: false, nullable: true })
  celular: string | null;

  @ApiProperty({ required: false, nullable: true })
  numero_endereco: number | null;

  @ApiProperty({ required: false, nullable: true })
  complemento: string;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  salario_base: Prisma.Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  comissao: Prisma.Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  vale_alimentacao: Prisma.Decimal | null;

  @Transform(({ value }) => {
    return Number(value);
  })
  @ApiProperty({ type: Number, nullable: true })
  nota_promissoria: Prisma.Decimal | null;

  @Exclude()
  senha: string;

  @ApiProperty()
  dt_aposentadoria: Date | null;

  @ApiProperty()
  email: string;

  @ApiProperty()
  tenant_id: number;

  @ApiProperty({ type: [PermissaoUsuarioEntity], required: false })
  @Type(() => PermissaoUsuarioEntity)
  permissoes_usuario?: PermissaoUsuarioEntity[];

  constructor(partial: Partial<FuncionarioEntity>) {
    Object.assign(this, partial);
  }
}
