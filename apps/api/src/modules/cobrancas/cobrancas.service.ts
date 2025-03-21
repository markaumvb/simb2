import { Injectable } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CobrancasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCobrancaDto) {
    return this.prisma.cobranca.create({ data });
  }

  findAll() {
    return this.prisma.cobranca.findMany();
  }

  findOne(id: number) {
    return this.prisma.cobranca.findUnique({ where: { id: id } });
  }

  findCobrancaMesa(mesa: number) {
    return this.prisma.cobranca.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateCobrancaDto: UpdateCobrancaDto) {
    return this.prisma.cobranca.update({
      where: { id },
      data: updateCobrancaDto,
    });
  }

  remove(id: number) {
    return this.prisma.cobranca.delete({ where: { id } });
  }
}
