import { Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PontosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createPontoDto: CreatePontoDto) {): Promise<any> {
    return this.prismaTenant.prisma.ponto.create({ data: createPontoDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.ponto.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.ponto.findUnique({
      where: { id },
      include: {
        historico_ponto: true,
      },
    });
  }

  async update(update(id: number, updatePontoDto: UpdatePontoDto) {): Promise<any> {
    return this.prismaTenant.prisma.ponto.update({
      where: { id },
      data: updatePontoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.ponto.delete({ where: { id } });
  }
}
