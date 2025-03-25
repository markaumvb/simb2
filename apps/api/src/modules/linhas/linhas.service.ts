// src/modules/linhas/linhas.service.ts
import { Injectable } from '@nestjs/common';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class LinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createLinhaDto: CreateLinhaDto) {
    // Usando o método addTenantToData para injetar o tenant_id corretamente
    return this.prismaTenant.prisma.client.linha.create({
      data: this.prismaTenant.addTenantToData(createLinhaDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.linha.findMany({
      where: this.prismaTenant.addTenantToFilter(),
    });
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.linha.findUnique({
      where: this.prismaTenant.addTenantToFilter({ id }),
      include: {
        movimentacao: true,
      },
    });
  }

  async update(id: number, updateLinhaDto: UpdateLinhaDto) {
    return this.prismaTenant.prisma.client.linha.update({
      where: this.prismaTenant.addTenantToFilter({ id }),
      data: updateLinhaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.linha.delete({
      where: this.prismaTenant.addTenantToFilter({ id }),
    });
  }
}
