import { Injectable } from '@nestjs/common';
import { CreateComposicoeDto } from './dto/create-composicoe.dto';
import { UpdateComposicoeDto } from './dto/update-composicoe.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class ComposicoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createComposicoeDto: CreateComposicoeDto) {): Promise<any> {
    return this.prismaTenant.prisma.composicao.create({
      data: createComposicoeDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.composicao.findMany({
      include: {
        almoxarifado: true,
      },
    });
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.composicao.findUnique({
      where: { id },
      include: {
        almoxarifado: true,
        historico_composicao: true,
      },
    });
  }

  async update(update(id: number, updateComposicoeDto: UpdateComposicoeDto) {): Promise<any> {
    return this.prismaTenant.prisma.composicao.update({
      where: { id },
      data: updateComposicoeDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.composicao.delete({ where: { id } });
  }
}
