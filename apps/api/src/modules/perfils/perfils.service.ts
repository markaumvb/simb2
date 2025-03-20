import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PerfilsService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createPerfilDto: CreatePerfilDto) {
    return this.prismaTenant.prisma.perfil.create({ data: createPerfilDto });
  }

  findAll() {
    return this.prismaTenant.prisma.perfil.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.perfil.findUnique({ where: { id } });
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return this.prismaTenant.prisma.perfil.update({
      where: { id },
      data: updatePerfilDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.perfil.delete({ where: { id } });
  }
}
