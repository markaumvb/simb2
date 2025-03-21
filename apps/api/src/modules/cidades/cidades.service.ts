import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class CidadesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createCidadeDto: CreateCidadeDto) {
    return this.prismaTenant.prisma.cidade.create({
      data: this.prismaTenant.addTenantToData(createCidadeDto),
    });
  }

  async findAll() {
    const total = await this.prismaTenant.prisma.cidade.count({
      where: this.prismaTenant.addTenantToFilter(),
    });

    const dados = await this.prismaTenant.prisma.cidade.findMany({
      where: this.prismaTenant.addTenantToFilter(),
    });

    return { dados, total };
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.cidade.findUnique({
      where: this.prismaTenant.addTenantToFilter({ id }),
      include: {
        cliente: true,
      },
    });
  }

  update(id: number, updateCidadeDto: UpdateCidadeDto) {
    return this.prismaTenant.prisma.cidade.update({
      where: this.prismaTenant.addTenantToFilter({ id }),
      data: updateCidadeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.cidade.delete({
      where: this.prismaTenant.addTenantToFilter({ id }),
    });
  }
}
