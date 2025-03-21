import { Injectable } from '@nestjs/common';
import { CreatePermissaoUsuarioDto } from './dto/create-permissao-usuario.dto';
import { UpdatePermissaoUsuarioDto } from './dto/update-permissao-usuario.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PermissaoUsuariosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePermissaoUsuarioDto) {
    return this.prisma.permissoes_usuario.create({ data });
  }

  findAll() {
    return this.prisma.permissoes_usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.permissoes_usuario.findUnique({ where: { id } });
  }

  update(id: number, data: UpdatePermissaoUsuarioDto) {
    return this.prisma.permissoes_usuario.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.permissoes_usuario.delete({ where: { id } });
  }
}
