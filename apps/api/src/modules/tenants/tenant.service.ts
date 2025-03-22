import { Injectable } from '@nestjs/common';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createTenantDto: CreateTenantDto): Promise<any> {
    return this.prismaTenant.prisma.client.tenant.create({
      data: createTenantDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.client.tenant.findMany();
  }

  async findOne(id: number): Promise<any | null> {
    return this.prismaTenant.prisma.client.tenant.findUnique({
      where: { id },
    });
  }

  async findByCnpj(cnpj: string) {
    return this.prismaTenant.prisma.client.tenant.findUnique({
      where: { cnpj },
    });
  }

  async update(id: number, updateTenantDto: UpdateTenantDto): Promise<any> {
    return this.prismaTenant.prisma.client.tenant.update({
      where: { id },
      data: updateTenantDto,
    });
  }

  async remove(id: number): Promise<any> {
    return this.prismaTenant.prisma.client.tenant.delete({
      where: { id },
    });
  }

  async verificarAcessoUsuario(
    usuarioId: number,
    tenantId: number,
  ): Promise<boolean> {
    const funcionario =
      await this.prismaTenant.prisma.client.funcionario.findFirst({
        where: {
          id: usuarioId,
          tenant_id: tenantId,
        },
      });

    return !!funcionario;
  }
}
