import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CidadesService {
  constructor(private prisma: PrismaService) {}

  create(createCidadeDto: CreateCidadeDto) {
    return this.prisma.cidade.create({ data: createCidadeDto });
  }

  async findAll() {
    const total = await this.prisma.cidade.count;
    const dados = await this.prisma.cidade.findMany();
    return { dados, total };
  }

  findOne(id: number) {
    return this.prisma.cidade.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  update(id: number, updateCidadeDto: UpdateCidadeDto) {
    return this.prisma.cidade.update({
      where: { id },
      data: updateCidadeDto,
    });
  }

  remove(id: number) {
    return this.prisma.cidade.delete({ where: { id } });
  }
}
