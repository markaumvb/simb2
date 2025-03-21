import { Injectable } from '@nestjs/common';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AcertoFechamentosService {
  constructor(private prisma: PrismaService) {}

  create(createAcertoFechamentoDto: CreateAcertoFechamentoDto) {
    return this.prisma.acerto_fechamento.create({
      data: createAcertoFechamentoDto,
    });
  }

  findAll() {
    return this.prisma.acerto_fechamento.findMany();
  }

  findOne(id: number) {
    return this.prisma.acerto_fechamento.findUnique({
      where: { id },
      include: {
        itens_acerto: true,
      },
    });
  }

  update(id: number, updateAcertoFechamentoDto: UpdateAcertoFechamentoDto) {
    return this.prisma.acerto_fechamento.update({
      where: { id },
      data: updateAcertoFechamentoDto,
    });
  }

  remove(id: number) {
    return this.prisma.acerto_fechamento.delete({ where: { id } });
  }
}
