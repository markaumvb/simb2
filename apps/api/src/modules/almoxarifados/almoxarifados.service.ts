import { Injectable } from '@nestjs/common';
import { CreateAlmoxarifadoDto } from './dto/create-almoxarifado.dto';
import { UpdateAlmoxarifadoDto } from './dto/update-almoxarifado.dto';
import { PrismaTenantService } from 'src/providers/prisma-tenant.provider';

@Injectable()
export class AlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(create(createAlmoxarifadoDto: CreateAlmoxarifadoDto) {): Promise<any> {
    return this.prismaTenant.prisma.almoxarifado.create({
      data: createAlmoxarifadoDto,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prismaTenant.prisma.almoxarifado.findMany();
  }

  async findOne(findOne(id: number) {): Promise<any | null> {
    return this.prismaTenant.prisma.almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  async update(update(id: number, updateAlmoxarifadoDto: UpdateAlmoxarifadoDto) {): Promise<any> {
    return this.prismaTenant.prisma.almoxarifado.update({
      where: { id },
      data: updateAlmoxarifadoDto,
    });
  }

  async remove(remove(id: number) {): Promise<any> {
    return this.prismaTenant.prisma.almoxarifado.delete({ where: { id } });
  }
}
