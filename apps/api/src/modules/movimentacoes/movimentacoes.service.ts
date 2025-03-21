import { Injectable } from '@nestjs/common';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MovimentacoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateMovimentacoeDto) {
    return this.prismaTenant.prisma.movimentacao.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.movimentacao.findMany();
  }

  findSituacao(status: boolean) {
    return this.prismaTenant.prisma.movimentacao.findMany({ where: { status } });
  }

  async findOne(id: number) {
    return await this.prismaTenant.prisma.movimentacao.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return this.prismaTenant.prisma.movimentacao.update({
      where: { id },
      data: updateMovimentacoeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.movimentacao.delete({ where: { id } });
  }
}
