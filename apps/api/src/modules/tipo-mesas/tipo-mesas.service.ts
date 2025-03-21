import { Injectable } from '@nestjs/common';
import { CreateTipoMesaDto } from './dto/create-tipo-mesa.dto';
import { UpdateTipoMesaDto } from './dto/update-tipo-mesa.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TipoMesasService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTipoMesaDto) {
    return this.prisma.tipo_mesa.create({ data });
  }

  findAll() {
    return this.prisma.tipo_mesa.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipo_mesa.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateTipoMesaDto: UpdateTipoMesaDto) {
    return this.prisma.tipo_mesa.update({
      where: { id },
      data: updateTipoMesaDto,
    });
  }

  remove(id: number) {
    return this.prisma.tipo_mesa.delete({ where: { id } });
  }
}
