import { Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MesasService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateMesaDto) {
    return this.prisma.mesa.create({ data });
  }

  async findLinha(linha: number) {
    return await this.prisma.mesa.findMany({
      where: { id_linha: linha },
      orderBy: { id: 'asc' },
    });
  }

  async findStatus(status: string) {
    return await this.prisma.mesa.findMany({
      where: { status },
      orderBy: { id: 'asc' },
    });
  }

  async findAll() {
    return await this.prisma.mesa.findMany();
  }

  async findOne(id: number) {
    const mesa = await this.prisma.mesa.findUnique({
      where: { id },
      include: {
        composicao: true,
        log_mesa: true,
        cobranca: true,
        ponto: true,
        tipo_mesa: true,
      },
    });

    if (!mesa) {
      return null;
    }

    return mesa;
  }

  update(id: number, updateMesaDto: UpdateMesaDto) {
    return this.prisma.mesa.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  remove(id: number) {
    return this.prisma.mesa.delete({ where: { id } });
  }
}
