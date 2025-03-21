import { Injectable } from '@nestjs/common';
import { CreateTipoMesaDto } from './dto/create-tipo-mesa.dto';
import { UpdateTipoMesaDto } from './dto/update-tipo-mesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class TipoMesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(data: CreateTipoMesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.tipo_mesa.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.tipo_mesa.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.tipo_mesa.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  async update(update(id: number, updateTipoMesaDto: UpdateTipoMesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.tipo_mesa.update({
      where: { id },
      data: updateTipoMesaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.tipo_mesa.delete({ where: { id } });
  }
}
