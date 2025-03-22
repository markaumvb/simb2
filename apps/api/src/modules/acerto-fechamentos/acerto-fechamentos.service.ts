import { Injectable } from '@nestjs/common';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class AcertoFechamentosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createAcertoFechamentoDto: CreateAcertoFechamentoDto) {
    const { id_linha, id_movimentacao, id_funcionario, ...rest } =
      createAcertoFechamentoDto;

    return this.prismaTenant.prisma.client.acerto_fechamento.create({
      data: {
        ...rest,
        id_linha,
        id_movimentacao,
        id_funcionario,
        tenant_id: this.prismaTenant.currentTenantId,
      },
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.acerto_fechamento.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.acerto_fechamento.findUnique({
      where: { id },
      include: {
        itens_acerto: true,
      },
    });
  }

  update(id: number, updateAcertoFechamentoDto: UpdateAcertoFechamentoDto) {
    return this.prismaTenant.prisma.client.acerto_fechamento.update({
      where: { id },
      data: updateAcertoFechamentoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.acerto_fechamento.delete({
      where: { id },
    });
  }
}
