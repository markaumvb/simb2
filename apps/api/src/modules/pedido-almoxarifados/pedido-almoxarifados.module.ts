import { Module } from '@nestjs/common';
import { PedidoAlmoxarifadosService } from './pedido-almoxarifados.service';
import { PedidoAlmoxarifadosController } from './pedido-almoxarifados.controller';

@Module({
  controllers: [PedidoAlmoxarifadosController],
  providers: [PedidoAlmoxarifadosService]
})
export class PedidoAlmoxarifadosModule {}
