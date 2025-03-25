import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class ClientesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createClienteDto: CreateClienteDto) {
    return this.prismaTenant.prisma.client.cliente.create({
      data: this.prismaTenant.addTenantToData(createClienteDto),
    });
  }

  async findAll(page = 1, limit = 10) {
    this.ensureTenantContext();
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prismaTenant.prisma.client.cliente.findMany({
        where: this.prismaTenant.addTenantToFilter(),
        skip,
        take: limit,
        orderBy: { nome: 'asc' },
      }),
      this.prismaTenant.prisma.client.cliente.count({
        where: this.prismaTenant.addTenantToFilter(),
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.cliente.findUnique({
      where: { id },
      include: {
        cidade: true,
        debitos_cliente: true,
        ponto_cliente: true,
      },
    });
  }

  findSituacao(ativo: boolean) {
    return this.prismaTenant.prisma.client.cliente.findMany({
      where: { ativo: ativo },
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.prismaTenant.prisma.client.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.cliente.delete({ where: { id } });
  }

  private ensureTenantContext() {
    if (!this.prismaTenant.currentTenantId) {
      throw new UnauthorizedException('Contexto de tenant não encontrado');
    }

    // Opcional: log para auditoria
    Logger.debug(
      `Operação executada no tenant: ${this.prismaTenant.currentTenantId}`,
      this.constructor.name,
    );
  }
}
