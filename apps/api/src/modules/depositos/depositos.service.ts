import { Injectable } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class DepositosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(data: CreateDepositoDto) {): Promise<any> {
    return this.prismaTenant.prisma.deposito.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.deposito.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.deposito.findUnique({ where: { id } });
  }

  async update(update(id: number, data: UpdateDepositoDto) {): Promise<any> {
    return this.prismaTenant.prisma.deposito.update({
      where: { id },
      data: data,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.deposito.delete({ where: { id } });
  }
}
