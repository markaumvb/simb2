import { PartialType } from '@nestjs/swagger';
import { CreateAlmoxarifadoDto } from './create-almoxarifado.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusAlmoxarifado } from '@database';

export class UpdateAlmoxarifadoDto extends PartialType(CreateAlmoxarifadoDto) {
  // Redefina explicitamente o campo status para garantir que o tipo correto seja usado
  @IsOptional()
  @IsEnum(StatusAlmoxarifado)
  @ApiProperty({ enum: StatusAlmoxarifado, required: false })
  status?: StatusAlmoxarifado;
}
