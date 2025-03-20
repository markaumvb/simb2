import { Injectable } from '@nestjs/common';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class LinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createLinhaDto: CreateLinhaDto) {
    return this.prismaTenant.prisma.linha.create({ data: createLinhaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.linha.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.linha.findUnique({
      where: { id },
      include: {
        movimentacao: true,
      },
    });
  }

  update(id: number, updateLinhaDto: UpdateLinhaDto) {
    return this.prismaTenant.prisma.linha.update({
      where: { id },
      data: updateLinhaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.linha.delete({ where: { id } });
  }
}
