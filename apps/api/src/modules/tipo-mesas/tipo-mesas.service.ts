import { Injectable } from '@nestjs/common';
import { CreateTipoMesaDto } from './dto/create-tipo-mesa.dto';
import { UpdateTipoMesaDto } from './dto/update-tipo-mesa.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class TipoMesasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateTipoMesaDto) {
    return this.prismaTenant.prisma.tipo_mesa.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.tipo_mesa.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.tipo_mesa.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateTipoMesaDto: UpdateTipoMesaDto) {
    return this.prismaTenant.prisma.tipo_mesa.update({
      where: { id },
      data: updateTipoMesaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.tipo_mesa.delete({ where: { id } });
  }
}
