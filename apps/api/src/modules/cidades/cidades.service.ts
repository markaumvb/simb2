import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class CidadesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createCidadeDto: CreateCidadeDto) {
    return this.prismaTenant.prisma.cidade.create({
      data: {
        descricao: createCidadeDto.descricao,
        uf: createCidadeDto.uf,
        dt_alteracao: createCidadeDto.dt_alteracao,
        // Referência ao tenant via connect
        tenant: {
          connect: {
            id: this.prismaTenant.request['tenantId'],
          },
        },
      },
    });
  }

  async findAll() {
    const total = await this.prismaTenant.prisma.cidade.count();
    const dados = await this.prismaTenant.prisma.cidade.findMany();
    return { dados, total };
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.cidade.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  update(id: number, updateCidadeDto: UpdateCidadeDto) {
    return this.prismaTenant.prisma.cidade.update({
      where: { id },
      data: updateCidadeDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.cidade.delete({ where: { id } });
  }
}
