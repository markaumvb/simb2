import { Injectable } from '@nestjs/common';
import { CreateItensAcertoDto } from './dto/create-itens-acerto.dto';
import { UpdateItensAcertoDto } from './dto/update-itens-acerto.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class ItensAcertosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createItensAcertoDto: CreateItensAcertoDto) {
    return this.prismaTenant.prisma.client.itens_acerto.create({
      data: this.prismaTenant.addTenantToData(createItensAcertoDto),
    });
  }

  findAll() {
    return this.prismaTenant.prisma.client.itens_acerto.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.client.itens_acerto.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateItensAcertoDto: UpdateItensAcertoDto) {
    return this.prismaTenant.prisma.client.itens_acerto.update({
      where: { id: id },
      data: updateItensAcertoDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.client.itens_acerto.delete({
      where: { id: id },
    });
  }
}
