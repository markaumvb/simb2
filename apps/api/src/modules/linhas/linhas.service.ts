import { Injectable } from '@nestjs/common';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class LinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createLinhaDto: CreateLinhaDto) {): Promise<any> {
    return this.prismaTenant.prisma.linha.create({ data: createLinhaDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.linha.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.linha.findUnique({
      where: { id },
      include: {
        movimentacao: true,
      },
    });
  }

  async update(update(id: number, updateLinhaDto: UpdateLinhaDto) {): Promise<any> {
    return this.prismaTenant.prisma.linha.update({
      where: { id },
      data: updateLinhaDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.linha.delete({ where: { id } });
  }
}
