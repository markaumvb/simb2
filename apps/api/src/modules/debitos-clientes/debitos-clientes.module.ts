import { Module } from '@nestjs/common';
import { DebitosClientesService } from './debitos-clientes.service';
import { DebitosClientesController } from './debitos-clientes.controller';

@Module({
  controllers: [DebitosClientesController],
  providers: [DebitosClientesService]
})
export class DebitosClientesModule {}
