import { Injectable } from '@nestjs/common';
import { CreateLogMesaDto } from './dto/create-log-mesa.dto';
import { UpdateLogMesaDto } from './dto/update-log-mesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class LogMesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createLogMesaDto: CreateLogMesaDto) {
    return this.prismaTenant.prisma.log_mesa.create({ data: createLogMesaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.log_mesa.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.log_mesa.findUnique({ where: { id } });
  }

  findMesa(mesa: number) {
    return this.prismaTenant.prisma.log_mesa.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
        funcionario: true,
      },
    });
  }

  update(id: number, updateLogMesaDto: UpdateLogMesaDto) {
    return this.prismaTenant.prisma.log_mesa.update({
      where: { id },
      data: updateLogMesaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.log_mesa.delete({ where: { id } });
  }
}
