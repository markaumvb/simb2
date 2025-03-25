import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { Especie } from '@prisma/client';
import { create } from 'domain';
import { async } from 'rxjs';

@Injectable()
export class DespesasService {
  private readonly logger = new Logger(DespesasService.name);

  constructor(private prismaTenant: PrismaTenantService) {}

  private ensureTenantContext() {
    if (!this.prismaTenant.currentTenantId) {
      throw new UnauthorizedException('Contexto de tenant não encontrado');
    }
    this.logger.debug(
      `Operação em despesas executada no tenant: ${this.prismaTenant.currentTenantId}`,
    );
  }

  async create(dto: CreateDespesaDto) {
    this.ensureTenantContext();

    // Validar valor
    if (dto.valor <= 0) {
      throw new BadRequestException('Valor da despesa deve ser positivo');
    }

    // Validar forma de pagamento se for cheque
    if (dto.especie === Especie.CHEQUE && !dto.dt_cheque) {
      // CORREÇÃO: usar especie em vez de status
      throw new BadRequestException(
        'Data do cheque é obrigatória para despesas pagas com cheque',
      );
    }

    return this.prismaTenant.prisma.client.despesa.create({
      data: this.prismaTenant.addTenantToData(dto),
    });
  }

  async findAll() {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.despesa.findMany();
  }

  findbyMovimentacao(id_movimentacao: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.despesa.findMany({
      where: { id_movimentacao },
    });
  }

  async findOne(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.despesa.findUnique({
      where: { id },
      include: {
        movimentacao: true,
        tipo_despesa: true,
      },
    });
  }

  async update(id: number, updateDespesaDto: UpdateDespesaDto) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.despesa.update({
      where: { id },
      data: updateDespesaDto,
    });
  }

  async remove(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.despesa.delete({ where: { id } });
  }
}
