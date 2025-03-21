import { Injectable } from '@nestjs/common';
import { CreateHistoricoComposicoeDto } from './dto/create-historico-composicoe.dto';
import { UpdateHistoricoComposicoeDto } from './dto/update-historico-composicoe.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HistoricoComposicoesService {
  constructor(private prisma: PrismaService) {}

  create(createHistoricoComposicoeDto: CreateHistoricoComposicoeDto) {
    return this.prisma.historico_composicao.create({
      data: createHistoricoComposicoeDto,
    });
  }

  findAll() {
    return this.prisma.historico_composicao.findMany();
  }

  findOne(id: number) {
    return this.prisma.historico_composicao.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateHistoricoComposicoeDto: UpdateHistoricoComposicoeDto,
  ) {
    return this.prisma.historico_composicao.update({
      where: { id },
      data: updateHistoricoComposicoeDto,
    });
  }

  remove(id: number) {
    return this.prisma.historico_composicao.delete({ where: { id } });
  }
}
