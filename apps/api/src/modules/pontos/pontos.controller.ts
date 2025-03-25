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
import { PontosService } from './pontos.service';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { PontoEntity } from './entities/ponto.entity';

@ApiTags('Pontos')
@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: PontoEntity })
  async create(@Body() data: CreatePontoDto) {
    return new PontoEntity(await this.pontosService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: PontoEntity, isArray: true })
  async findAll() {
    const ponto = await this.pontosService.findAll();
    return ponto.map((p) => new PontoEntity(p));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: PontoEntity })
  async findOne(@Param('id') id: number) {
    const ponto = new PontoEntity(await this.pontosService.findOne(id));

    if (!ponto) {
      throw new NotFoundException(`Ponto ${id} não existe`);
    }
    return ponto;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: PontoEntity })
  async update(@Param('id') id: number, @Body() data: UpdatePontoDto) {
    return new PontoEntity(await this.pontosService.update(id, data));
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: PontoEntity })
  async remove(@Param('id') id: number) {
    return new PontoEntity(await this.pontosService.remove(id));
  }
}
