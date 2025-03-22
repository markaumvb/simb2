import { Injectable } from '@nestjs/common';
import { CreatePontoClienteDto } from './dto/create-ponto-cliente.dto';
import { UpdatePontoClienteDto } from './dto/update-ponto-cliente.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class PontoClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createPontoClienteDto: CreatePontoClienteDto) {
    return this.prismaTenant.prisma.client.ponto_cliente.create({
      data: this.prismaTenant.addTenantToData(createPontoClienteDto),
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.ponto_cliente.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.ponto_cliente.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePontoClienteDto: UpdatePontoClienteDto) {
    return this.prismaTenant.prisma.client.ponto_cliente.update({
      where: { id },
      data: updatePontoClienteDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.ponto_cliente.delete({
      where: { id },
    });
  }
}
