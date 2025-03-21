import { Injectable } from '@nestjs/common';
import { CreateTipoDespesaDto } from './dto/create-tipo-despesa.dto';
import { UpdateTipoDespesaDto } from './dto/update-tipo-despesa.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TipoDespesasService {
  constructor(private prisma: PrismaService) {}

  create(createTipoDespesaDto: CreateTipoDespesaDto) {
    return this.prisma.tipo_despesa.create({ data: createTipoDespesaDto });
  }

  findAll() {
    return this.prisma.tipo_despesa.findMany();
  }

  findOne(id: number) {
    return this.prisma.tipo_despesa.findUnique({ where: { id } });
  }

  update(id: number, updateTipoDespesaDto: UpdateTipoDespesaDto) {
    return this.prisma.tipo_despesa.update({
      where: { id },
      data: updateTipoDespesaDto,
    });
  }

  remove(id: number) {
    return this.prisma.tipo_despesa.delete({ where: { id } });
  }
}
