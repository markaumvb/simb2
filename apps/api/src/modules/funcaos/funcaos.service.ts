import { Injectable } from '@nestjs/common';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FuncaosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateFuncaoDto) {
    return this.prisma.funcao.create({ data });
  }

  findAll() {
    return this.prisma.funcao.findMany();
  }

  findOne(id: number) {
    return this.prisma.funcao.findUnique({
      where: { id },
      include: {
        membros_linha: true,
      },
    });
  }

  update(id: number, updateFuncaoDto: UpdateFuncaoDto) {
    return this.prisma.funcao.update({
      where: { id },
      data: updateFuncaoDto,
    });
  }

  remove(id: number) {
    return this.prisma.funcao.delete({ where: { id } });
  }
}
