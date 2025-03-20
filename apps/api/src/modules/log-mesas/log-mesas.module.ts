import { Module } from '@nestjs/common';
import { LogMesasService } from './log-mesas.service';
import { LogMesasController } from './log-mesas.controller';

@Module({
  controllers: [LogMesasController],
  providers: [LogMesasService],
})
export class LogMesasModule {}
