import { Injectable } from '@nestjs/common';
import { CreatePermissaoUsuarioDto } from './dto/create-permissao-usuario.dto';
import { UpdatePermissaoUsuarioDto } from './dto/update-permissao-usuario.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class PermissaoUsuariosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(data: CreatePermissaoUsuarioDto) {
    return this.prismaTenant.prisma.client.permissoes_usuario.create({
      data: this.prismaTenant.addTenantToData(data),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.permissoes_usuario.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.permissoes_usuario.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePermissaoUsuarioDto) {
    return this.prismaTenant.prisma.client.permissoes_usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.permissoes_usuario.delete({
      where: { id },
    });
  }
}
