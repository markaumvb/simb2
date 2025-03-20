import { Module } from '@nestjs/common';
import { TipoMesasService } from './tipo-mesas.service';
import { TipoMesasController } from './tipo-mesas.controller';

@Module({
  controllers: [TipoMesasController],
  providers: [TipoMesasService],
})
export class TipoMesasModule {}
