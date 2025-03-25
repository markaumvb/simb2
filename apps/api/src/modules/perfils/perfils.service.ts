import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class PerfilsService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createPerfilDto: CreatePerfilDto) {
    return this.prismaTenant.prisma.client.perfil.create({
      data: this.prismaTenant.addTenantToData(createPerfilDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.perfil.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.perfil.findUnique({ where: { id } });
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return this.prismaTenant.prisma.client.perfil.update({
      where: { id },
      data: updatePerfilDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.perfil.delete({ where: { id } });
  }
}
