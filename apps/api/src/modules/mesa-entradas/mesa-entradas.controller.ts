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
import { MesaEntradasService } from './mesa-entradas.service';
import { CreateMesaEntradaDto } from './dto/create-mesa-entrada.dto';
import { UpdateMesaEntradaDto } from './dto/update-mesa-entrada.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MesaEntradaEntity } from './entities/mesa-entrada.entity';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Entradas de Mesas em pontos')
@Controller('mesa-entradas')
export class MesaEntradasController {
  constructor(private readonly mesaEntradasService: MesaEntradasService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiCreatedResponse({ type: MesaEntradaEntity })
  @Post()
  async create(@Body() data: CreateMesaEntradaDto) {
    return new MesaEntradaEntity(await this.mesaEntradasService.create(data));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOkResponse({ type: MesaEntradaEntity, isArray: true })
  @Get()
  async findAll() {
    const mesa = await this.mesaEntradasService.findAll();
    return mesa.map((mes) => new MesaEntradaEntity(mes));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
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
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MesaEntradaEntity })
  async update(@Param('id') id: number, @Body() data: UpdateMesaEntradaDto) {
    return new MesaEntradaEntity(
      await this.mesaEntradasService.update(id, data),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOkResponse({ type: MesaEntradaEntity })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new MesaEntradaEntity(await this.mesaEntradasService.remove(id));
  }
}
