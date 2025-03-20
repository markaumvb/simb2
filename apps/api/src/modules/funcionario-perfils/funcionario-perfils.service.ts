import { Injectable } from '@nestjs/common';
import { CreateFuncionarioPerfilDto } from './dto/create-funcionario-perfil.dto';
import { UpdateFuncionarioPerfilDto } from './dto/update-funcionario-perfil.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class FuncionarioPerfilsService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createFuncionarioPerfilDto: CreateFuncionarioPerfilDto) {
    return this.prismaTenant.prisma.funcionario_perfil.create({
      data: createFuncionarioPerfilDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.funcionario_perfil.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.funcionario_perfil.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateFuncionarioPerfilDto: UpdateFuncionarioPerfilDto) {
    return this.prismaTenant.prisma.funcionario_perfil.update({
      where: { id },
      data: updateFuncionarioPerfilDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.funcionario_perfil.delete({
      where: { id: id },
    });
  }
}
