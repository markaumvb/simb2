import { Injectable } from '@nestjs/common';
import { CreateDebitosClienteDto } from './dto/create-debitos-cliente.dto';
import { UpdateDebitosClienteDto } from './dto/update-debitos-cliente.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class DebitosClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createDebitosClienteDto: CreateDebitosClienteDto) {
    return this.prismaTenant.prisma.client.debitos_cliente.create({
      data: createDebitosClienteDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.debitos_cliente.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.debitos_cliente.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  update(id: number, updateDebitosClienteDto: UpdateDebitosClienteDto) {
    return this.prismaTenant.prisma.client.debitos_cliente.update({
      where: { id },
      data: updateDebitosClienteDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.debitos_cliente.delete({
      where: { id },
    });
  }
}
