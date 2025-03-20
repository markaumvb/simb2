import { Module } from '@nestjs/common';
import { MesaSaidasService } from './mesa-saidas.service';
import { MesaSaidasController } from './mesa-saidas.controller';

@Module({
  controllers: [MesaSaidasController],
  providers: [MesaSaidasService],
})
export class MesaSaidasModule {}
