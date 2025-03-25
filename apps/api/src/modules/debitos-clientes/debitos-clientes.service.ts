import { Injectable } from '@nestjs/common';
import { CreateDebitosClienteDto } from './dto/create-debitos-cliente.dto';
import { UpdateDebitosClienteDto } from './dto/update-debitos-cliente.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class DebitosClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createDebitosClienteDto: CreateDebitosClienteDto) {
    return this.prismaTenant.prisma.client.debitos_cliente.create({
      data: this.prismaTenant.addTenantToData(createDebitosClienteDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.debitos_cliente.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.debitos_cliente.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  async update(id: number, updateDebitosClienteDto: UpdateDebitosClienteDto) {
    return this.prismaTenant.prisma.client.debitos_cliente.update({
      where: { id },
      data: updateDebitosClienteDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.debitos_cliente.delete({
      where: { id },
    });
  }
}
