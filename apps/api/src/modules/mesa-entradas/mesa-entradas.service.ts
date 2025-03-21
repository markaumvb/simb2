import { Injectable } from '@nestjs/common';
import { CreateMesaEntradaDto } from './dto/create-mesa-entrada.dto';
import { UpdateMesaEntradaDto } from './dto/update-mesa-entrada.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MesaEntradasService {
  constructor(private prisma: PrismaService) {}

  create(createMesaEntradaDto: CreateMesaEntradaDto) {
    return this.prisma.mesa_entrada.create({ data: createMesaEntradaDto });
  }

  findAll() {
    return this.prisma.mesa_entrada.findMany();
  }

  findOne(id: number) {
    return this.prisma.mesa_entrada.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateMesaEntradaDto: UpdateMesaEntradaDto) {
    return this.prisma.mesa_entrada.update({
      where: { id },
      data: updateMesaEntradaDto,
    });
  }

  remove(id: number) {
    return this.prisma.mesa_entrada.delete({ where: { id } });
  }
}
