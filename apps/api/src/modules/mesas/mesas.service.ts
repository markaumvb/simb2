import { Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MesasService {
  constructor(private prismaTenant: PrismaTenantService) {}
  create(data: CreateMesaDto) {
    return this.prismaTenant.prisma.client.mesa.create({ data });
  }

  async findLinha(linha: number) {
    return await this.prismaTenant.prisma.client.mesa.findMany({
      where: { id_linha: linha },
      orderBy: { id: 'asc' },
    });
  }

  async findStatus(status: string) {
    return await this.prismaTenant.prisma.client.mesa.findMany({
      where: { status },
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

  update(id: number, updateMesaDto: UpdateMesaDto) {
    return this.prismaTenant.prisma.client.mesa.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.mesa.delete({ where: { id } });
  }
}
