import { PartialType } from '@nestjs/swagger';
import { CreateFuncionarioPerfilDto } from './create-funcionario-perfil.dto';

export class UpdateFuncionarioPerfilDto extends PartialType(CreateFuncionarioPerfilDto) {}
