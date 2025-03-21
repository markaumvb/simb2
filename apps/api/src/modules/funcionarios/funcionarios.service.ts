import { Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10; // fator de custo (aumentar a força do hash)

@Injectable()
export class FuncionariosService {
  constructor(private prisma: PrismaService) {}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const hashedpassword = await bcrypt.hash(
      createFuncionarioDto.senha,
      roundsOfHashing,
    );
    createFuncionarioDto.senha = hashedpassword;
    return this.prisma.funcionario.create({ data: createFuncionarioDto });
  }

  findAll() {
    return this.prisma.funcionario.findMany();
  }

  findSituacao(ativo: boolean) {
    return this.prisma.funcionario.findMany({ where: { status: ativo } });
  }

  findOne(id: number) {
    return this.prisma.funcionario.findUnique({
      where: { id },
      include: {
        cidade: true,
        funcionario_perfil: true,
        membros_linha: true,
        permissoes_usuario: true,
      },
    });
  }

  findEmail(email: string) {
    return this.prisma.funcionario.findMany({
      where: { email },
    });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    if (updateFuncionarioDto.senha) {
      updateFuncionarioDto.senha = await bcrypt.hash(
        updateFuncionarioDto.senha,
        roundsOfHashing,
      );
    }
    return this.prisma.funcionario.update({
      where: { id },
      data: updateFuncionarioDto,
    });
  }

  remove(id: number) {
    return this.prisma.funcionario.delete({ where: { id } });
  }
}
