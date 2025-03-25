import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ItensPedidoAlmoxarifadosService } from './itens-pedido-almoxarifados.service';
import { CreateItensPedidoAlmoxarifadoDto } from './dto/create-itens-pedido-almoxarifado.dto';
import { UpdateItensPedidoAlmoxarifadoDto } from './dto/update-itens-pedido-almoxarifado.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { ItensPedidoAlmoxarifadoEntity } from './entities/itens-pedido-almoxarifado.entity';

@ApiTags('Itens de pedido do almoxarifado')
@Controller('itens-pedido-almoxarifados')
export class ItensPedidoAlmoxarifadosController {
  constructor(
    private readonly itensPedidoAlmoxarifadosService: ItensPedidoAlmoxarifadosService,
  ) {}

  @ProtectedRoute()
  @ApiCreatedResponse({ type: ItensPedidoAlmoxarifadoEntity })
  @Post()
  async create(@Body() data: CreateItensPedidoAlmoxarifadoDto) {
    return new ItensPedidoAlmoxarifadoEntity(
      await this.itensPedidoAlmoxarifadosService.create(data),
    );
  }

  @ProtectedRoute()
  @ApiOkResponse({ type: ItensPedidoAlmoxarifadoEntity, isArray: true })
  @Get()
  async findAll() {
    const item_pedido = await this.itensPedidoAlmoxarifadosService.findAll();
    item_pedido.map((itens) => new ItensPedidoAlmoxarifadoEntity(itens));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: ItensPedidoAlmoxarifadoEntity })
  async findOne(@Param('id') id: number) {
    const item_pedido = new ItensPedidoAlmoxarifadoEntity(
      await this.itensPedidoAlmoxarifadosService.findOne(id),
    );
    if (!item_pedido) {
      throw new NotFoundException(`Item de pedido: ${id} não existe`);
    }
    return item_pedido;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: ItensPedidoAlmoxarifadoEntity })
  async update(
    @Param('id') id: number,
    @Body() updateItensPedidoAlmoxarifadoDto: UpdateItensPedidoAlmoxarifadoDto,
  ) {
    return new ItensPedidoAlmoxarifadoEntity(
      await this.itensPedidoAlmoxarifadosService.update(
        id,
        updateItensPedidoAlmoxarifadoDto,
      ),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: ItensPedidoAlmoxarifadoEntity })
  async remove(@Param('id') id: number) {
    return new ItensPedidoAlmoxarifadoEntity(
      await this.itensPedidoAlmoxarifadosService.remove(id),
    );
  }
}
