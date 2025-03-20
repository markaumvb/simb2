import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsBoolean()
  @ApiProperty()
  cidade: boolean;

  @IsBoolean()
  @ApiProperty()
  cliente: boolean;

  @IsBoolean()
  @ApiProperty()
  debitos_cliente: boolean;

  @IsBoolean()
  @ApiProperty()
  movimentacao: boolean;

  @IsBoolean()
  @ApiProperty()
  deposito: boolean;

  @IsBoolean()
  @ApiProperty()
  despesa: boolean;

  @IsBoolean()
  @ApiProperty()
  funcionario: boolean;

  @IsBoolean()
  @ApiProperty()
  linha: boolean;

  @IsBoolean()
  @ApiProperty()
  mesa: boolean;

  @IsBoolean()
  @ApiProperty()
  cobranca: boolean;

  @IsBoolean()
  @ApiProperty()
  perfil: boolean;

  @IsDate()
  @ApiProperty()
  dt_alteracao: Date;

  @IsDate()
  @ApiProperty()
  dt_inclusao: Date;

  @IsBoolean()
  @ApiProperty()
  per_gestor: boolean;

  @IsBoolean()
  @ApiProperty()
  ponto: boolean;
}
