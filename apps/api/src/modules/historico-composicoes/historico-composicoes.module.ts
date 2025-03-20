import { Module } from '@nestjs/common';
import { HistoricoComposicoesService } from './historico-composicoes.service';
import { HistoricoComposicoesController } from './historico-composicoes.controller';

@Module({
  controllers: [HistoricoComposicoesController],
  providers: [HistoricoComposicoesService],
})
export class HistoricoComposicoesModule {}
