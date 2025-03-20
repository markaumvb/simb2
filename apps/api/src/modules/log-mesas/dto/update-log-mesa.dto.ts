import { PartialType } from '@nestjs/swagger';
import { CreateLogMesaDto } from './create-log-mesa.dto';

export class UpdateLogMesaDto extends PartialType(CreateLogMesaDto) {}
