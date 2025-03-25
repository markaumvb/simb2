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
import { TipoDespesasService } from './tipo-despesas.service';
import { CreateTipoDespesaDto } from './dto/create-tipo-despesa.dto';
import { UpdateTipoDespesaDto } from './dto/update-tipo-despesa.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { TipoDespesaEntity } from './entities/tipo-despesa.entity';

@ApiTags('Tipos de despesas')
@Controller('tipo-despesas')
export class TipoDespesasController {
  constructor(private readonly tipoDespesasService: TipoDespesasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: TipoDespesaEntity })
  async create(@Body() data: CreateTipoDespesaDto) {
    return new TipoDespesaEntity(await this.tipoDespesasService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: TipoDespesaEntity, isArray: true })
  async findAll() {
    const ponto = await this.tipoDespesasService.findAll();
    return ponto.map((p) => new TipoDespesaEntity(p));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TipoDespesaEntity })
  async findOne(@Param('id') id: number) {
    const ponto = new TipoDespesaEntity(
      await this.tipoDespesasService.findOne(id),
    );

    if (!ponto) {
      throw new NotFoundException(`Ponto ${id} não existe`);
    }
    return ponto;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: TipoDespesaEntity })
  async update(@Param('id') id: number, @Body() data: UpdateTipoDespesaDto) {
    return new TipoDespesaEntity(
      await this.tipoDespesasService.update(id, data),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TipoDespesaEntity })
  async remove(@Param('id') id: number) {
    return new TipoDespesaEntity(await this.tipoDespesasService.remove(id));
  }
}
