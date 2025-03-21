import { Injectable } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PerfilsService {
  constructor(private prisma: PrismaService) {}

  create(createPerfilDto: CreatePerfilDto) {
    return this.prisma.perfil.create({ data: createPerfilDto });
  }

  findAll() {
    return this.prisma.perfil.findMany();
  }

  findOne(id: number) {
    return this.prisma.perfil.findUnique({ where: { id } });
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return this.prisma.perfil.update({ where: { id }, data: updatePerfilDto });
  }

  remove(id: number) {
    return this.prisma.perfil.delete({ where: { id } });
  }
}
