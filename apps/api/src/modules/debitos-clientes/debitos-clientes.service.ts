import { Injectable } from '@nestjs/common';
import { CreateDebitosClienteDto } from './dto/create-debitos-cliente.dto';
import { UpdateDebitosClienteDto } from './dto/update-debitos-cliente.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DebitosClientesService {
  constructor(private prisma: PrismaService) {}

  create(createDebitosClienteDto: CreateDebitosClienteDto) {
    return this.prisma.debitos_cliente.create({
      data: createDebitosClienteDto,
    });
  }

  findAll() {
    return this.prisma.debitos_cliente.findMany();
  }

  findOne(id: number) {
    return this.prisma.debitos_cliente.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  update(id: number, updateDebitosClienteDto: UpdateDebitosClienteDto) {
    return this.prisma.debitos_cliente.update({
      where: { id },
      data: updateDebitosClienteDto,
    });
  }

  remove(id: number) {
    return this.prisma.debitos_cliente.delete({ where: { id } });
  }
}
