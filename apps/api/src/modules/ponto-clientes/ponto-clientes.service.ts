import { Injectable } from '@nestjs/common';
import { CreatePontoClienteDto } from './dto/create-ponto-cliente.dto';
import { UpdatePontoClienteDto } from './dto/update-ponto-cliente.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PontoClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createPontoClienteDto: CreatePontoClienteDto) {): Promise<any> {
    return this.prismaTenant.prisma.ponto_cliente.create({
      data: createPontoClienteDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.ponto_cliente.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.ponto_cliente.findUnique({ where: { id } });
  }

  async update(update(id: number, updatePontoClienteDto: UpdatePontoClienteDto) {): Promise<any> {
    return this.prismaTenant.prisma.ponto_cliente.update({
      where: { id },
      data: updatePontoClienteDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.ponto_cliente.delete({ where: { id } });
  }
}
