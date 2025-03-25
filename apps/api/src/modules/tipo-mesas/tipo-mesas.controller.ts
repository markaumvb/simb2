import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { TipoMesasService } from './tipo-mesas.service';
import { CreateTipoMesaDto } from './dto/create-tipo-mesa.dto';
import { UpdateTipoMesaDto } from './dto/update-tipo-mesa.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

import { TipoMesaEntity } from './entities/tipo-mesa.entity';

@ApiTags('Tipos de Mesas')
@Controller('tipo-mesas')
export class TipoMesasController {
  constructor(private readonly tipoMesasService: TipoMesasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: TipoMesaEntity })
  async create(@Body() createTipoMesaDto: CreateTipoMesaDto) {
    return new TipoMesaEntity(
      await this.tipoMesasService.create(createTipoMesaDto),
    );
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: TipoMesaEntity, isArray: true })
  async findAll() {
    const tipo = await this.tipoMesasService.findAll();
    return tipo.map((t) => new TipoMesaEntity(t));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: TipoMesaEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tipo = new TipoMesaEntity(await this.tipoMesasService.findOne(id));
    if (!tipo) {
      throw new NotFoundException(`Tipo de Mesa ${id} não existe`);
    }
    return tipo;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TipoMesaEntity })
  async update(
    @Param('id') id: number,
    @Body() updateTipoMesaDto: UpdateTipoMesaDto,
  ) {
    return new TipoMesaEntity(
      await this.tipoMesasService.update(id, updateTipoMesaDto),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TipoMesaEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new TipoMesaEntity(await this.tipoMesasService.remove(id));
  }
}
