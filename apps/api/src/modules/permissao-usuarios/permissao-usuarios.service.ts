import { Injectable } from '@nestjs/common';
import { CreatePermissaoUsuarioDto } from './dto/create-permissao-usuario.dto';
import { UpdatePermissaoUsuarioDto } from './dto/update-permissao-usuario.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PermissaoUsuariosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(data: CreatePermissaoUsuarioDto) {): Promise<any> {
    return this.prismaTenant.prisma.permissoes_usuario.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.permissoes_usuario.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.permissoes_usuario.findUnique({
      where: { id },
    });
  }

  async update(update(id: number, data: UpdatePermissaoUsuarioDto) {): Promise<any> {
    return this.prismaTenant.prisma.permissoes_usuario.update({
      where: { id },
      data,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.permissoes_usuario.delete({
      where: { id },
    });
  }
}
