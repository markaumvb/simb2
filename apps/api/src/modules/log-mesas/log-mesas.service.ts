import { Injectable } from '@nestjs/common';
import { CreateLogMesaDto } from './dto/create-log-mesa.dto';
import { UpdateLogMesaDto } from './dto/update-log-mesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class LogMesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createLogMesaDto: CreateLogMesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.log_mesa.create({ data: createLogMesaDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.log_mesa.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
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

  async update(update(id: number, updateLogMesaDto: UpdateLogMesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.log_mesa.update({
      where: { id },
      data: updateLogMesaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.log_mesa.delete({ where: { id } });
  }
}
