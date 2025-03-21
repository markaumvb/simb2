import { Injectable } from '@nestjs/common';
import { CreateDebitosClienteDto } from './dto/create-debitos-cliente.dto';
import { UpdateDebitosClienteDto } from './dto/update-debitos-cliente.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class DebitosClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createDebitosClienteDto: CreateDebitosClienteDto) {): Promise<any> {
    return this.prismaTenant.prisma.debitos_cliente.create({
      data: createDebitosClienteDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.debitos_cliente.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.debitos_cliente.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  async update(update(id: number, updateDebitosClienteDto: UpdateDebitosClienteDto) {): Promise<any> {
    return this.prismaTenant.prisma.debitos_cliente.update({
      where: { id },
      data: updateDebitosClienteDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.debitos_cliente.delete({ where: { id } });
  }
}
