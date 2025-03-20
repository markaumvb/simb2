import { Module } from '@nestjs/common';
import { PontoClientesService } from './ponto-clientes.service';
import { PontoClientesController } from './ponto-clientes.controller';

@Module({
  controllers: [PontoClientesController],
  providers: [PontoClientesService]
})
export class PontoClientesModule {}
