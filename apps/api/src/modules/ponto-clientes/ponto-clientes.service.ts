import { Injectable } from '@nestjs/common';
import { CreatePontoClienteDto } from './dto/create-ponto-cliente.dto';
import { UpdatePontoClienteDto } from './dto/update-ponto-cliente.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PontoClientesService {
  constructor(private prisma: PrismaService) {}

  create(createPontoClienteDto: CreatePontoClienteDto) {
    return this.prisma.ponto_cliente.create({ data: createPontoClienteDto });
  }

  findAll() {
    return this.prisma.ponto_cliente.findMany();
  }

  findOne(id: number) {
    return this.prisma.ponto_cliente.findUnique({ where: { id } });
  }

  update(id: number, updatePontoClienteDto: UpdatePontoClienteDto) {
    return this.prisma.ponto_cliente.update({
      where: { id },
      data: updatePontoClienteDto,
    });
  }

  remove(id: number) {
    return this.prisma.ponto_cliente.delete({ where: { id } });
  }
}
