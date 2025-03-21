import { Injectable } from '@nestjs/common';
import { CreateBrindeDto } from './dto/create-brinde.dto';
import { UpdateBrindeDto } from './dto/update-brinde.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BrindesService {
  constructor(private prisma: PrismaService) {}

  create(createBrindeDto: CreateBrindeDto) {
    return this.prisma.brinde.create({ data: createBrindeDto });
  }

  findAll() {
    return this.prisma.brinde.findMany();
  }

  findOne(id: number) {
    return this.prisma.brinde.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBrindeDto: UpdateBrindeDto) {
    return this.prisma.brinde.update({
      where: { id },
      data: updateBrindeDto,
    });
  }

  remove(id: number) {
    return this.prisma.brinde.delete({ where: { id } });
  }
}
