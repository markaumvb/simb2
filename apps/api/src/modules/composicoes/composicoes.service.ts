import { Injectable } from '@nestjs/common';
import { CreateComposicoeDto } from './dto/create-composicoe.dto';
import { UpdateComposicoeDto } from './dto/update-composicoe.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ComposicoesService {
  constructor(private prisma: PrismaService) {}

  create(createComposicoeDto: CreateComposicoeDto) {
    return this.prisma.composicao.create({ data: createComposicoeDto });
  }

  findAll() {
    return this.prisma.composicao.findMany({
      include: {
        almoxarifado: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.composicao.findUnique({
      where: { id },
      include: {
        almoxarifado: true,
        historico_composicao: true,
      },
    });
  }

  update(id: number, updateComposicoeDto: UpdateComposicoeDto) {
    return this.prisma.composicao.update({
      where: { id },
      data: updateComposicoeDto,
    });
  }

  remove(id: number) {
    return this.prisma.composicao.delete({ where: { id } });
  }
}
