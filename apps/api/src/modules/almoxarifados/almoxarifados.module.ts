import { Module } from '@nestjs/common';
import { AlmoxarifadosService } from './almoxarifados.service';
import { AlmoxarifadosController } from './almoxarifados.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [AlmoxarifadosController],
  providers: [AlmoxarifadosService],
  imports: [PrismaModule],
})
export class AlmoxarifadosModule {}
