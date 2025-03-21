import { Injectable } from '@nestjs/common';
import { CreateTipoDespesaDto } from './dto/create-tipo-despesa.dto';
import { UpdateTipoDespesaDto } from './dto/update-tipo-despesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class TipoDespesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createTipoDespesaDto: CreateTipoDespesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.tipo_despesa.create({
      data: createTipoDespesaDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.tipo_despesa.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.tipo_despesa.findUnique({ where: { id } });
  }

  async update(update(id: number, updateTipoDespesaDto: UpdateTipoDespesaDto) {): Promise<any> {
    return this.prismaTenant.prisma.tipo_despesa.update({
      where: { id },
      data: updateTipoDespesaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.tipo_despesa.delete({ where: { id } });
  }
}
