import { Module } from '@nestjs/common';
import { ComposicoesService } from './composicoes.service';
import { ComposicoesController } from './composicoes.controller';

@Module({
  controllers: [ComposicoesController],
  providers: [ComposicoesService],
})
export class ComposicoesModule {}
