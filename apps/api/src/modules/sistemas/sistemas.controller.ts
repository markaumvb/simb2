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
import { SistemasService } from './sistemas.service';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SistemaEntity } from './entities/sistema.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
@ApiTags('Sistemas')
@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: SistemaEntity })
  async create(@Body() data: CreateSistemaDto) {
    return new SistemaEntity(await this.sistemasService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: SistemaEntity, isArray: true })
  async findAll() {
    const sistema = await this.sistemasService.findAll();
    return sistema.map((sis) => new SistemaEntity(sis));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: SistemaEntity })
  async findOne(@Param('id') id: number) {
    const sistema = new SistemaEntity(await this.sistemasService.findOne(id));
    if (!sistema) {
      throw new NotFoundException(`Sistema: ${id} não existe`);
    }
    return sistema;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: SistemaEntity })
  async update(@Param('id') id: number, @Body() data: UpdateSistemaDto) {
    return new SistemaEntity(await this.sistemasService.update(id, data));
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: SistemaEntity })
  async remove(@Param('id') id: number) {
    return new SistemaEntity(await this.sistemasService.remove(id));
  }
}
