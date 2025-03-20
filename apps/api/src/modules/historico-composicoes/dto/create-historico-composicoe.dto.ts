import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHistoricoComposicoeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_composicao: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  saldo: number;

  @IsDate()
  @ApiProperty()
  dt_inclusao: Date | null;

  @IsDate()
  @ApiProperty()
  dt_alteracao: Date | null;
}
