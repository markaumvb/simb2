import { Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PontosService {
  constructor(private prisma: PrismaService) {}

  create(createPontoDto: CreatePontoDto) {
    return this.prisma.ponto.create({ data: createPontoDto });
  }

  findAll() {
    return this.prisma.ponto.findMany();
  }

  findOne(id: number) {
    return this.prisma.ponto.findUnique({
      where: { id },
      include: {
        historico_ponto: true,
      },
    });
  }

  update(id: number, updatePontoDto: UpdatePontoDto) {
    return this.prisma.ponto.update({ where: { id }, data: updatePontoDto });
  }

  remove(id: number) {
    return this.prisma.ponto.delete({ where: { id } });
  }
}
