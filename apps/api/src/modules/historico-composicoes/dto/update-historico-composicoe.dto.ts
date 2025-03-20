import { PartialType } from '@nestjs/swagger';
import { CreateHistoricoComposicoeDto } from './create-historico-composicoe.dto';

export class UpdateHistoricoComposicoeDto extends PartialType(CreateHistoricoComposicoeDto) {}
