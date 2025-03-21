import { Injectable } from '@nestjs/common';
import { CreateItensAcertoDto } from './dto/create-itens-acerto.dto';
import { UpdateItensAcertoDto } from './dto/update-itens-acerto.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ItensAcertosService {
  constructor(private prisma: PrismaService) {}

  create(createItensAcertoDto: CreateItensAcertoDto) {
    return this.prisma.itens_acerto.create({ data: createItensAcertoDto });
  }

  findAll() {
    return this.prisma.itens_acerto.findMany();
  }

  findOne(id: number) {
    return this.prisma.itens_acerto.findUnique({ where: { id: id } });
  }

  update(id: number, updateItensAcertoDto: UpdateItensAcertoDto) {
    return this.prisma.itens_acerto.update({
      where: { id: id },
      data: updateItensAcertoDto,
    });
  }

  remove(id: number) {
    return this.prisma.itens_acerto.delete({ where: { id: id } });
  }
}
