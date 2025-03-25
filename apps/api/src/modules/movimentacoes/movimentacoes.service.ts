import { Injectable } from '@nestjs/common';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MovimentacoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(data: CreateMovimentacoeDto) {
    return this.prismaTenant.prisma.client.movimentacao.create({
      data: this.prismaTenant.addTenantToData(data),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.movimentacao.findMany();
  }

  findSituacao(status: boolean) {
    return this.prismaTenant.prisma.client.movimentacao.findMany({
      where: { status },
    });
  }

  async findOne(id: number) {
    return await this.prismaTenant.prisma.client.movimentacao.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return this.prismaTenant.prisma.client.movimentacao.update({
      where: { id },
      data: updateMovimentacoeDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.movimentacao.delete({
      where: { id },
    });
  }
}
