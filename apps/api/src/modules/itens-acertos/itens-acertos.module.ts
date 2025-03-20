import { Module } from '@nestjs/common';
import { ItensAcertosService } from './itens-acertos.service';
import { ItensAcertosController } from './itens-acertos.controller';

@Module({
  controllers: [ItensAcertosController],
  providers: [ItensAcertosService]
})
export class ItensAcertosModule {}
