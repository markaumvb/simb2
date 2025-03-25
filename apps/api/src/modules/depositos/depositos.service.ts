import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { CobrancasService } from '../cobrancas/cobrancas.service';
import { Especie } from '@prisma/client';

@Injectable()
export class DepositosService {
  private readonly logger = new Logger(CobrancasService.name);

  constructor(private prismaTenant: PrismaTenantService) {}

  private ensureTenantContext() {
    if (!this.prismaTenant.currentTenantId) {
      throw new UnauthorizedException('Contexto de tenant não encontrado');
    }
    this.logger.debug(
      `Operação em cobranças executada no tenant: ${this.prismaTenant.currentTenantId}`,
    );
  }

  async create(dto: CreateDepositoDto) {
    this.ensureTenantContext();
    // Validar valor
    if (dto.valor <= 0) {
      throw new BadRequestException('Valor do depósito deve ser positivo');
    }

    // Se for cheque, data do cheque é obrigatória
    if (dto.especie === Especie.CHEQUE && !dto.dt_cheque) {
      throw new BadRequestException(
        'Data do cheque é obrigatória para depósitos com cheque',
      );
    }

    return this.prismaTenant.prisma.client.deposito.create({
      data: this.prismaTenant.addTenantToData(dto),
    });
  }

  async findAll() {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.deposito.findMany();
  }

  async findOne(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.deposito.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDto: UpdateDepositoDto) {
    this.ensureTenantContext();

    // Extrair campos relacionados
    const {
      id_linha,
      id_movimentacao,
      id_funcionario,
      id_cliente,
      ...restData
    } = updateDto;

    // Construir objeto de dados que o Prisma espera
    const updateData: any = {
      ...restData,
    };

    // Adicionar relações se fornecidas
    if (id_linha !== undefined) {
      updateData.linha = { connect: { id: id_linha } };
    }

    if (id_movimentacao !== undefined) {
      updateData.movimentacao = { connect: { id: id_movimentacao } };
    }

    if (id_funcionario !== undefined) {
      updateData.funcionario = { connect: { id: id_funcionario } };
    }

    if (id_cliente !== undefined) {
      updateData.cliente = { connect: { id: id_cliente } };
    }

    return this.prismaTenant.prisma.client.deposito.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.deposito.delete({ where: { id } });
  }
}
