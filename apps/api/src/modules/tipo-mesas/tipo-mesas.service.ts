import { Injectable } from '@nestjs/common';
import { CreateTipoMesaDto } from './dto/create-tipo-mesa.dto';
import { UpdateTipoMesaDto } from './dto/update-tipo-mesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class TipoMesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(data: CreateTipoMesaDto) {
    return this.prismaTenant.prisma.client.tipo_mesa.create({
      data: this.prismaTenant.addTenantToData(data),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.tipo_mesa.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.tipo_mesa.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  async update(id: number, updateTipoMesaDto: UpdateTipoMesaDto) {
    return this.prismaTenant.prisma.client.tipo_mesa.update({
      where: { id },
      data: updateTipoMesaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.tipo_mesa.delete({ where: { id } });
  }
}
