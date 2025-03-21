import { Injectable } from '@nestjs/common';
import { CreateHistoricoPontoDto } from './dto/create-historico-ponto.dto';
import { UpdateHistoricoPontoDto } from './dto/update-historico-ponto.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class HistoricoPontosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createHistoricoPontoDto: CreateHistoricoPontoDto) {
    return this.prismaTenant.prisma.historico_ponto.create({
      data: createHistoricoPontoDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.historico_ponto.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.historico_ponto.findUnique({
      where: { id },
      include: {
        ponto: true,
      },
    });
  }

  update(id: number, updateHistoricoPontoDto: UpdateHistoricoPontoDto) {
    return this.prismaTenant.prisma.historico_ponto.update({
      where: { id },
      data: updateHistoricoPontoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.historico_ponto.delete({ where: { id } });
  }
}
