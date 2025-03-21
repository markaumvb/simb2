import { Injectable } from '@nestjs/common';
import { CreateComposicoeDto } from './dto/create-composicoe.dto';
import { UpdateComposicoeDto } from './dto/update-composicoe.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class ComposicoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createComposicoeDto: CreateComposicoeDto) {
    return this.prismaTenant.prisma.composicao.create({ data: createComposicoeDto });
  }

  findAll() {
    return this.prismaTenant.prisma.composicao.findMany({
      include: {
        almoxarifado: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.composicao.findUnique({
      where: { id },
      include: {
        almoxarifado: true,
        historico_composicao: true,
      },
    });
  }

  update(id: number, updateComposicoeDto: UpdateComposicoeDto) {
    return this.prismaTenant.prisma.composicao.update({
      where: { id },
      data: updateComposicoeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.composicao.delete({ where: { id } });
  }
}
