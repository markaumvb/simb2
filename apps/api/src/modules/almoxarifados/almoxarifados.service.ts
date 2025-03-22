import { Injectable } from '@nestjs/common';
import { CreateAlmoxarifadoDto } from './dto/create-almoxarifado.dto';
import { UpdateAlmoxarifadoDto } from './dto/update-almoxarifado.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class AlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createAlmoxarifadoDto: CreateAlmoxarifadoDto) {
    return this.prismaTenant.prisma.client.almoxarifado.create({
      data: createAlmoxarifadoDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.almoxarifado.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  update(id: number, updateAlmoxarifadoDto: UpdateAlmoxarifadoDto) {
    return this.prismaTenant.prisma.client.almoxarifado.update({
      where: { id },
      data: updateAlmoxarifadoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.almoxarifado.delete({
      where: { id },
    });
  }
}
