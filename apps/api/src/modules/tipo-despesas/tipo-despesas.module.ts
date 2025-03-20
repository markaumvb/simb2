import { Module } from '@nestjs/common';
import { TipoDespesasService } from './tipo-despesas.service';
import { TipoDespesasController } from './tipo-despesas.controller';

@Module({
  controllers: [TipoDespesasController],
  providers: [TipoDespesasService]
})
export class TipoDespesasModule {}
