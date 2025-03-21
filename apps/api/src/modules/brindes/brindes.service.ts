import { Injectable } from '@nestjs/common';
import { CreateBrindeDto } from './dto/create-brinde.dto';
import { UpdateBrindeDto } from './dto/update-brinde.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class BrindesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createBrindeDto: CreateBrindeDto) {
    return this.prismaTenant.prisma.brinde.create({ data: createBrindeDto });
  }

  findAll() {
    return this.prismaTenant.prisma.brinde.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.brinde.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBrindeDto: UpdateBrindeDto) {
    return this.prismaTenant.prisma.brinde.update({
      where: { id },
      data: updateBrindeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.brinde.delete({ where: { id } });
  }
}
