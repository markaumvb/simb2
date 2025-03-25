import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { HistoricoPontosService } from './historico-pontos.service';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { HistoricoPontoEntity } from './entities/historico-ponto.entity';

@ApiTags('Histórico de Ponto')
@Controller('historico-pontos')
export class HistoricoPontosController {
  constructor(
    private readonly historicoPontosService: HistoricoPontosService,
  ) {}

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: HistoricoPontoEntity, isArray: true })
  async findAll() {
    const historico = await this.historicoPontosService.findAll();
    return historico.map((h) => new HistoricoPontoEntity(h));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: HistoricoPontoEntity })
  async findOne(@Param('id') id: number) {
    const historico = new HistoricoPontoEntity(
      await this.historicoPontosService.findOne(id),
    );

    if (!historico) {
      throw new NotFoundException(`Histórico de Ponto ${id} não existe`);
    }
    return historico;
  }
}
