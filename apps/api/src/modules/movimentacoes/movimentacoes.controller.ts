import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { MovimentacoeEntity } from './entities/movimentacoe.entity';

@ApiTags('Movimentações por linhas')
@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MovimentacoeEntity })
  async create(@Body() data: CreateMovimentacoeDto) {
    return new MovimentacoeEntity(await this.movimentacoesService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: MovimentacoeEntity, isArray: true })
  async findAll() {
    const movimentacao = await this.movimentacoesService.findAll();
    return movimentacao.map((mov) => new MovimentacoeEntity(mov));
  }

  @Get('status') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MovimentacoeEntity, isArray: true })
  async findSituacao(@Query('status') status: boolean) {
    const cliente = await this.movimentacoesService.findSituacao(status);

    return cliente.map((func) => new MovimentacoeEntity(func));
  }

  @Get(':id')
  @ProtectedRoute()
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
  @ProtectedRoute()
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
  @ProtectedRoute()
  @ApiOkResponse({ type: MovimentacoeEntity })
  async remove(@Param('id') id: number) {
    return new MovimentacoeEntity(await this.movimentacoesService.remove(id));
  }
}
