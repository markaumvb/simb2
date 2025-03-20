import { Module } from '@nestjs/common';
import { FuncaosService } from './funcaos.service';
import { FuncaosController } from './funcaos.controller';

@Module({
  controllers: [FuncaosController],
  providers: [FuncaosService],
})
export class FuncaosModule {}
