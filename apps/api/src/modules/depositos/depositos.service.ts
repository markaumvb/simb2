import { Injectable } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class DepositosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateDepositoDto) {
    return this.prismaTenant.prisma.deposito.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.deposito.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.deposito.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateDepositoDto) {
    return this.prismaTenant.prisma.deposito.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.deposito.delete({ where: { id } });
  }
}
