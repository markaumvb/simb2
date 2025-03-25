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

    // Validar tipo de pagamento
    const tiposPagamentoValidos = [
      'Dinheiro',
      'Cheque',
      'PIX',
      'Cartão',
      'Transferência',
      'Outros',
      'Boleto',
    ];
    if (!tiposPagamentoValidos.includes(dto.especie)) {
      throw new BadRequestException(
        `Tipo de pagamento '${dto.especie}' inválido`,
      );
    }

    // Se for cheque, data do cheque é obrigatória
    if (dto.especie === 'Cheque' && !dto.dt_cheque) {
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

  async update(id: number, data: UpdateDepositoDto) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.deposito.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.deposito.delete({ where: { id } });
  }
}
