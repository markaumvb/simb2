import { Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class PontosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createPontoDto: CreatePontoDto) {
    return this.prismaTenant.prisma.ponto.create({ data: createPontoDto });
  }

  findAll() {
    return this.prismaTenant.prisma.ponto.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.ponto.findUnique({
      where: { id },
      include: {
        historico_ponto: true,
      },
    });
  }

  update(id: number, updatePontoDto: UpdatePontoDto) {
    return this.prismaTenant.prisma.ponto.update({
      where: { id },
      data: updatePontoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.ponto.delete({ where: { id } });
  }
}
