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
import { PontosService } from './pontos.service';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { PontoEntity } from './entities/ponto.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Pontos')
@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PontoEntity })
  async create(@Body() data: CreatePontoDto) {
    return new PontoEntity(await this.pontosService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PontoEntity, isArray: true })
  async findAll() {
    const ponto = await this.pontosService.findAll();
    return ponto.map((p) => new PontoEntity(p));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PontoEntity })
  async findOne(@Param('id') id: number) {
    const ponto = new PontoEntity(await this.pontosService.findOne(id));

    if (!ponto) {
      throw new NotFoundException(`Ponto ${id} não existe`);
    }
    return ponto;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PontoEntity })
  async update(@Param('id') id: number, @Body() data: UpdatePontoDto) {
    return new PontoEntity(await this.pontosService.update(id, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PontoEntity })
  async remove(@Param('id') id: number) {
    return new PontoEntity(await this.pontosService.remove(id));
  }
}
