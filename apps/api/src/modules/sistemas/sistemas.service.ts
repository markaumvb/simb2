import { Injectable } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class SistemasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createSistemaDto: CreateSistemaDto) {
    return this.prismaTenant.prisma.client.sistema.create({
      data: this.prismaTenant.addTenantToData(createSistemaDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.sistema.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.sistema.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSistemaDto: UpdateSistemaDto) {
    return this.prismaTenant.prisma.client.sistema.update({
      where: { id },
      data: updateSistemaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.sistema.delete({ where: { id } });
  }
}
