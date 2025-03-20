import { PartialType } from '@nestjs/swagger';
import { CreateItensPedidoAlmoxarifadoDto } from './create-itens-pedido-almoxarifado.dto';

export class UpdateItensPedidoAlmoxarifadoDto extends PartialType(CreateItensPedidoAlmoxarifadoDto) {}
