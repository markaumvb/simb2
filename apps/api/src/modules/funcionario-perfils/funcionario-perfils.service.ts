import { Injectable } from '@nestjs/common';
import { CreateFuncionarioPerfilDto } from './dto/create-funcionario-perfil.dto';
import { UpdateFuncionarioPerfilDto } from './dto/update-funcionario-perfil.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class FuncionarioPerfilsService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createFuncionarioPerfilDto: CreateFuncionarioPerfilDto) {
    return this.prismaTenant.prisma.client.funcionario_perfil.create({
      data: this.prismaTenant.addTenantToData(createFuncionarioPerfilDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.funcionario_perfil.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.funcionario_perfil.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateFuncionarioPerfilDto: UpdateFuncionarioPerfilDto) {
    return this.prismaTenant.prisma.client.funcionario_perfil.update({
      where: { id },
      data: updateFuncionarioPerfilDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.funcionario_perfil.delete({
      where: { id: id },
    });
  }
}
