import { Injectable } from '@nestjs/common';
import { CreateLogMesaDto } from './dto/create-log-mesa.dto';
import { UpdateLogMesaDto } from './dto/update-log-mesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class LogMesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createLogMesaDto: CreateLogMesaDto) {
    return this.prismaTenant.prisma.client.log_mesa.create({
      data: this.prismaTenant.addTenantToData(createLogMesaDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.log_mesa.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.log_mesa.findUnique({
      where: { id },
    });
  }

  findMesa(mesa: number) {
    return this.prismaTenant.prisma.client.log_mesa.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
        funcionario: true,
      },
    });
  }

  async update(id: number, updateLogMesaDto: UpdateLogMesaDto) {
    return this.prismaTenant.prisma.client.log_mesa.update({
      where: { id },
      data: updateLogMesaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.log_mesa.delete({ where: { id } });
  }
}
