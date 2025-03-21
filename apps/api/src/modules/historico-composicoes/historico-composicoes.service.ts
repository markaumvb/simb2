import { Injectable } from '@nestjs/common';
import { CreateHistoricoComposicoeDto } from './dto/create-historico-composicoe.dto';
import { UpdateHistoricoComposicoeDto } from './dto/update-historico-composicoe.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class HistoricoComposicoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createHistoricoComposicoeDto: CreateHistoricoComposicoeDto) {): Promise<any> {
    return this.prismaTenant.prisma.historico_composicao.create({
      data: createHistoricoComposicoeDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.historico_composicao.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.historico_composicao.findUnique({
      where: { id },
    });
  }

  async update(update(
    id: number,
    updateHistoricoComposicoeDto: UpdateHistoricoComposicoeDto,
  ) {): Promise<any> {
    return this.prismaTenant.prisma.historico_composicao.update({
      where: { id },
      data: updateHistoricoComposicoeDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.historico_composicao.delete({
      where: { id },
    });
  }
}
