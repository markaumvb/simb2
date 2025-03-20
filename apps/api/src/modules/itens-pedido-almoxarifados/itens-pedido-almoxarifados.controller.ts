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
import { ItensPedidoAlmoxarifadosService } from './itens-pedido-almoxarifados.service';
import { CreateItensPedidoAlmoxarifadoDto } from './dto/create-itens-pedido-almoxarifado.dto';
import { UpdateItensPedidoAlmoxarifadoDto } from './dto/update-itens-pedido-almoxarifado.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ItensPedidoAlmoxarifadoEntity } from './entities/itens-pedido-almoxarifado.entity';

@ApiTags('Itens de pedido do almoxarifado')
@Controller('itens-pedido-almoxarifados')
export class ItensPedidoAlmoxarifadosController {
  constructor(
    private readonly itensPedidoAlmoxarifadosService: ItensPedidoAlmoxarifadosService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiCreatedResponse({ type: ItensPedidoAlmoxarifadoEntity })
  @Post()
  async create(@Body() data: CreateItensPedidoAlmoxarifadoDto) {
    return new ItensPedidoAlmoxarifadoEntity(
      await this.itensPedidoAlmoxarifadosService.create(data),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOkResponse({ type: ItensPedidoAlmoxarifadoEntity, isArray: true })
  @Get()
  async findAll() {
    const item_pedido = await this.itensPedidoAlmoxarifadosService.findAll();
    item_pedido.map((itens) => new ItensPedidoAlmoxarifadoEntity(itens));
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOkResponse({ type: ItensPedidoAlmoxarifadoEntity })
  async remove(@Param('id') id: number) {
    return new ItensPedidoAlmoxarifadoEntity(
      await this.itensPedidoAlmoxarifadosService.remove(id),
    );
  }
}
