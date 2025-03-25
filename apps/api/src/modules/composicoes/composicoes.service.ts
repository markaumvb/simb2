import { Injectable } from '@nestjs/common';
import { CreateComposicoeDto } from './dto/create-composicoe.dto';
import { UpdateComposicoeDto } from './dto/update-composicoe.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class ComposicoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createComposicoeDto: CreateComposicoeDto) {
    return this.prismaTenant.prisma.client.composicao.create({
      data: this.prismaTenant.addTenantToData(createComposicoeDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.composicao.findMany({
      include: {
        almoxarifado: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.composicao.findUnique({
      where: { id },
      include: {
        almoxarifado: true,
        historico_composicao: true,
      },
    });
  }

  async update(id: number, updateComposicoeDto: UpdateComposicoeDto) {
    return this.prismaTenant.prisma.client.composicao.update({
      where: { id },
      data: updateComposicoeDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.composicao.delete({ where: { id } });
  }
}
