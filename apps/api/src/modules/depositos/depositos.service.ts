import { Injectable } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class DepositosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateDepositoDto) {
    return this.prismaTenant.prisma.client.deposito.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.client.deposito.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.deposito.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateDepositoDto) {
    return this.prismaTenant.prisma.client.deposito.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.deposito.delete({ where: { id } });
  }
}
