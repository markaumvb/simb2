import { Injectable } from '@nestjs/common';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class SistemasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createSistemaDto: CreateSistemaDto) {): Promise<any> {
    return this.prismaTenant.prisma.sistema.create({ data: createSistemaDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.sistema.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.sistema.findUnique({ where: { id } });
  }

  async update(update(id: number, updateSistemaDto: UpdateSistemaDto) {): Promise<any> {
    return this.prismaTenant.prisma.sistema.update({
      where: { id },
      data: updateSistemaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.sistema.delete({ where: { id } });
  }
}
