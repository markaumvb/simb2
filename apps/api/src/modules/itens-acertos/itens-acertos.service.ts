import { Injectable } from '@nestjs/common';
import { CreateItensAcertoDto } from './dto/create-itens-acerto.dto';
import { UpdateItensAcertoDto } from './dto/update-itens-acerto.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class ItensAcertosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createItensAcertoDto: CreateItensAcertoDto) {): Promise<any> {
    return this.prismaTenant.prisma.itens_acerto.create({
      data: createItensAcertoDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.itens_acerto.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.itens_acerto.findUnique({
      where: { id: id },
    });
  }

  async update(update(id: number, updateItensAcertoDto: UpdateItensAcertoDto) {): Promise<any> {
    return this.prismaTenant.prisma.itens_acerto.update({
      where: { id: id },
      data: updateItensAcertoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.itens_acerto.delete({ where: { id: id } });
  }
}
