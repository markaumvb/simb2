import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAcertoFechamentoDto } from './create-acerto-fechamento.dto';
import { IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateAcertoFechamentoDto extends PartialType(
  CreateAcertoFechamentoDto,
) {
  @ApiProperty({ required: false })
  @IsOptional()
  dt_alteracao?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  dt_inclusao?: Date;

  @IsEnum(Status) // Validar como enum
  @ApiProperty({ enum: Status, enumName: 'Status' }) // Tipo para Swagger
  status: Status;
}
