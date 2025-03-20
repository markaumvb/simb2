import { Injectable } from '@nestjs/common';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class FuncaosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateFuncaoDto) {
    return this.prismaTenant.prisma.funcao.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.funcao.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.funcao.findUnique({
      where: { id },
      include: {
        membros_linha: true,
      },
    });
  }

  update(id: number, updateFuncaoDto: UpdateFuncaoDto) {
    return this.prismaTenant.prisma.funcao.update({
      where: { id },
      data: updateFuncaoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.funcao.delete({ where: { id } });
  }
}
