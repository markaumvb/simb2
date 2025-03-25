import { CreateItensAcertoDto } from '@app/modules/itens-acertos/dto/create-itens-acerto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

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

  @ApiProperty({ type: [CreateItensAcertoDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateItensAcertoDto)
  itens?: CreateItensAcertoDto[];
}
