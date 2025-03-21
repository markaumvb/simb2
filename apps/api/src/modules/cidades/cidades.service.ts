import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class CidadesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createCidadeDto: CreateCidadeDto) {): Promise<any> {
    return this.prismaTenant.prisma.cidade.create({ data: createCidadeDto });
  }

  async async findAll(): Promise<any[]> {
    const total = await this.prismaTenant.prisma.cidade.count;
    const dados = await this.prismaTenant.prisma.cidade.findMany();
    return { dados, total };
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.cidade.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  async update(update(id: number, updateCidadeDto: UpdateCidadeDto) {): Promise<any> {
    return this.prismaTenant.prisma.cidade.update({
      where: { id },
      data: updateCidadeDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.cidade.delete({ where: { id } });
  }
}
