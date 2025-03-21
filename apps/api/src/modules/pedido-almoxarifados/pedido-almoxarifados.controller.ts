import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { PedidoAlmoxarifadosService } from './pedido-almoxarifados.service';
import { CreatePedidoAlmoxarifadoDto } from './dto/create-pedido-almoxarifado.dto';
import { UpdatePedidoAlmoxarifadoDto } from './dto/update-pedido-almoxarifado.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PedidoAlmoxarifadoEntity } from './entities/pedido-almoxarifado.entity';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Pedidos de almoxarifado')
@Controller('pedido-almoxarifados')
export class PedidoAlmoxarifadosController {
  constructor(
    private readonly pedidoAlmoxarifadosService: PedidoAlmoxarifadosService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PedidoAlmoxarifadoEntity })
  async create(@Body() data: CreatePedidoAlmoxarifadoDto) {
    return new PedidoAlmoxarifadoEntity(
      await this.pedidoAlmoxarifadosService.create(data),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PedidoAlmoxarifadoEntity, isArray: true })
  async findAll() {
    const pedido = await this.pedidoAlmoxarifadosService.findAll();
    return pedido.map((ped) => new PedidoAlmoxarifadoEntity(ped));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PedidoAlmoxarifadoEntity })
  async findOne(@Param('id') id: number) {
    const pedido = new PedidoAlmoxarifadoEntity(
      await this.pedidoAlmoxarifadosService.findOne(id),
    );
    if (!pedido) {
      throw new NotFoundException(
        `Pedido de almoxarifado de Mesa: ${id} não existe`,
      );
    }
    return pedido;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PedidoAlmoxarifadoEntity })
  async update(
    @Param('id') id: number,
    @Body() updatePedidoAlmoxarifadoDto: UpdatePedidoAlmoxarifadoDto,
  ) {
    return new PedidoAlmoxarifadoEntity(
      await this.pedidoAlmoxarifadosService.update(
        id,
        updatePedidoAlmoxarifadoDto,
      ),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOkResponse({ type: PedidoAlmoxarifadoEntity })
  async remove(@Param('id') id: number) {
    return new PedidoAlmoxarifadoEntity(
      await this.pedidoAlmoxarifadosService.remove(id),
    );
  }
}
