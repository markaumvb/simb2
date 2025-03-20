import { Module } from '@nestjs/common';
import { HistoricoPontosService } from './historico-pontos.service';
import { HistoricoPontosController } from './historico-pontos.controller';

@Module({
  controllers: [HistoricoPontosController],
  providers: [HistoricoPontosService],
})
export class HistoricoPontosModule {}
