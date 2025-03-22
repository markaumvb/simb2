import { Injectable } from '@nestjs/common';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class DespesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createDespesaDto: CreateDespesaDto) {
    return this.prismaTenant.prisma.client.despesa.create({
      data: createDespesaDto,
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.despesa.findMany();
  }

  findbyMovimentacao(id_movimentacao: number) {
    return this.prismaTenant.prisma.client.despesa.findMany({
      where: { id_movimentacao },
    });
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.despesa.findUnique({
      where: { id },
      include: {
        movimentacao: true,
        tipo_despesa: true,
      },
    });
  }

  update(id: number, updateDespesaDto: UpdateDespesaDto) {
    return this.prismaTenant.prisma.client.despesa.update({
      where: { id },
      data: updateDespesaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.despesa.delete({ where: { id } });
  }
}
