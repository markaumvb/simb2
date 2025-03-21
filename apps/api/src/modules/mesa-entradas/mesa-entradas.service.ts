import { Injectable } from '@nestjs/common';
import { CreateMesaEntradaDto } from './dto/create-mesa-entrada.dto';
import { UpdateMesaEntradaDto } from './dto/update-mesa-entrada.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MesaEntradasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createMesaEntradaDto: CreateMesaEntradaDto) {
    return this.prismaTenant.prisma.mesa_entrada.create({ data: createMesaEntradaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.mesa_entrada.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.mesa_entrada.findUnique({
      where: { id },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateMesaEntradaDto: UpdateMesaEntradaDto) {
    return this.prismaTenant.prisma.mesa_entrada.update({
      where: { id },
      data: updateMesaEntradaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.mesa_entrada.delete({ where: { id } });
  }
}
