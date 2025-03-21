import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class ClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}
  create(createClienteDto: CreateClienteDto) {
    return this.prismaTenant.prisma.cliente.create({ data: createClienteDto });
  }

  async findAll() {
    return await this.prismaTenant.prisma.cliente.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.cliente.findUnique({
      where: { id },
      include: {
        cidade: true,
        debitos_cliente: true,
        ponto_cliente: true,
      },
    });
  }

  findSituacao(ativo: boolean) {
    return this.prismaTenant.prisma.cliente.findMany({ where: { ativo: ativo } });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.prismaTenant.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.cliente.delete({ where: { id } });
  }
}
