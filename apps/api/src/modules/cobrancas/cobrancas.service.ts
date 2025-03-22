import { Injectable } from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class CobrancasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(data: CreateCobrancaDto) {
    return this.prismaTenant.prisma.client.cobranca.create({ data });
  }

  findAll() {
    return this.prismaTenant.prisma.client.cobranca.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.cobranca.findUnique({
      where: { id: id },
    });
  }

  findCobrancaMesa(mesa: number) {
    return this.prismaTenant.prisma.client.cobranca.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
      },
    });
  }

  update(id: number, updateCobrancaDto: UpdateCobrancaDto) {
    return this.prismaTenant.prisma.client.cobranca.update({
      where: { id },
      data: updateCobrancaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.cobranca.delete({ where: { id } });
  }
}
