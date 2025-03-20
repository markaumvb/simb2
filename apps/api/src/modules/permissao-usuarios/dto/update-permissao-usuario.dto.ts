import { PartialType } from '@nestjs/swagger';
import { CreatePermissaoUsuarioDto } from './create-permissao-usuario.dto';

export class UpdatePermissaoUsuarioDto extends PartialType(CreatePermissaoUsuarioDto) {}
