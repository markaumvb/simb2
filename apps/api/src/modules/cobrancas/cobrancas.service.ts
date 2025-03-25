import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';

@Injectable()
export class CobrancasService {
  constructor(private prismaTenant: PrismaTenantService) {}

  async create(dto: CreateCobrancaDto) {
    // Verificar se a mesa existe e está ocupada
    const mesa = await this.prismaTenant.prisma.client.mesa.findUnique({
      where: { id: dto.id_mesa },
    });

    if (!mesa) {
      throw new NotFoundException(`Mesa com ID ${dto.id_mesa} não encontrada`);
    }

    if (mesa.status !== 'OCUPADA') {
      throw new BadRequestException(
        `Mesa com ID ${dto.id_mesa} não está ocupada`,
      );
    }

    return this.prismaTenant.prisma.client.$transaction(async (tx) => {
      // 1. Criar a cobrança
      const cobranca = await tx.cobranca.create({
        data: this.prismaTenant.addTenantToData(dto),
      });

      // 2. Atualizar a mesa - CUIDADO: use cont_brinde_atual, não contador_brinde_atual
      await tx.mesa.update({
        where: { id: dto.id_mesa },
        data: {
          cont_atual: dto.contador_atual,
          cont_anterior: dto.contador_anterior,
          cont_brinde_atual: dto.contador_brinde_atual, // Correto
          cont_brinde_anterior: dto.contador_brinde_anterior,
        },
      });

      return cobranca;
    });
  }

  async findAll() {
    return this.prismaTenant.prisma.client.cobranca.findMany();
  }

  async findOne(id: number) {
    return this.prismaTenant.prisma.client.cobranca.findUnique({
      where: { id: id },
    });
  }

  findCobrancaMesa(mesa: number) {
    return this.prismaTenant.prisma.client.cobranca.findMany({
      where: { id_mesa: mesa },
      include: {
        mesa: true,
      },
    });
  }

  async update(id: number, updateCobrancaDto: UpdateCobrancaDto) {
    return this.prismaTenant.prisma.client.cobranca.update({
      where: { id },
      data: updateCobrancaDto,
    });
  }

  async remove(id: number) {
    return this.prismaTenant.prisma.client.cobranca.delete({ where: { id } });
  }
}
