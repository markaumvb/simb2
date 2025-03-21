import { Injectable } from '@nestjs/common';
import { CreatePedidoAlmoxarifadoDto } from './dto/create-pedido-almoxarifado.dto';
import { UpdatePedidoAlmoxarifadoDto } from './dto/update-pedido-almoxarifado.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PedidoAlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createPedidoAlmoxarifadoDto: CreatePedidoAlmoxarifadoDto) {): Promise<any> {
    return this.prismaTenant.prisma.pedido_almoxarifado.create({
      data: createPedidoAlmoxarifadoDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.pedido_almoxarifado.findMany();
  }

  findSituacao(status: string) {
    return this.prismaTenant.prisma.pedido_almoxarifado.findMany({
      where: { status },
    });
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.pedido_almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  async update(update(id: number, updatePedidoAlmoxarifadoDto: UpdatePedidoAlmoxarifadoDto) {): Promise<any> {
    return this.prismaTenant.prisma.pedido_almoxarifado.update({
      where: { id },
      data: updatePedidoAlmoxarifadoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.pedido_almoxarifado.delete({
      where: { id },
    });
  }
}
