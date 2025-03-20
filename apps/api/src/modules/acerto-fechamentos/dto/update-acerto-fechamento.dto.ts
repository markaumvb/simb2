import { PartialType } from '@nestjs/swagger';
import { CreateAcertoFechamentoDto } from './create-acerto-fechamento.dto';

export class UpdateAcertoFechamentoDto extends PartialType(CreateAcertoFechamentoDto) {}
