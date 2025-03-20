import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAcertoFechamentoDto {
  @ApiProperty()
  @IsDate()
  data: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id_linha: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_movimentacao: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_funcionario: number;

  @ApiProperty()
  dt_alteracao: Date | null;

  @ApiProperty()
  dt_inclusao: Date | null;

  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
