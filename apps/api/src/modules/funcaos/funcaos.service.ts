import { Injectable } from '@nestjs/common';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class FuncaosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(data: CreateFuncaoDto) {): Promise<any> {
    return this.prismaTenant.prisma.funcao.create({ data });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.funcao.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.funcao.findUnique({
      where: { id },
      include: {
        membros_linha: true,
      },
    });
  }

  async update(update(id: number, updateFuncaoDto: UpdateFuncaoDto) {): Promise<any> {
    return this.prismaTenant.prisma.funcao.update({
      where: { id },
      data: updateFuncaoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.funcao.delete({ where: { id } });
  }
}
