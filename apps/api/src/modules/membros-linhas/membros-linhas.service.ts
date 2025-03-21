import { Injectable } from '@nestjs/common';
import { CreateMembrosLinhaDto } from './dto/create-membros-linha.dto';
import { UpdateMembrosLinhaDto } from './dto/update-membros-linha.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MembrosLinhasService {
  constructor(private prisma: PrismaService) {}

  create(createMembrosLinhaDto: CreateMembrosLinhaDto) {
    return this.prisma.membros_linha.create({ data: createMembrosLinhaDto });
  }

  findAll() {
    return this.prisma.membros_linha.findMany();
  }

  findOne(id: number) {
    return this.prisma.membros_linha.findUnique({
      where: { id },
      include: {
        funcionario: true,
      },
    });
  }

  update(id: number, updateMembrosLinhaDto: UpdateMembrosLinhaDto) {
    return this.prisma.membros_linha.update({
      where: { id },
      data: updateMembrosLinhaDto,
    });
  }

  remove(id: number) {
    return this.prisma.membros_linha.delete({ where: { id } });
  }
}
