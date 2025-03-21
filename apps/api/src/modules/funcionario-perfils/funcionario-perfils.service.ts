import { Injectable } from '@nestjs/common';
import { CreateFuncionarioPerfilDto } from './dto/create-funcionario-perfil.dto';
import { UpdateFuncionarioPerfilDto } from './dto/update-funcionario-perfil.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class FuncionarioPerfilsService {
  constructor(private prisma: PrismaService) {}

  create(createFuncionarioPerfilDto: CreateFuncionarioPerfilDto) {
    return this.prisma.funcionario_perfil.create({
      data: createFuncionarioPerfilDto,
    });
  }

  findAll() {
    return this.prisma.funcionario_perfil.findMany();
  }

  findOne(id: number) {
    return this.prisma.funcionario_perfil.findUnique({ where: { id: id } });
  }

  update(id: number, updateFuncionarioPerfilDto: UpdateFuncionarioPerfilDto) {
    return this.prisma.funcionario_perfil.update({
      where: { id },
      data: updateFuncionarioPerfilDto,
    });
  }

  remove(id: number) {
    return this.prisma.funcionario_perfil.delete({ where: { id: id } });
  }
}
