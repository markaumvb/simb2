import { Injectable } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class DespesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createDespesaDto: CreateDespesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.despesa.create({ data: createDespesaDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.despesa.findMany();
  }

  findbyMovimentacao(id_movimentacao: number) {
    return this.prismaTenant.prisma.despesa.findMany({
      where: { id_movimentacao },
    });
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.despesa.findUnique({
      where: { id },
      include: {
        movimentacao: true,
        tipo_despesa: true,
      },
    });
  }

  async update(update(id: number, updateDespesaDto: UpdateDespesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.despesa.update({
      where: { id },
      data: updateDespesaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.despesa.delete({ where: { id } });
  }
}
