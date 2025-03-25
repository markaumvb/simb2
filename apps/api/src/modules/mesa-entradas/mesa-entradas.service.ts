import { Injectable } from '@nestjs/common';
import { CreateMesaEntradaDto } from './dto/create-mesa-entrada.dto';
import { UpdateMesaEntradaDto } from './dto/update-mesa-entrada.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MesaEntradasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(dto: CreateMesaEntradaDto) {
    return this.prismaTenant.prisma.client.$transaction(async (tx) => {
      // Criar registro de entrada
      const entrada = await tx.mesa_entrada.create({
        data: this.prismaTenant.addTenantToData(dto),
      });

      // Atualizar status da mesa para OCUPADA
      await tx.mesa.update({
        where: { id: dto.id_mesa },
        data: {
          status: 'OCUPADA',
          id_ponto: dto.id_ponto,
        },
      });

      // Ativar ponto se necessário
      await tx.ponto.update({
        where: { id: dto.id_ponto },
        data: { status: true },
      });

      return entrada;
    });
  }
  async findAll() {
    return this.prismaTenant.prisma.client.mesa_entrada.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.mesa_entrada.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  async update(id: number, updateMesaEntradaDto: UpdateMesaEntradaDto) {
    return this.prismaTenant.prisma.client.mesa_entrada.update({
      where: { id },
      data: updateMesaEntradaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.mesa_entrada.delete({
      where: { id },
    });
  }
}
