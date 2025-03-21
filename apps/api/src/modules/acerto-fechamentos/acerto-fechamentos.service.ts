import { Injectable } from '@nestjs/common';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class AcertoFechamentosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createAcertoFechamentoDto: CreateAcertoFechamentoDto) {): Promise<any> {
    return this.prismaTenant.prisma.acerto_fechamento.create({
      data: createAcertoFechamentoDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.acerto_fechamento.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.acerto_fechamento.findUnique({
      where: { id },
      include: {
        itens_acerto: true,
      },
    });
  }

  async update(update(id: number, updateAcertoFechamentoDto: UpdateAcertoFechamentoDto) {): Promise<any> {
    return this.prismaTenant.prisma.acerto_fechamento.update({
      where: { id },
      data: updateAcertoFechamentoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.acerto_fechamento.delete({ where: { id } });
  }
}
