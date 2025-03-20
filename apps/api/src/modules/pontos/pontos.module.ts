import { Module } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { PontosController } from './pontos.controller';

@Module({
  controllers: [PontosController],
  providers: [PontosService]
})
export class PontosModule {}
