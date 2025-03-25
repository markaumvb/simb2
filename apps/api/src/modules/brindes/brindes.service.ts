import { Injectable } from '@nestjs/common';
import { CreateBrindeDto } from './dto/create-brinde.dto';
import { UpdateBrindeDto } from './dto/update-brinde.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class BrindesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createBrindeDto: CreateBrindeDto) {
    return this.prismaTenant.prisma.client.brinde.create({
      data: this.prismaTenant.addTenantToData(createBrindeDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.brinde.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.brinde.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBrindeDto: UpdateBrindeDto) {
    return this.prismaTenant.prisma.client.brinde.update({
      where: { id },
      data: updateBrindeDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.brinde.delete({ where: { id } });
  }
}
