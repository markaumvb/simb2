import { Injectable } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SistemasService {
  constructor(private prisma: PrismaService) {}

  create(createSistemaDto: CreateSistemaDto) {
    return this.prisma.sistema.create({ data: createSistemaDto });
  }

  findAll() {
    return this.prisma.sistema.findMany();
  }

  findOne(id: number) {
    return this.prisma.sistema.findUnique({ where: { id } });
  }

  update(id: number, updateSistemaDto: UpdateSistemaDto) {
    return this.prisma.sistema.update({
      where: { id },
      data: updateSistemaDto,
    });
  }

  remove(id: number) {
    return this.prisma.sistema.delete({ where: { id } });
  }
}
