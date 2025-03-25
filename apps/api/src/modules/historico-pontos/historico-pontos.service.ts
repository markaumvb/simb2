import { Injectable } from '@nestjs/common';
import { CreateHistoricoPontoDto } from './dto/create-historico-ponto.dto';
import { UpdateHistoricoPontoDto } from './dto/update-historico-ponto.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class HistoricoPontosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createHistoricoPontoDto: CreateHistoricoPontoDto) {
    return this.prismaTenant.prisma.client.historico_ponto.create({
      data: this.prismaTenant.addTenantToData(createHistoricoPontoDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.historico_ponto.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.historico_ponto.findUnique({
      where: { id },
      include: {
        ponto: true,
      },
    });
  }

  async update(id: number, updateHistoricoPontoDto: UpdateHistoricoPontoDto) {
    return this.prismaTenant.prisma.client.historico_ponto.update({
      where: { id },
      data: updateHistoricoPontoDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.historico_ponto.delete({
      where: { id },
    });
  }
}
