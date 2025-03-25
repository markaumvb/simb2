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
import { HistoricoComposicoesService } from './historico-composicoes.service';
import { CreateHistoricoComposicoeDto } from './dto/create-historico-composicoe.dto';
import { UpdateHistoricoComposicoeDto } from './dto/update-historico-composicoe.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HistoricoComposicoeEntity } from './entities/historico-composicoe.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Histórico de composições')
@Controller('historico-composicoes')
export class HistoricoComposicoesController {
  constructor(
    private readonly historicoComposicoesService: HistoricoComposicoesService,
  ) {}

  @ProtectedRoute()
  @ApiCreatedResponse({ type: HistoricoComposicoeEntity })
  @Post()
  async create(@Body() data: CreateHistoricoComposicoeDto) {
    return new HistoricoComposicoeEntity(
      await this.historicoComposicoesService.create(data),
    );
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: HistoricoComposicoeEntity, isArray: true })
  async findAll() {
    const historico = await this.historicoComposicoesService.findAll();
    return historico.map((h) => new HistoricoComposicoeEntity(h));
  }

  @Get(':id')
  @ProtectedRoute()
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
  @ProtectedRoute()
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
  @ProtectedRoute()
  @ApiCreatedResponse({ type: HistoricoComposicoeEntity })
  async remove(@Param('id') id: number) {
    return new HistoricoComposicoeEntity(
      await this.historicoComposicoesService.remove(id),
    );
  }
}
