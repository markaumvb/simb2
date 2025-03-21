import { Injectable } from '@nestjs/common';
import { CreateTipoDespesaDto } from './dto/create-tipo-despesa.dto';
import { UpdateTipoDespesaDto } from './dto/update-tipo-despesa.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class TipoDespesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createTipoDespesaDto: CreateTipoDespesaDto) {
    return this.prismaTenant.prisma.tipo_despesa.create({ data: createTipoDespesaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.tipo_despesa.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.tipo_despesa.findUnique({ where: { id } });
  }

  update(id: number, updateTipoDespesaDto: UpdateTipoDespesaDto) {
    return this.prismaTenant.prisma.tipo_despesa.update({
      where: { id },
      data: updateTipoDespesaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.tipo_despesa.delete({ where: { id } });
  }
}
