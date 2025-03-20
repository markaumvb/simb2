import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@ApiTags('Cliente')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ClienteEntity })
  async create(@Body() createClienteDto: CreateClienteDto) {
    return new ClienteEntity(
      await this.clientesService.create(createClienteDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClienteEntity, isArray: true })
  async findAll() {
    const cliente = await this.clientesService.findAll();
    return cliente.map((cli) => new ClienteEntity(cli));
  }

  @Get('ativo') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ClienteEntity, isArray: true })
  async findSituacao(@Query('ativo') ativo: boolean) {
    const cliente = await this.clientesService.findSituacao(ativo);

    return cliente.map((cli) => new ClienteEntity(cli));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ClienteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cliente = new ClienteEntity(await this.clientesService.findOne(id));

    if (!cliente) {
      throw new NotFoundException(`Cliente ${id} não existe`);
    }
    return cliente;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClienteEntity })
  async update(
    @Param('id') id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return new ClienteEntity(
      await this.clientesService.update(id, updateClienteDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ClienteEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ClienteEntity(await this.clientesService.remove(id));
  }
}
