import { PartialType } from '@nestjs/swagger';
import { CreateHistoricoPontoDto } from './create-historico-ponto.dto';

export class UpdateHistoricoPontoDto extends PartialType(CreateHistoricoPontoDto) {}
