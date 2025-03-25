import { Injectable } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class CobrancasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(dto: CreateCobrancaDto) {
    return this.prismaTenant.prisma.client.$transaction(async (tx) => {
      // 1. Criar a cobrança
      const cobranca = await tx.cobranca.create({
        data: this.prismaTenant.addTenantToData(dto),
      });

      // 2. Atualizar a mesa
      await tx.mesa.update({
        where: { id: dto.id_mesa },
        data: {
          cont_atual: dto.contador_atual,
          cont_anterior: dto.contador_anterior,
          contador_brinde_atual: dto.contador_brinde_atual,
          contador_brinde_anterior: dto.contador_brinde_anterior,
        },
      });

      return cobranca;
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.cobranca.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.cobranca.findUnique({
      where: { id: id },
    });
  }

  findCobrancaMesa(mesa: number) {
    return this.prismaTenant.prisma.client.cobranca.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateCobrancaDto: UpdateCobrancaDto) {
    return this.prismaTenant.prisma.client.cobranca.update({
      where: { id },
      data: updateCobrancaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.cobranca.delete({ where: { id } });
  }
}
