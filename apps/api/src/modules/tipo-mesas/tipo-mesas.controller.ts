import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { TipoMesasService } from './tipo-mesas.service';
import { CreateTipoMesaDto } from './dto/create-tipo-mesa.dto';
import { UpdateTipoMesaDto } from './dto/update-tipo-mesa.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { TipoMesaEntity } from './entities/tipo-mesa.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Tipos de Mesas')
@Controller('tipo-mesas')
export class TipoMesasController {
  constructor(private readonly tipoMesasService: TipoMesasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TipoMesaEntity })
  async create(@Body() createTipoMesaDto: CreateTipoMesaDto) {
    return new TipoMesaEntity(
      await this.tipoMesasService.create(createTipoMesaDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TipoMesaEntity, isArray: true })
  async findAll() {
    const tipo = await this.tipoMesasService.findAll();
    return tipo.map((t) => new TipoMesaEntity(t));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TipoMesaEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tipo = new TipoMesaEntity(await this.tipoMesasService.findOne(id));
    if (!tipo) {
      throw new NotFoundException(`Tipo de Mesa ${id} não existe`);
    }
    return tipo;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TipoMesaEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new TipoMesaEntity(await this.tipoMesasService.remove(id));
  }
}
