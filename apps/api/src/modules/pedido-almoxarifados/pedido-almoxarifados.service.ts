import { Injectable } from '@nestjs/common';
import { CreatePedidoAlmoxarifadoDto } from './dto/create-pedido-almoxarifado.dto';
import { UpdatePedidoAlmoxarifadoDto } from './dto/update-pedido-almoxarifado.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PedidoAlmoxarifadosService {
  constructor(private prisma: PrismaService) {}

  create(createPedidoAlmoxarifadoDto: CreatePedidoAlmoxarifadoDto) {
    return this.prisma.pedido_almoxarifado.create({
      data: createPedidoAlmoxarifadoDto,
    });
  }

  findAll() {
    return this.prisma.pedido_almoxarifado.findMany();
  }

  findSituacao(status: string) {
    return this.prisma.pedido_almoxarifado.findMany({ where: { status } });
  }

  findOne(id: number) {
    return this.prisma.pedido_almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  update(id: number, updatePedidoAlmoxarifadoDto: UpdatePedidoAlmoxarifadoDto) {
    return this.prisma.pedido_almoxarifado.update({
      where: { id },
      data: updatePedidoAlmoxarifadoDto,
    });
  }

  remove(id: number) {
    return this.prisma.pedido_almoxarifado.delete({ where: { id } });
  }
}
