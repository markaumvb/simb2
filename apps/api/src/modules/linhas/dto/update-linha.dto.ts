import { PartialType } from '@nestjs/swagger';
import { CreateLinhaDto } from './create-linha.dto';

export class UpdateLinhaDto extends PartialType(CreateLinhaDto) {}
