import { Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class PontosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createPontoDto: CreatePontoDto) {
    return this.prismaTenant.prisma.client.ponto.create({
      data: this.prismaTenant.addTenantToData(createPontoDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.ponto.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.ponto.findUnique({
      where: { id },
      include: {
        historico_ponto: true,
      },
    });
  }

  async update(id: number, updatePontoDto: UpdatePontoDto) {
    return this.prismaTenant.prisma.client.ponto.update({
      where: { id },
      data: updatePontoDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.ponto.delete({ where: { id } });
  }
}
