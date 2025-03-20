import { ApiProperty } from '@nestjs/swagger';
import { ponto_cliente } from '@prisma/client';

export class PontoClienteEntity implements ponto_cliente {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fantasia: string;

  @ApiProperty()
  id_linha: number;

  @ApiProperty()
  id_ponto: number;

  @ApiProperty()
  id_cliente: number;

  @ApiProperty()
  documento: string | null;

  @ApiProperty()
  ativo: boolean;

  @ApiProperty()
  dt_inclusao: Date;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_encerramento: Date | null;

  constructor(partial: Partial<PontoClienteEntity>) {
    Object.assign(this, partial);
  }
}
