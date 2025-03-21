import { Injectable } from '@nestjs/common';
import { CreateFuncionarioPerfilDto } from './dto/create-funcionario-perfil.dto';
import { UpdateFuncionarioPerfilDto } from './dto/update-funcionario-perfil.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class FuncionarioPerfilsService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createFuncionarioPerfilDto: CreateFuncionarioPerfilDto) {): Promise<any> {
    return this.prismaTenant.prisma.funcionario_perfil.create({
      data: createFuncionarioPerfilDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.funcionario_perfil.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.funcionario_perfil.findUnique({
      where: { id: id },
    });
  }

  async update(update(id: number, updateFuncionarioPerfilDto: UpdateFuncionarioPerfilDto) {): Promise<any> {
    return this.prismaTenant.prisma.funcionario_perfil.update({
      where: { id },
      data: updateFuncionarioPerfilDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.funcionario_perfil.delete({
      where: { id: id },
    });
  }
}
