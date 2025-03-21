import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PerfilsService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createPerfilDto: CreatePerfilDto) {): Promise<any> {
    return this.prismaTenant.prisma.perfil.create({ data: createPerfilDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.perfil.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.perfil.findUnique({ where: { id } });
  }

  async update(update(id: number, updatePerfilDto: UpdatePerfilDto) {): Promise<any> {
    return this.prismaTenant.prisma.perfil.update({
      where: { id },
      data: updatePerfilDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.perfil.delete({ where: { id } });
  }
}
