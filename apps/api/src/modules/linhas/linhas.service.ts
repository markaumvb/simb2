// src/modules/linhas/linhas.service.ts
import { Injectable } from '@nestjs/common';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class LinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createLinhaDto: CreateLinhaDto) {
    // Usando o método addTenantToData para injetar o tenant_id corretamente
    return this.prismaTenant.prisma.linha.create({
      data: this.prismaTenant.addTenantToData(createLinhaDto),
    });
  }

  findAll() {
    return this.prismaTenant.prisma.linha.findMany({
      where: this.prismaTenant.addTenantToFilter(),
    });
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.linha.findUnique({
      where: this.prismaTenant.addTenantToFilter({ id }),
      include: {
        movimentacao: true,
      },
    });
  }

  update(id: number, updateLinhaDto: UpdateLinhaDto) {
    return this.prismaTenant.prisma.linha.update({
      where: this.prismaTenant.addTenantToFilter({ id }),
      data: updateLinhaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.linha.delete({
      where: this.prismaTenant.addTenantToFilter({ id }),
    });
  }
}
