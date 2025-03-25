import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class AcertoFechamentosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(dto: CreateAcertoFechamentoDto) {
    // Verificar se há itens de acerto
    if (dto.itens && dto.itens.length > 0) {
      // Calcular saldo de itens (positivos e negativos)
      let saldoPositivo = 0;
      let saldoNegativo = 0;

      dto.itens.forEach((item) => {
        if (item.debito_credito === 'crédito') {
          saldoPositivo += Number(item.valor);
        } else {
          saldoNegativo += Number(item.valor);
        }
      });

      // Verificar se está balanceado (pode ter uma tolerância)
      const diferenca = Math.abs(saldoPositivo - saldoNegativo);
      if (diferenca > 0.01) {
        // tolerância de 1 centavo
        throw new BadRequestException(
          `Acerto não está balanceado. Créditos: ${saldoPositivo}, Débitos: ${saldoNegativo}, Diferença: ${diferenca}`,
        );
      }
    }

    return this.prismaTenant.prisma.client.$transaction(async (tx) => {
      // Criar o acerto
      const acerto = await tx.acerto_fechamento.create({
        data: this.prismaTenant.addTenantToData(dto),
      });

      // Criar itens de acerto, se existirem
      if (dto.itens && dto.itens.length > 0) {
        for (const item of dto.itens) {
          await tx.itens_acerto.create({
            data: {
              ...this.prismaTenant.addTenantToData(item),
              id_acerto_fechamento: acerto.id,
            },
          });
        }
      }

      return acerto;
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.acerto_fechamento.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.acerto_fechamento.findUnique({
      where: { id },
      include: {
        itens_acerto: true,
      },
    });
  }

  async update(id: number, updateAcertoFechamentoDto: UpdateAcertoFechamentoDto) {
    return this.prismaTenant.prisma.client.acerto_fechamento.update({
      where: { id },
      data: updateAcertoFechamentoDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.acerto_fechamento.delete({
      where: { id },
    });
  }
}
