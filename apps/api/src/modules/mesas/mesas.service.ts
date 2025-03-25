import { Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { StatusMesa } from '@prisma/client';

@Injectable()
export class MesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(data: CreateMesaDto) {
    return this.prismaTenant.prisma.client.mesa.create({
      data: this.prismaTenant.addTenantToData(data),
    });
  }

  async findLinha(linha: number) {
    return await this.prismaTenant.prisma.client.mesa.findMany({
      where: { id_linha: linha },
      orderBy: { id: 'asc' },
    });
  }

  async findStatus(status: StatusMesa) {
    return await this.prismaTenant.prisma.client.mesa.findMany({
      where: { status }, // Agora correto: status é do tipo StatusMesa
      orderBy: { id: 'asc' },
    });
  }

  async findAll() {
    return await this.prismaTenant.prisma.client.mesa.findMany();
  }

  async findOne(id: number) {
    const mesa = await this.prismaTenant.prisma.client.mesa.findUnique({
      where: { id },
      include: {
        composicao: true,
        log_mesa: true,
        cobranca: true,
        ponto: true,
        tipo_mesa: true,
      },
    });

    if (!mesa) {
      return null;
    }

    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    return this.prismaTenant.prisma.client.mesa.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.mesa.delete({ where: { id } });
  }
}
