// src/modules/funcionarios/funcionarios.service.ts
import { Injectable } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10; // fator de custo (aumentar a força do hash)

@Injectable()
export class FuncionariosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const hashedpassword = await bcrypt.hash(
      createFuncionarioDto.senha,
      roundsOfHashing,
    );

    // Criar uma cópia modificada do DTO
    const funcionarioData = {
      ...createFuncionarioDto,
      senha: hashedpassword,
      // Adicionar conexão explícita com cidade
      cidade: {
        connect: { id: createFuncionarioDto.id_cidade },
      },
    };

    // Remover id_cidade do objeto principal para evitar conflito
    delete funcionarioData.id_cidade;

    // Aplicar tenant e criar o funcionário
    return this.prismaTenant.prisma.funcionario.create({
      data: this.prismaTenant.addTenantToData(funcionarioData),
    });
  }

  findAll() {
    return this.prismaTenant.prisma.funcionario.findMany({
      where: this.prismaTenant.addTenantToFilter(),
    });
  }

  findSituacao(ativo: boolean) {
    return this.prismaTenant.prisma.funcionario.findMany({
      where: this.prismaTenant.addTenantToFilter({ status: ativo }),
    });
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.funcionario.findUnique({
      where: this.prismaTenant.addTenantToFilter({ id }),
      include: {
        cidade: true,
        funcionario_perfil: true,
        membros_linha: true,
        permissoes_usuario: true,
      },
    });
  }

  findEmail(email: string) {
    return this.prismaTenant.prisma.funcionario.findMany({
      where: this.prismaTenant.addTenantToFilter({ email }),
    });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const funcionarioData = { ...updateFuncionarioDto };

    // Hash a senha se fornecida
    if (funcionarioData.senha) {
      funcionarioData.senha = await bcrypt.hash(
        funcionarioData.senha,
        roundsOfHashing,
      );
    }

    // Lidar com relação de cidade se o id_cidade foi fornecido
    if (funcionarioData.id_cidade) {
      funcionarioData.cidade = {
        connect: { id: funcionarioData.id_cidade },
      };
      delete funcionarioData.id_cidade;
    }

    return this.prismaTenant.prisma.funcionario.update({
      where: this.prismaTenant.addTenantToFilter({ id }),
      data: funcionarioData,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.funcionario.delete({
      where: this.prismaTenant.addTenantToFilter({ id }),
    });
  }
}
