import { ApiProperty } from '@nestjs/swagger';
import { Ponto_cliente } from '@database';

export class PontoClienteEntity implements Ponto_cliente {
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

  @ApiProperty()
  tenant_id: number;

  constructor(partial: Partial<PontoClienteEntity>) {
    Object.assign(this, partial);
  }
}
