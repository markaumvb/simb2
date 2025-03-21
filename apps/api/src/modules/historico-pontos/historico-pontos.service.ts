import { Injectable } from '@nestjs/common';
import { CreateHistoricoPontoDto } from './dto/create-historico-ponto.dto';
import { UpdateHistoricoPontoDto } from './dto/update-historico-ponto.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class HistoricoPontosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createHistoricoPontoDto: CreateHistoricoPontoDto) {): Promise<any> {
    return this.prismaTenant.prisma.historico_ponto.create({
      data: createHistoricoPontoDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.historico_ponto.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.historico_ponto.findUnique({
      where: { id },
      include: {
        ponto: true,
      },
    });
  }

  async update(update(id: number, updateHistoricoPontoDto: UpdateHistoricoPontoDto) {): Promise<any> {
    return this.prismaTenant.prisma.historico_ponto.update({
      where: { id },
      data: updateHistoricoPontoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.historico_ponto.delete({ where: { id } });
  }
}
