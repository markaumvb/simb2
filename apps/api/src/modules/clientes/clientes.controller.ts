import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Cliente')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: ClienteEntity })
  async create(@Body() createClienteDto: CreateClienteDto) {
    return new ClienteEntity(
      await this.clientesService.create(createClienteDto),
    );
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: ClienteEntity, isArray: true })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const result = await this.clientesService.findAll(page, limit);
    return {
      data: result.data.map((c) => new ClienteEntity(c)),
      meta: result.meta,
    };
  }

  @Get('ativo') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @ProtectedRoute()
  @ApiCreatedResponse({ type: ClienteEntity, isArray: true })
  async findSituacao(@Query('ativo') ativo: boolean) {
    const cliente = await this.clientesService.findSituacao(ativo);

    return cliente.map((cli) => new ClienteEntity(cli));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: ClienteEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cliente = new ClienteEntity(await this.clientesService.findOne(id));

    if (!cliente) {
      throw new NotFoundException(`Cliente ${id} não existe`);
    }
    return cliente;
  }

  @Patch(':id')
  @ProtectedRoute()
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
  @ProtectedRoute()
  @ApiOkResponse({ type: ClienteEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ClienteEntity(await this.clientesService.remove(id));
  }
}
