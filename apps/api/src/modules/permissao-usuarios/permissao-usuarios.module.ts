import { Module } from '@nestjs/common';
import { PermissaoUsuariosService } from './permissao-usuarios.service';
import { PermissaoUsuariosController } from './permissao-usuarios.controller';

@Module({
  controllers: [PermissaoUsuariosController],
  providers: [PermissaoUsuariosService]
})
export class PermissaoUsuariosModule {}
