import { PartialType } from '@nestjs/swagger';
import { CreateMesaSaidaDto } from './create-mesa-saida.dto';

export class UpdateMesaSaidaDto extends PartialType(CreateMesaSaidaDto) {}
