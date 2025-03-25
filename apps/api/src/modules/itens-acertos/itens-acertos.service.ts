import { Injectable } from '@nestjs/common';
import { CreateItensAcertoDto } from './dto/create-itens-acerto.dto';
import { UpdateItensAcertoDto } from './dto/update-itens-acerto.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class ItensAcertosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(createItensAcertoDto: CreateItensAcertoDto) {
    return this.prismaTenant.prisma.client.itens_acerto.create({
      data: this.prismaTenant.addTenantToData(createItensAcertoDto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.itens_acerto.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.itens_acerto.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateItensAcertoDto: UpdateItensAcertoDto) {
    return this.prismaTenant.prisma.client.itens_acerto.update({
      where: { id: id },
      data: updateItensAcertoDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.itens_acerto.delete({
      where: { id: id },
    });
  }
}
