import { Injectable } from '@nestjs/common';
import { CreateBrindeDto } from './dto/create-brinde.dto';
import { UpdateBrindeDto } from './dto/update-brinde.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class BrindesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createBrindeDto: CreateBrindeDto) {
    return this.prismaTenant.prisma.client.brinde.create({
      data: createBrindeDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.brinde.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.brinde.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBrindeDto: UpdateBrindeDto) {
    return this.prismaTenant.prisma.client.brinde.update({
      where: { id },
      data: updateBrindeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.brinde.delete({ where: { id } });
  }
}
