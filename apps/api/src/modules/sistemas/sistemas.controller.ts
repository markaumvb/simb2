import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { SistemasService } from './sistemas.service';
import { CreateSistemaDto } from './dto/create-sistema.dto';
import { UpdateSistemaDto } from './dto/update-sistema.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SistemaEntity } from './entities/sistema.entity';

@ApiTags('Sistemas')
@Controller('sistemas')
export class SistemasController {
  constructor(private readonly sistemasService: SistemasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SistemaEntity })
  async create(@Body() data: CreateSistemaDto) {
    return new SistemaEntity(await this.sistemasService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SistemaEntity, isArray: true })
  async findAll() {
    const sistema = await this.sistemasService.findAll();
    return sistema.map((sis) => new SistemaEntity(sis));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SistemaEntity })
  async findOne(@Param('id') id: number) {
    const sistema = new SistemaEntity(await this.sistemasService.findOne(id));
    if (!sistema) {
      throw new NotFoundException(`Sistema: ${id} não existe`);
    }
    return sistema;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SistemaEntity })
  async update(@Param('id') id: number, @Body() data: UpdateSistemaDto) {
    return new SistemaEntity(await this.sistemasService.update(id, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SistemaEntity })
  async remove(@Param('id') id: number) {
    return new SistemaEntity(await this.sistemasService.remove(id));
  }
}
