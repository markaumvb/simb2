import { PartialType } from '@nestjs/swagger';
import { CreateMesaEntradaDto } from './create-mesa-entrada.dto';

export class UpdateMesaEntradaDto extends PartialType(CreateMesaEntradaDto) {}
