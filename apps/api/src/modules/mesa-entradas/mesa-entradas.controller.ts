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
import { MesaEntradasService } from './mesa-entradas.service';
import { CreateMesaEntradaDto } from './dto/create-mesa-entrada.dto';
import { UpdateMesaEntradaDto } from './dto/update-mesa-entrada.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { MesaEntradaEntity } from './entities/mesa-entrada.entity';

@ApiTags('Entradas de Mesas em pontos')
@Controller('mesa-entradas')
export class MesaEntradasController {
  constructor(private readonly mesaEntradasService: MesaEntradasService) {}

  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaEntradaEntity })
  @Post()
  async create(@Body() data: CreateMesaEntradaDto) {
    return new MesaEntradaEntity(await this.mesaEntradasService.create(data));
  }

  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntradaEntity, isArray: true })
  @Get()
  async findAll() {
    const mesa = await this.mesaEntradasService.findAll();
    return mesa.map((mes) => new MesaEntradaEntity(mes));
  }

  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntradaEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const brinde = new MesaEntradaEntity(
      await this.mesaEntradasService.findOne(id),
    );
    if (!brinde) {
      throw new NotFoundException(`Entrada de Mesa: ${id} não existe`);
    }
    return brinde;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaEntradaEntity })
  async update(@Param('id') id: number, @Body() data: UpdateMesaEntradaDto) {
    return new MesaEntradaEntity(
      await this.mesaEntradasService.update(id, data),
    );
  }

  @ProtectedRoute()
  @ApiOkResponse({ type: MesaEntradaEntity })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new MesaEntradaEntity(await this.mesaEntradasService.remove(id));
  }
}
