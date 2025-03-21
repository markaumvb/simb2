import { Injectable } from '@nestjs/common';
import { CreateBrindeDto } from './dto/create-brinde.dto';
import { UpdateBrindeDto } from './dto/update-brinde.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';
import { async } from 'rxjs';

@Injectable()
export class BrindesService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createBrindeDto: CreateBrindeDto) {): Promise<any> {
    return this.prismaTenant.prisma.brinde.create({ data: createBrindeDto });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.brinde.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.brinde.findUnique({
      where: { id },
    });
  }

  async update(update(id: number, updateBrindeDto: UpdateBrindeDto) {): Promise<any> {
    return this.prismaTenant.prisma.brinde.update({
      where: { id },
      data: updateBrindeDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.brinde.delete({ where: { id } });
  }
}
