import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMesaSaidaDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_mesa: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_linha: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id_movimentacao: number;

  @IsDate()
  @ApiProperty()
  data_hora: Date | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_alteracao: Date | null;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dt_inclusao: Date | null;

  @IsOptional()
  @ApiProperty()
  coord_x: string | null;

  @IsOptional()
  @ApiProperty()
  coord_y: string | null;

  @IsNumber()
  @ApiProperty()
  id_ponto: number | null;
}
