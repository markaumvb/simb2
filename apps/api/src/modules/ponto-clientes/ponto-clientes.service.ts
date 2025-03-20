import { Injectable } from '@nestjs/common';
import { CreatePontoClienteDto } from './dto/create-ponto-cliente.dto';
import { UpdatePontoClienteDto } from './dto/update-ponto-cliente.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PontoClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createPontoClienteDto: CreatePontoClienteDto) {
    return this.prismaTenant.prisma.ponto_cliente.create({
      data: createPontoClienteDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.ponto_cliente.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.ponto_cliente.findUnique({ where: { id } });
  }

  update(id: number, updatePontoClienteDto: UpdatePontoClienteDto) {
    return this.prismaTenant.prisma.ponto_cliente.update({
      where: { id },
      data: updatePontoClienteDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.ponto_cliente.delete({ where: { id } });
  }
}
