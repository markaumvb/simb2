import { PartialType } from '@nestjs/swagger';
import { CreateComposicoeDto } from './create-composicoe.dto';

export class UpdateComposicoeDto extends PartialType(CreateComposicoeDto) {}
