import { PartialType } from '@nestjs/swagger';
import { CreateItensAcertoDto } from './create-itens-acerto.dto';

export class UpdateItensAcertoDto extends PartialType(CreateItensAcertoDto) {}
