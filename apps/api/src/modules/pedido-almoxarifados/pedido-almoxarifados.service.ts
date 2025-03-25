import { BadRequestException, BadRequestException, Injectable } from '@nestjs/common';
import { CreatePedidoAlmoxarifadoDto } from './dto/create-pedido-almoxarifado.dto';
import { UpdatePedidoAlmoxarifadoDto } from './dto/update-pedido-almoxarifado.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class PedidoAlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(dto: CreatePedidoAlmoxarifadoDto) {
    // Validação de regras de negócio
    if (dto.status === 'APROVADO') {
      // Verificar se possui itens válidos
      const itens = await this.itensService.findByPedidoId(dto.id);
      if (!itens.length) {
        throw new BadRequestException('Pedido não pode ser aprovado sem itens');
      }
    }
    
    return this.prismaTenant.prisma.client.pedido_almoxarifado.create({
      data: this.prismaTenant.addTenantToData(dto),
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
