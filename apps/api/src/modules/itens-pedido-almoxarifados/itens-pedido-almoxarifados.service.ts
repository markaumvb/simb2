import { Injectable } from '@nestjs/common';
import { CreateItensPedidoAlmoxarifadoDto } from './dto/create-itens-pedido-almoxarifado.dto';
import { UpdateItensPedidoAlmoxarifadoDto } from './dto/update-itens-pedido-almoxarifado.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class ItensPedidoAlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(
    createItensPedidoAlmoxarifadoDto: CreateItensPedidoAlmoxarifadoDto,
  ) {
    return this.prismaTenant.prisma.client.itens_pedido_almoxarifado.create({
      data: this.prismaTenant.addTenantToData(createItensPedidoAlmoxarifadoDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.itens_pedido_almoxarifado.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.itens_pedido_almoxarifado.findUnique(
      { where: { id } },
    );
  }

  async update(
    id: number,
    updateItensPedidoAlmoxarifadoDto: UpdateItensPedidoAlmoxarifadoDto,
  ) {
    return this.prismaTenant.prisma.client.itens_pedido_almoxarifado.update({
      where: { id },
      data: updateItensPedidoAlmoxarifadoDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.itens_pedido_almoxarifado.delete({
      where: { id },
    });
  }
}
