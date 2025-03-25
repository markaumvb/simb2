import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { StatusMesa } from '@prisma/client';

@Injectable()
export class MesasService {
  constructor(private prismaTenant: PrismaTenantService) {}
  private readonly logger = new Logger(MesasService.name);

  private ensureTenantContext() {
    if (!this.prismaTenant.currentTenantId) {
      throw new UnauthorizedException('Contexto de tenant não encontrado');
    }
    this.logger.debug(
      `Operação em funcionários executada no tenant: ${this.prismaTenant.currentTenantId}`,
    );
  }

  async create(data: CreateMesaDto) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.mesa.create({
      data: this.prismaTenant.addTenantToData(data),
    });
  }

  async findLinha(linha: number) {
    this.ensureTenantContext();
    return await this.prismaTenant.prisma.client.mesa.findMany({
      where: { id_linha: linha },
      orderBy: { id: 'asc' },
    });
  }

  async findStatus(status: StatusMesa) {
    this.ensureTenantContext();
    return await this.prismaTenant.prisma.client.mesa.findMany({
      where: { status }, // Agora correto: status é do tipo StatusMesa
      orderBy: { id: 'asc' },
    });
  }

  async findAll() {
    this.ensureTenantContext();
    return await this.prismaTenant.prisma.client.mesa.findMany();
  }

  async findOne(id: number) {
    this.ensureTenantContext();
    const mesa = await this.prismaTenant.prisma.client.mesa.findUnique({
      where: { id },
      include: {
        composicao: true,
        log_mesa: true,
        cobranca: true,
        ponto: true,
        tipo_mesa: true,
      },
    });

    if (!mesa) {
      return null;
    }

    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.mesa.update({
      where: { id },
      data: updateMesaDto,
    });
  }

  async remove(id: number) {
    this.ensureTenantContext();
    return this.prismaTenant.prisma.client.mesa.delete({ where: { id } });
  }
}
