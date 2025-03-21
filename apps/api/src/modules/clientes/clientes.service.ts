import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class ClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}
  async create(create(createClienteDto: CreateClienteDto) {): Promise<any> {
    return this.prismaTenant.prisma.cliente.create({ data: createClienteDto });
  }

  async async findAll(): Promise<any[]> {
    return await this.prismaTenant.prisma.cliente.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
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
    return this.prismaTenant.prisma.cliente.findMany({
      where: { ativo: ativo },
    });
  }

  async update(update(id: number, updateClienteDto: UpdateClienteDto) {): Promise<any> {
    return this.prismaTenant.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.cliente.delete({ where: { id } });
  }
}
