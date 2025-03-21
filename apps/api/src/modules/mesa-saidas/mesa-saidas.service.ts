import { Injectable } from '@nestjs/common';
import { CreateMesaSaidaDto } from './dto/create-mesa-saida.dto';
import { UpdateMesaSaidaDto } from './dto/update-mesa-saida.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class MesaSaidasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createMesaSaidaDto: CreateMesaSaidaDto) {): Promise<any> {
    return this.prismaTenant.prisma.mesa_saida.create({
      data: createMesaSaidaDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.mesa_saida.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.mesa_saida.findUnique({ where: { id } });
  }

  async update(update(id: number, updateMesaSaidaDto: UpdateMesaSaidaDto) {): Promise<any> {
    return this.prismaTenant.prisma.mesa_saida.update({
      where: { id },
      data: updateMesaSaidaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.mesa_saida.delete({ where: { id } });
  }
}
