import { Injectable } from '@nestjs/common';
import { CreateMembrosLinhaDto } from './dto/create-membros-linha.dto';
import { UpdateMembrosLinhaDto } from './dto/update-membros-linha.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class MembrosLinhasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  create(createMembrosLinhaDto: CreateMembrosLinhaDto) {
    return this.prismaTenant.prisma.membros_linha.create({ data: createMembrosLinhaDto });
  }

  findAll() {
    return this.prismaTenant.prisma.membros_linha.findMany();
  }

  findOne(id: number) {
    return this.prismaTenant.prisma.membros_linha.findUnique({
      where: { id },
      include: {
        funcionario: true,
      },
    });
  }

  update(id: number, updateMembrosLinhaDto: UpdateMembrosLinhaDto) {
    return this.prismaTenant.prisma.membros_linha.update({
      where: { id },
      data: updateMembrosLinhaDto,
    });
  }

  remove(id: number) {
    return this.prismaTenant.prisma.membros_linha.delete({ where: { id } });
  }
}
