import { Injectable } from '@nestjs/common';
import { CreateAlmoxarifadoDto } from './dto/create-almoxarifado.dto';
import { UpdateAlmoxarifadoDto } from './dto/update-almoxarifado.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AlmoxarifadosService {
  constructor(private prisma: PrismaService) {}

  create(createAlmoxarifadoDto: CreateAlmoxarifadoDto) {
    return this.prisma.almoxarifado.create({ data: createAlmoxarifadoDto });
  }

  findAll() {
    return this.prisma.almoxarifado.findMany();
  }

  findOne(id: number) {
    return this.prisma.almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  update(id: number, updateAlmoxarifadoDto: UpdateAlmoxarifadoDto) {
    return this.prisma.almoxarifado.update({
      where: { id },
      data: updateAlmoxarifadoDto,
    });
  }

  remove(id: number) {
    return this.prisma.almoxarifado.delete({ where: { id } });
  }
}
