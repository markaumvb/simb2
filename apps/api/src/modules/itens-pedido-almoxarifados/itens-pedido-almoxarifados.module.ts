import { Module } from '@nestjs/common';
import { ItensPedidoAlmoxarifadosService } from './itens-pedido-almoxarifados.service';
import { ItensPedidoAlmoxarifadosController } from './itens-pedido-almoxarifados.controller';

@Module({
  controllers: [ItensPedidoAlmoxarifadosController],
  providers: [ItensPedidoAlmoxarifadosService]
})
export class ItensPedidoAlmoxarifadosModule {}
