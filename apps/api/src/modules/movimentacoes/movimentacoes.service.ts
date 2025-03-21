import { Injectable } from '@nestjs/common';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MovimentacoesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateMovimentacoeDto) {
    return this.prisma.movimentacao.create({ data });
  }

  findAll() {
    return this.prisma.movimentacao.findMany();
  }

  findSituacao(status: boolean) {
    return this.prisma.movimentacao.findMany({ where: { status } });
  }

  async findOne(id: number) {
    return await this.prisma.movimentacao.findUnique({
      where: { id },
    });
  }

  update(id: number, updateMovimentacoeDto: UpdateMovimentacoeDto) {
    return this.prisma.movimentacao.update({
      where: { id },
      data: updateMovimentacoeDto,
    });
  }

  remove(id: number) {
    return this.prisma.movimentacao.delete({ where: { id } });
  }
}
