import { Injectable } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class DespesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createDespesaDto: CreateDespesaDto) {
    return this.prismaTenant.prisma.despesa.create({ data: createDespesaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.despesa.findMany();
  }

  findbyMovimentacao(id_movimentacao: number) {
    return this.prismaTenant.prisma.despesa.findMany({
      where: { id_movimentacao },
    });
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.despesa.findUnique({
      where: { id },
      include: {
        movimentacao: true,
        tipo_despesa: true,
      },
    });
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    return this.prismaTenant.prisma.despesa.update({
      where: { id },
      data: updateDespesaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.despesa.delete({ where: { id } });
  }
}
