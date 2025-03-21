import { Injectable } from '@nestjs/common';
import { CreateMesaSaidaDto } from './dto/create-mesa-saida.dto';
import { UpdateMesaSaidaDto } from './dto/update-mesa-saida.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MesaSaidasService {
  constructor(private prisma: PrismaService) {}

  create(createMesaSaidaDto: CreateMesaSaidaDto) {
    return this.prisma.mesa_saida.create({ data: createMesaSaidaDto });
  }

  findAll() {
    return this.prisma.mesa_saida.findMany();
  }

  findOne(id: number) {
    return this.prisma.mesa_saida.findUnique({ where: { id } });
  }

  update(id: number, updateMesaSaidaDto: UpdateMesaSaidaDto) {
    return this.prisma.mesa_saida.update({
      where: { id },
      data: updateMesaSaidaDto,
    });
  }

  remove(id: number) {
    return this.prisma.mesa_saida.delete({ where: { id } });
  }
}
