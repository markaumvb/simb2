import { Injectable } from '@nestjs/common';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class AcertoFechamentosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createAcertoFechamentoDto: CreateAcertoFechamentoDto) {
    return this.prismaTenant.prisma.acerto_fechamento.create({
      data: createAcertoFechamentoDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.acerto_fechamento.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.acerto_fechamento.findUnique({
      where: { id },
      include: {
        itens_acerto: true,
      },
    });
  }

  update(id: number, updateAcertoFechamentoDto: UpdateAcertoFechamentoDto) {
    return this.prismaTenant.prisma.acerto_fechamento.update({
      where: { id },
      data: updateAcertoFechamentoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.acerto_fechamento.delete({ where: { id } });
  }
}
