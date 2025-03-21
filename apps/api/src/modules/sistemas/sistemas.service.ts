import { Injectable } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class SistemasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createSistemaDto: CreateSistemaDto) {
    return this.prismaTenant.prisma.sistema.create({ data: createSistemaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.sistema.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.sistema.findUnique({ where: { id } });
  }

  update(id: number, updateSistemaDto: UpdateSistemaDto) {
    return this.prismaTenant.prisma.sistema.update({
      where: { id },
      data: updateSistemaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.sistema.delete({ where: { id } });
  }
}
