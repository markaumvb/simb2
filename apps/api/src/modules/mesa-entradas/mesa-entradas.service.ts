import { Injectable } from '@nestjs/common';
import { CreateMesaEntradaDto } from './dto/create-mesa-entrada.dto';
import { UpdateMesaEntradaDto } from './dto/update-mesa-entrada.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class MesaEntradasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createMesaEntradaDto: CreateMesaEntradaDto) {): Promise<any> {
    return this.prismaTenant.prisma.mesa_entrada.create({
      data: createMesaEntradaDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.mesa_entrada.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.mesa_entrada.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  async update(update(id: number, updateMesaEntradaDto: UpdateMesaEntradaDto) {): Promise<any> {
    return this.prismaTenant.prisma.mesa_entrada.update({
      where: { id },
      data: updateMesaEntradaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.mesa_entrada.delete({ where: { id } });
  }
}
