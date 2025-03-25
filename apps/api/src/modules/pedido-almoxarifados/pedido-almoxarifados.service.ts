import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoAlmoxarifadoDto } from './dto/create-pedido-almoxarifado.dto';
import { UpdatePedidoAlmoxarifadoDto } from './dto/update-pedido-almoxarifado.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { ItensPedidoAlmoxarifadosService } from '../itens-pedido-almoxarifados/itens-pedido-almoxarifados.service';

@Injectable()
export class PedidoAlmoxarifadosService {
  constructor(
    private prismaTenant: PrismaTenantService,
    private itensPedidoService: ItensPedidoAlmoxarifadosService,
  ) {}

  async create(dto: CreatePedidoAlmoxarifadoDto) {
    // Para um novo pedido, não há validação de itens ainda
    const result =
      await this.prismaTenant.prisma.client.pedido_almoxarifado.create({
        data: this.prismaTenant.addTenantToData(dto),
      });

    return result;
  }

  async update(id: number, dto: UpdatePedidoAlmoxarifadoDto) {
    // Ao atualizar para APROVADO, verificar se há itens
    if (dto.status === 'APROVADO') {
      const itens =
        await this.prismaTenant.prisma.client.itens_pedido_almoxarifado.findMany(
          {
            where: { id_pedido: id },
          },
        );

      if (!itens.length) {
        throw new BadRequestException('Pedido não pode ser aprovado sem itens');
      }
    }

    return this.prismaTenant.prisma.client.pedido_almoxarifado.update({
      where: { id },
      data: dto,
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.findMany();
  }

  findSituacao(status: string) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.findMany({
      where: { status },
    });
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.pedido_almoxarifado.delete({
      where: { id },
    });
  }
}
