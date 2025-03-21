import { Injectable } from '@nestjs/common';
import { CreateItensPedidoAlmoxarifadoDto } from './dto/create-itens-pedido-almoxarifado.dto';
import { UpdateItensPedidoAlmoxarifadoDto } from './dto/update-itens-pedido-almoxarifado.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class ItensPedidoAlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createItensPedidoAlmoxarifadoDto: CreateItensPedidoAlmoxarifadoDto) {): Promise<any> {
    return this.prismaTenant.prisma.itens_pedido_almoxarifado.create({
      data: createItensPedidoAlmoxarifadoDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.itens_pedido_almoxarifado.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.itens_pedido_almoxarifado.findUnique({
      where: { id },
    });
  }

  async update(update(
    id: number,
    updateItensPedidoAlmoxarifadoDto: UpdateItensPedidoAlmoxarifadoDto,
  ) {): Promise<any> {
    return this.prismaTenant.prisma.itens_pedido_almoxarifado.update({
      where: { id },
      data: updateItensPedidoAlmoxarifadoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.itens_pedido_almoxarifado.delete({
      where: { id },
    });
  }
}
