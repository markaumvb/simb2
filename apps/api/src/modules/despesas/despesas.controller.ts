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
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { DespesaEntity } from './entities/despesa.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Despesas')
@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DespesaEntity })
  async create(@Body() data: CreateDespesaDto) {
    return new DespesaEntity(await this.despesasService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DespesaEntity, isArray: true })
  async findAll() {
    const despesa = await this.despesasService.findAll();
    return despesa.map((des) => new DespesaEntity(des));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DespesaEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const despesa = new DespesaEntity(await this.despesasService.findOne(id));

    if (!despesa) {
      throw new NotFoundException(`Despesa ${id} não existe`);
    }
    return despesa;
  }

  @Get(':movimentacao')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DespesaEntity, isArray: true })
  async findbyMovimentacao(@Query('movimentacao') movimentacao: number) {
    const despesa = await this.despesasService.findbyMovimentacao(movimentacao);
    return despesa.map((des) => new DespesaEntity(des));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DespesaEntity })
  async update(
    @Param('id') id: number,
    @Body() updateDespesaDto: UpdateDespesaDto,
  ) {
    return new DespesaEntity(
      await this.despesasService.update(id, updateDespesaDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DespesaEntity })
  async remove(@Param('id') id: number) {
    return new DespesaEntity(await this.despesasService.remove(id));
  }
}
