import { Injectable } from '@nestjs/common';
import { CreatePermissaoUsuarioDto } from './dto/create-permissao-usuario.dto';
import { UpdatePermissaoUsuarioDto } from './dto/update-permissao-usuario.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PermissaoUsuariosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreatePermissaoUsuarioDto) {
    return this.prismaTenant.prisma.permissoes_usuario.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.permissoes_usuario.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.permissoes_usuario.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdatePermissaoUsuarioDto) {
    return this.prismaTenant.prisma.permissoes_usuario.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.permissoes_usuario.delete({
      where: { id },
    });
  }
}
