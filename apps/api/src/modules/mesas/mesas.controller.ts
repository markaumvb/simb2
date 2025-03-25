import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  ParseEnumPipe,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { MesaEntity } from './entities/mesa.entity';

import { StatusMesa } from '@prisma/client';
@ApiTags('Mesas')
@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaEntity })
  async create(@Body() createMesaDto: CreateMesaDto) {
    return new MesaEntity(await this.mesasService.create(createMesaDto));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntity, isArray: true })
  async findAll() {
    const mesa = await this.mesasService.findAll();
    return mesa.map((m) => new MesaEntity(m));
  }

  @Get('linha')
  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntity, isArray: true })
  async findLinha(@Query('linha') linha: number) {
    const mesa = await this.mesasService.findLinha(linha);
    return mesa.map((m) => new MesaEntity(m));
  }

  @Get('ativo')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaEntity, isArray: true })
  async findSituacao(
    @Query('ativo', new ParseEnumPipe(StatusMesa)) status: StatusMesa,
  ) {
    const mesa = await this.mesasService.findStatus(status);
    return mesa.map((m) => new MesaEntity(m));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntity })
  async findOne(@Param('id') id: number) {
    const mesa = new MesaEntity(await this.mesasService.findOne(id));

    if (!mesa) {
      throw new NotFoundException(`Mesa ${id} não existe`);
    }
    return mesa;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaEntity })
  async update(@Param('id') id: number, @Body() updateMesaDto: UpdateMesaDto) {
    return new MesaEntity(await this.mesasService.update(id, updateMesaDto));
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntity })
  async remove(@Param('id') id: number) {
    return new MesaEntity(await this.mesasService.remove(id));
  }
}
