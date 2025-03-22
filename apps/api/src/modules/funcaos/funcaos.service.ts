import { Injectable } from '@nestjs/common';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class FuncaosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateFuncaoDto) {
    return this.prismaTenant.prisma.client.funcao.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.client.funcao.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.funcao.findUnique({
      where: { id },
      include: {
        membros_linha: true,
      },
    });
  }

  update(id: number, updateFuncaoDto: UpdateFuncaoDto) {
    return this.prismaTenant.prisma.client.funcao.update({
      where: { id },
      data: updateFuncaoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.funcao.delete({ where: { id } });
  }
}
