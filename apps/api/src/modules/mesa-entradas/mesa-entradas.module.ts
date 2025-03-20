import { Module } from '@nestjs/common';
import { MesaEntradasService } from './mesa-entradas.service';
import { MesaEntradasController } from './mesa-entradas.controller';

@Module({
  controllers: [MesaEntradasController],
  providers: [MesaEntradasService],
})
export class MesaEntradasModule {}
