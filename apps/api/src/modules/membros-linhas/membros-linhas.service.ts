import { Injectable } from '@nestjs/common';
import { CreateMembrosLinhaDto } from './dto/create-membros-linha.dto';
import { UpdateMembrosLinhaDto } from './dto/update-membros-linha.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MembrosLinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createMembrosLinhaDto: CreateMembrosLinhaDto) {
    return this.prismaTenant.prisma.client.membros_linha.create({
      data: this.prismaTenant.addTenantToData(createMembrosLinhaDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.membros_linha.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.membros_linha.findUnique({
      where: { id },
      include: {
        funcionario: true,
      },
    });
  }

  async update(id: number, updateMembrosLinhaDto: UpdateMembrosLinhaDto) {
    return this.prismaTenant.prisma.client.membros_linha.update({
      where: { id },
      data: updateMembrosLinhaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.membros_linha.delete({
      where: { id },
    });
  }
}
