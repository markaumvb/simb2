import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlmoxarifadoDto } from './dto/create-almoxarifado.dto';
import { UpdateAlmoxarifadoDto } from './dto/update-almoxarifado.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { StatusAlmoxarifado } from '@prisma/client';

@Injectable()
export class AlmoxarifadosService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(dto: CreateAlmoxarifadoDto) {
    // Validar saldo e valor unitário
    if (Number(dto.saldo) < 0) {
      throw new BadRequestException('Saldo não pode ser negativo');
    }

    if (Number(dto.valor_unitario) <= 0) {
      throw new BadRequestException('Valor unitário deve ser positivo');
    }

    // Validar saldo mínimo e máximo
    if (
      dto.saldo_min !== null &&
      dto.saldo_max !== null &&
      Number(dto.saldo_min) > Number(dto.saldo_max)
    ) {
      throw new BadRequestException(
        'Saldo mínimo não pode ser maior que saldo máximo',
      );
    }

    return this.prismaTenant.prisma.client.almoxarifado.create({
      data: this.prismaTenant.addTenantToData(dto),
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.almoxarifado.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.almoxarifado.findUnique({
      where: { id },
      include: {
        itens_pedido_almoxarifado: true,
      },
    });
  }

  async update(id: number, updateAlmoxarifadoDto: UpdateAlmoxarifadoDto) {
    // Se houver campos que precisam de tratamento especial antes da atualização
    const dataToUpdate: any = { ...updateAlmoxarifadoDto };

    // Se precisar verificar explicitamente o status
    if (dataToUpdate.status !== undefined) {
      // Verificar se é um valor válido do enum
      if (!Object.values(StatusAlmoxarifado).includes(dataToUpdate.status)) {
        throw new BadRequestException(
          `Status inválido: ${dataToUpdate.status}`,
        );
      }
    }

    return this.prismaTenant.prisma.client.almoxarifado.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.almoxarifado.delete({
      where: { id },
    });
  }
}
