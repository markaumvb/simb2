import { Injectable } from '@nestjs/common';
import { CreatePedidoAlmoxarifadoDto } from './dto/create-pedido-almoxarifado.dto';
import { UpdatePedidoAlmoxarifadoDto } from './dto/update-pedido-almoxarifado.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class PedidoAlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createPedidoAlmoxarifadoDto: CreatePedidoAlmoxarifadoDto) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.create({
      data: this.prismaTenant.addTenantToData(createPedidoAlmoxarifadoDto),
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.findMany();
  }

  findSituacao(status: string) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.findMany({
      where: { status },
    });
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  update(id: number, updatePedidoAlmoxarifadoDto: UpdatePedidoAlmoxarifadoDto) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.update({
      where: { id },
      data: updatePedidoAlmoxarifadoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.delete({
      where: { id },
    });
  }
}
