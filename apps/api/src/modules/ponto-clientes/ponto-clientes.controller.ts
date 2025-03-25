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
import { PontoClientesService } from './ponto-clientes.service';
import { CreatePontoClienteDto } from './dto/create-ponto-cliente.dto';
import { UpdatePontoClienteDto } from './dto/update-ponto-cliente.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { PontoClienteEntity } from './entities/ponto-cliente.entity';

@ApiTags('Pontos de Clientes')
@Controller('ponto-clientes')
export class PontoClientesController {
  constructor(private readonly pontoClientesService: PontoClientesService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: PontoClienteEntity })
  async create(@Body() data: CreatePontoClienteDto) {
    return new PontoClienteEntity(await this.pontoClientesService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: PontoClienteEntity, isArray: true })
  async findAll() {
    const pontocliente = await this.pontoClientesService.findAll();
    return pontocliente.map((p) => new PontoClienteEntity(p));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: PontoClienteEntity })
  async findOne(@Param('id') id: number) {
    const pontocliente = new PontoClienteEntity(
      await this.pontoClientesService.findOne(id),
    );

    if (!pontocliente) {
      throw new NotFoundException(`Ponto cliente ${id} não existe`);
    }
    return pontocliente;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: PontoClienteEntity })
  async update(@Param('id') id: number, @Body() data: UpdatePontoClienteDto) {
    return new PontoClienteEntity(
      await this.pontoClientesService.update(id, data),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: PontoClienteEntity })
  async remove(@Param('id') id: number) {
    return new PontoClienteEntity(await this.pontoClientesService.remove(id));
  }
}
