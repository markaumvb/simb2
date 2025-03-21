import { Injectable } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DespesasService {
  constructor(private prisma: PrismaService) {}

  create(createDespesaDto: CreateDespesaDto) {
    return this.prisma.despesa.create({ data: createDespesaDto });
  }

  findAll() {
    return this.prisma.despesa.findMany();
  }

  findbyMovimentacao(id_movimentacao: number) {
    return this.prisma.despesa.findMany({
      where: { id_movimentacao },
    });
  }

  findOne(id: number) {
    return this.prisma.despesa.findUnique({
      where: { id },
      include: {
        movimentacao: true,
        tipo_despesa: true,
      },
    });
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    return this.prisma.despesa.update({
      where: { id },
      data: updateDespesaDto,
    });
  }

  remove(id: number) {
    return this.prisma.despesa.delete({ where: { id } });
  }
}
