import { Injectable } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class CobrancasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(data: CreateCobrancaDto) {): Promise<any> {
    return this.prismaTenant.prisma.cobranca.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.cobranca.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.cobranca.findUnique({ where: { id: id } });
  }

  findCobrancaMesa(mesa: number) {
    return this.prismaTenant.prisma.cobranca.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
      },
    });
  }

  async update(update(id: number, updateCobrancaDto: UpdateCobrancaDto) {): Promise<any> {
    return this.prismaTenant.prisma.cobranca.update({
      where: { id },
      data: updateCobrancaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.cobranca.delete({ where: { id } });
  }
}
