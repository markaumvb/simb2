import { ApiProperty } from '@nestjs/swagger';
import { cliente } from '@prisma/client';
import { Type } from 'class-transformer';
import { DebitosClienteEntity } from 'src/modules/debitos-clientes/entities/debitos-cliente.entity';

export class ClienteEntity implements cliente {
  @ApiProperty()
  id: number;

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

  @ApiProperty({ required: true, nullable: false })
  nome: string;

  @ApiProperty({ required: true, nullable: false })
  ativo: boolean;

  @ApiProperty({ required: true, nullable: false })
  id_linha: number;

  @ApiProperty()
  cep: string | null;

  @ApiProperty()
  dt_nascimento: Date | null;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @ApiProperty()
  complemento: string | null;

  @ApiProperty()
  numero: string | null;

  @ApiProperty()
  tipo_pessoa: string | null;

  @ApiProperty({ type: [DebitosClienteEntity], required: false })
  @Type(() => DebitosClienteEntity)
  debitos_cliente?: DebitosClienteEntity[];

  constructor(partial: Partial<ClienteEntity>) {
    Object.assign(this, partial);
  }
}
