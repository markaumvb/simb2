import { Module } from '@nestjs/common';
import { PedidoAlmoxarifadosService } from './pedido-almoxarifados.service';
import { PedidoAlmoxarifadosController } from './pedido-almoxarifados.controller';
import { ItensPedidoAlmoxarifadosModule } from '../itens-pedido-almoxarifados/itens-pedido-almoxarifados.module';

@Module({
  imports: [ItensPedidoAlmoxarifadosModule],
  controllers: [PedidoAlmoxarifadosController],
  providers: [PedidoAlmoxarifadosService],
})
export class PedidoAlmoxarifadosModule {}
