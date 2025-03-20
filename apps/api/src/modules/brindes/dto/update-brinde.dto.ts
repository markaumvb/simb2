import { PartialType } from '@nestjs/swagger';
import { CreateBrindeDto } from './create-brinde.dto';

export class UpdateBrindeDto extends PartialType(CreateBrindeDto) {}
