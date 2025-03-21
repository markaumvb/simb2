import { Injectable } from '@nestjs/common';
import { CreateHistoricoComposicoeDto } from './dto/create-historico-composicoe.dto';
import { UpdateHistoricoComposicoeDto } from './dto/update-historico-composicoe.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class HistoricoComposicoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createHistoricoComposicoeDto: CreateHistoricoComposicoeDto) {
    return this.prismaTenant.prisma.historico_composicao.create({
      data: createHistoricoComposicoeDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.historico_composicao.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.historico_composicao.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateHistoricoComposicoeDto: UpdateHistoricoComposicoeDto,
  ) {
    return this.prismaTenant.prisma.historico_composicao.update({
      where: { id },
      data: updateHistoricoComposicoeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.historico_composicao.delete({ where: { id } });
  }
}
