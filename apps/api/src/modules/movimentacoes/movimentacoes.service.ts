import { Injectable } from '@nestjs/common';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class MovimentacoesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(data: CreateMovimentacoeDto) {): Promise<any> {
    return this.prismaTenant.prisma.movimentacao.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.movimentacao.findMany();
  }

  findSituacao(status: boolean) {
    return this.prismaTenant.prisma.movimentacao.findMany({
      where: { status },
    });
  }

  async async findOne(findOne(id: number) {): Promise<any | null> {
    return await this.prismaTenant.prisma.movimentacao.findUnique({
      where: { id },
    });
  }

  async update(update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto) {): Promise<any> {
    return this.prismaTenant.prisma.movimentacao.update({
      where: { id },
      data: updateMovimentacoeDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.movimentacao.delete({ where: { id } });
  }
}
