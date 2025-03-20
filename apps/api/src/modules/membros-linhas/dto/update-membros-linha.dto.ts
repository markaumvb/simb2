import { PartialType } from '@nestjs/swagger';
import { CreateMembrosLinhaDto } from './create-membros-linha.dto';

export class UpdateMembrosLinhaDto extends PartialType(CreateMembrosLinhaDto) {}
