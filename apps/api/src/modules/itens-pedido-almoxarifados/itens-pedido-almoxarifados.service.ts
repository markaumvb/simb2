import { Injectable } from '@nestjs/common';
import { CreateItensPedidoAlmoxarifadoDto } from './dto/create-itens-pedido-almoxarifado.dto';
import { UpdateItensPedidoAlmoxarifadoDto } from './dto/update-itens-pedido-almoxarifado.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ItensPedidoAlmoxarifadosService {
  constructor(private prisma: PrismaService) {}

  create(createItensPedidoAlmoxarifadoDto: CreateItensPedidoAlmoxarifadoDto) {
    return this.prisma.itens_pedido_almoxarifado.create({
      data: createItensPedidoAlmoxarifadoDto,
    });
  }

  findAll() {
    return this.prisma.itens_pedido_almoxarifado.findMany();
  }

  findOne(id: number) {
    return this.prisma.itens_pedido_almoxarifado.findUnique({ where: { id } });
  }

  update(
    id: number,
    updateItensPedidoAlmoxarifadoDto: UpdateItensPedidoAlmoxarifadoDto,
  ) {
    return this.prisma.itens_pedido_almoxarifado.update({
      where: { id },
      data: updateItensPedidoAlmoxarifadoDto,
    });
  }

  remove(id: number) {
    return this.prisma.itens_pedido_almoxarifado.delete({ where: { id } });
  }
}
