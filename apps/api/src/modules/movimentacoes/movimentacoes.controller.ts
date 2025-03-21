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
  Query,
} from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { MovimentacoeEntity } from './entities/movimentacoe.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Movimentações por linhas')
@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MovimentacoeEntity })
  async create(@Body() data: CreateMovimentacoeDto) {
    return new MovimentacoeEntity(await this.movimentacoesService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MovimentacoeEntity, isArray: true })
  async findAll() {
    const movimentacao = await this.movimentacoesService.findAll();
    return movimentacao.map((mov) => new MovimentacoeEntity(mov));
  }

  @Get('status') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MovimentacoeEntity, isArray: true })
  async findSituacao(@Query('status') status: boolean) {
    const cliente = await this.movimentacoesService.findSituacao(status);

    return cliente.map((func) => new MovimentacoeEntity(func));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MovimentacoeEntity })
  async findOne(@Param('id') id: number) {
    const movimentacao = new MovimentacoeEntity(
      await this.movimentacoesService.findOne(id),
    );

    if (!movimentacao) {
      throw new NotFoundException(`Movimentação ${id} não existe`);
    }
    return movimentacao;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MovimentacoeEntity })
  async update(
    @Param('id') id: number,
    @Body() updateMovimentacoeDto: UpdateMovimentacoeDto,
  ) {
    return new MovimentacoeEntity(
      await this.movimentacoesService.update(id, updateMovimentacoeDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MovimentacoeEntity })
  async remove(@Param('id') id: number) {
    return new MovimentacoeEntity(await this.movimentacoesService.remove(id));
  }
}
