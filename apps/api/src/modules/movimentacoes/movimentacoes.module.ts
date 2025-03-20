import { Module } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { MovimentacoesController } from './movimentacoes.controller';

@Module({
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService]
})
export class MovimentacoesModule {}
