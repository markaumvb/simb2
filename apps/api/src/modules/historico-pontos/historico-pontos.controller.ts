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
import { HistoricoPontosService } from './historico-pontos.service';
import { CreateHistoricoPontoDto } from './dto/create-historico-ponto.dto';
import { UpdateHistoricoPontoDto } from './dto/update-historico-ponto.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HistoricoPontoEntity } from './entities/historico-ponto.entity';

@ApiTags('Histórico de Ponto')
@Controller('historico-pontos')
export class HistoricoPontosController {
  constructor(
    private readonly historicoPontosService: HistoricoPontosService,
  ) {}

  /*   @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiCreatedResponse({ type: HistoricoPontoEntity })
  @Post()
  async create(@Body() data: CreateHistoricoPontoDto) {
    return new HistoricoPontoEntity(
      await this.historicoPontosService.create(data),
    );
  } */

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

  /*   @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: HistoricoPontoEntity })
  async update(
    @Param('id') id: number,
    @Body() updateHistoricoPontoDto: UpdateHistoricoPontoDto,
  ) {
    return new HistoricoPontoEntity(
      await this.historicoPontosService.update(id, updateHistoricoPontoDto),
    );
  } */

  /*   @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: HistoricoPontoEntity })
  async remove(@Param('id') id: number) {
    return new HistoricoPontoEntity(
      await this.historicoPontosService.remove(id),
    );
  } */
}
