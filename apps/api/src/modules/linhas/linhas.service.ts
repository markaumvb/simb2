import { Injectable } from '@nestjs/common';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LinhasService {
  constructor(private prisma: PrismaService) {}

  create(createLinhaDto: CreateLinhaDto) {
    return this.prisma.linha.create({ data: createLinhaDto });
  }

  findAll() {
    return this.prisma.linha.findMany();
  }

  findOne(id: number) {
    return this.prisma.linha.findUnique({
      where: { id },
      include: {
        movimentacao: true,
      },
    });
  }

  update(id: number, updateLinhaDto: UpdateLinhaDto) {
    return this.prisma.linha.update({ where: { id }, data: updateLinhaDto });
  }

  remove(id: number) {
    return this.prisma.linha.delete({ where: { id } });
  }
}
