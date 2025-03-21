import { Injectable } from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DepositosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateDepositoDto) {
    return this.prisma.deposito.create({ data });
  }

  findAll() {
    return this.prisma.deposito.findMany();
  }

  findOne(id: number) {
    return this.prisma.deposito.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateDepositoDto) {
    return this.prisma.deposito.update({
      where: { id },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.deposito.delete({ where: { id } });
  }
}
