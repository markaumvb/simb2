import { PartialType } from '@nestjs/swagger';
import { CreatePedidoAlmoxarifadoDto } from './create-pedido-almoxarifado.dto';

export class UpdatePedidoAlmoxarifadoDto extends PartialType(CreatePedidoAlmoxarifadoDto) {}
