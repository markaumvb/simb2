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
import { HistoricoComposicoesService } from './historico-composicoes.service';
import { CreateHistoricoComposicoeDto } from './dto/create-historico-composicoe.dto';
import { UpdateHistoricoComposicoeDto } from './dto/update-historico-composicoe.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HistoricoComposicoeEntity } from './entities/historico-composicoe.entity';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Histórico de composições')
@Controller('historico-composicoes')
export class HistoricoComposicoesController {
  constructor(
    private readonly historicoComposicoesService: HistoricoComposicoesService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiCreatedResponse({ type: HistoricoComposicoeEntity })
  @Post()
  async create(@Body() data: CreateHistoricoComposicoeDto) {
    return new HistoricoComposicoeEntity(
      await this.historicoComposicoesService.create(data),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: HistoricoComposicoeEntity, isArray: true })
  async findAll() {
    const historico = await this.historicoComposicoesService.findAll();
    return historico.map((h) => new HistoricoComposicoeEntity(h));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: HistoricoComposicoeEntity })
  async findOne(@Param('id') id: number) {
    const historico = new HistoricoComposicoeEntity(
      await this.historicoComposicoesService.findOne(id),
    );
    if (!historico) {
      throw new NotFoundException(`Histórico de composição ${id} não existe`);
    }
    return historico;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: HistoricoComposicoeEntity })
  async update(
    @Param('id') id: number,
    @Body() updateHistoricoComposicoeDto: UpdateHistoricoComposicoeDto,
  ) {
    return new HistoricoComposicoeEntity(
      await this.historicoComposicoesService.update(
        id,
        updateHistoricoComposicoeDto,
      ),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: HistoricoComposicoeEntity })
  async remove(@Param('id') id: number) {
    return new HistoricoComposicoeEntity(
      await this.historicoComposicoesService.remove(id),
    );
  }
}
