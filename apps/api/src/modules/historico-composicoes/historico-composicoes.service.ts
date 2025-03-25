import { Injectable } from '@nestjs/common';
import { CreateHistoricoComposicoeDto } from './dto/create-historico-composicoe.dto';
import { UpdateHistoricoComposicoeDto } from './dto/update-historico-composicoe.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class HistoricoComposicoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createHistoricoComposicoeDto: CreateHistoricoComposicoeDto) {
    return this.prismaTenant.prisma.client.historico_composicao.create({
      data: this.prismaTenant.addTenantToData(createHistoricoComposicoeDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.historico_composicao.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.historico_composicao.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateHistoricoComposicoeDto: UpdateHistoricoComposicoeDto,
  ) {
    return this.prismaTenant.prisma.client.historico_composicao.update({
      where: { id },
      data: updateHistoricoComposicoeDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.historico_composicao.delete({
      where: { id },
    });
  }
}
