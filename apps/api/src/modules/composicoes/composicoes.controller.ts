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
import { ComposicoesService } from './composicoes.service';
import { CreateComposicoeDto } from './dto/create-composicoe.dto';
import { UpdateComposicoeDto } from './dto/update-composicoe.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComposicoeEntity } from './entities/composicoe.entity';

@ApiTags('Composições de Gruas')
@Controller('composicoes')
export class ComposicoesController {
  constructor(private readonly composicoesService: ComposicoesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ComposicoeEntity })
  async create(@Body() data: CreateComposicoeDto) {
    return new ComposicoeEntity(await this.composicoesService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComposicoeEntity, isArray: true })
  async findAll() {
    const composicao = await this.composicoesService.findAll();
    return composicao.map((comp) => new ComposicoeEntity(comp));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ComposicoeEntity })
  async findOne(@Param('id') id: number) {
    const mesa = new ComposicoeEntity(
      await this.composicoesService.findOne(id),
    );

    if (!mesa) {
      throw new NotFoundException(`Mesa ${id} não existe`);
    }
    return mesa;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ComposicoeEntity })
  async update(
    @Param('id') id: number,
    @Body() updateComposicoeDto: UpdateComposicoeDto,
  ) {
    return new ComposicoeEntity(
      await this.composicoesService.update(id, updateComposicoeDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComposicoeEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ComposicoeEntity(await this.composicoesService.remove(id));
  }
}
