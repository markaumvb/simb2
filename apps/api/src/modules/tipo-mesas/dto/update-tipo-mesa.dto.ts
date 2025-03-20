import { PartialType } from '@nestjs/swagger';
import { CreateTipoMesaDto } from './create-tipo-mesa.dto';

export class UpdateTipoMesaDto extends PartialType(CreateTipoMesaDto) {}
