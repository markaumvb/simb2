import { Injectable } from '@nestjs/common';
import { CreateMembrosLinhaDto } from './dto/create-membros-linha.dto';
import { UpdateMembrosLinhaDto } from './dto/update-membros-linha.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class MembrosLinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createMembrosLinhaDto: CreateMembrosLinhaDto) {): Promise<any> {
    return this.prismaTenant.prisma.membros_linha.create({
      data: createMembrosLinhaDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.membros_linha.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.membros_linha.findUnique({
      where: { id },
      include: {
        funcionario: true,
      },
    });
  }

  async update(update(id: number, updateMembrosLinhaDto: UpdateMembrosLinhaDto) {): Promise<any> {
    return this.prismaTenant.prisma.membros_linha.update({
      where: { id },
      data: updateMembrosLinhaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.membros_linha.delete({ where: { id } });
  }
}
