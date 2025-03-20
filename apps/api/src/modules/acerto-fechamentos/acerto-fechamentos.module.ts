import { Module } from '@nestjs/common';
import { AcertoFechamentosService } from './acerto-fechamentos.service';
import { AcertoFechamentosController } from './acerto-fechamentos.controller';

@Module({
  controllers: [AcertoFechamentosController],
  providers: [AcertoFechamentosService],
})
export class AcertoFechamentosModule {}
