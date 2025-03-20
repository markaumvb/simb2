import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { HistoricoPontosService } from './historico-pontos.service';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HistoricoPontoEntity } from './entities/historico-ponto.entity';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Histórico de Ponto')
@Controller('historico-pontos')
export class HistoricoPontosController {
  constructor(
    private readonly historicoPontosService: HistoricoPontosService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: HistoricoPontoEntity, isArray: true })
  async findAll() {
    const historico = await this.historicoPontosService.findAll();
    return historico.map((h) => new HistoricoPontoEntity(h));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
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
