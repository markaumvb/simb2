import { Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class MesasService {
  constructor(private prismaTenant: PrismaTenantService) {}
  async create(create(data: CreateMesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.mesa.create({ data });
  }

  async findLinha(linha: number) {
    return await this.prismaTenant.prisma.mesa.findMany({
      where: { id_linha: linha },
      orderBy: { id: 'asc' },
    });
  }

  async findStatus(status: string) {
    return await this.prismaTenant.prisma.mesa.findMany({
      where: { status },
      orderBy: { id: 'asc' },
    });
  }

  async async findAll(): Promise<any[]> {
    return await this.prismaTenant.prisma.mesa.findMany();
  }

  async async findOne(findOne(id: number) {): Promise<any | null> {
    const mesa = await this.prismaTenant.prisma.mesa.findUnique({
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

  async update(update(id: number, updateMesaDto: UpdateMesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.mesa.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.mesa.delete({ where: { id } });
  }
}
