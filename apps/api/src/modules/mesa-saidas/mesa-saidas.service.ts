import { Injectable } from '@nestjs/common';
import { CreateMesaSaidaDto } from './dto/create-mesa-saida.dto';
import { UpdateMesaSaidaDto } from './dto/update-mesa-saida.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MesaSaidasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createMesaSaidaDto: CreateMesaSaidaDto) {
    return this.prismaTenant.prisma.client.mesa_saida.create({
      data: this.prismaTenant.addTenantToData(createMesaSaidaDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.mesa_saida.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.mesa_saida.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMesaSaidaDto: UpdateMesaSaidaDto) {
    return this.prismaTenant.prisma.client.mesa_saida.update({
      where: { id },
      data: updateMesaSaidaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.mesa_saida.delete({ where: { id } });
  }
}
