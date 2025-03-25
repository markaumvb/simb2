// src/modules/funcionarios/funcionarios.service.ts
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class FuncionariosService {
  private readonly logger = new Logger(FuncionariosService.name);

  constructor(private prismaTenant: PrismaTenantService) {}

  private ensureTenantContext() {
    if (!this.prismaTenant.currentTenantId) {
      throw new UnauthorizedException('Contexto de tenant não encontrado');
    }
    this.logger.debug(
      `Operação em funcionários executada no tenant: ${this.prismaTenant.currentTenantId}`,
    );
  }

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    this.ensureTenantContext();
    const hashedpassword = await bcrypt.hash(
      createFuncionarioDto.senha,
      roundsOfHashing,
    );

    // Extrair id_cidade e preparar relação cidade
    const { id_cidade, ...restData } = createFuncionarioDto;

    const funcionarioData = {
      ...restData,
      senha: hashedpassword,
      cidade: {
        connect: { id: id_cidade },
      },
    };

    // Usar o método que adiciona automaticamente o tenant do contexto atual
    return this.prismaTenant.prisma.client.funcionario.create({
      data: this.prismaTenant.addTenantToData(funcionarioData),
    });
  }

  async findAll() {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.funcionario.findMany({
      where: this.prismaTenant.addTenantToFilter(),
    });
  }

  findSituacao(ativo: boolean) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.funcionario.findMany({
      where: this.prismaTenant.addTenantToFilter({ status: ativo }),
    });
  }

  async findOne(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.funcionario.findUnique({
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
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.funcionario.findMany({
      where: this.prismaTenant.addTenantToFilter({ email }),
    });
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    this.ensureTenantContext();
    const { id_cidade, senha, ...restData } = updateFuncionarioDto;

    // Preparar objeto de dados
    const funcionarioData: any = { ...restData };

    // Se tiver senha, fazer hash
    if (senha) {
      funcionarioData.senha = await bcrypt.hash(senha, roundsOfHashing);
    }

    // Se tiver id_cidade, adicionar relação
    if (id_cidade) {
      funcionarioData.cidade = {
        connect: { id: id_cidade },
      };
    }

    return this.prismaTenant.prisma.client.funcionario.update({
      where: this.prismaTenant.addTenantToFilter({ id }),
      data: funcionarioData,
    });
  }

  async remove(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.funcionario.delete({
      where: this.prismaTenant.addTenantToFilter({ id }),
    });
  }
}
