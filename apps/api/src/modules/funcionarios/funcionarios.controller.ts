import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FuncionarioEntity } from './entities/funcionario.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Funcionario')
@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Post()
  @ApiCreatedResponse({ type: FuncionarioEntity })
  async create(@Body() data: CreateFuncionarioDto) {
    return new FuncionarioEntity(await this.funcionariosService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: FuncionarioEntity, isArray: true })
  async findAll() {
    const funcionario = await this.funcionariosService.findAll();
    return funcionario.map((func) => new FuncionarioEntity(func));
  }

  @Get('ativo') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @ProtectedRoute()
  @ApiCreatedResponse({ type: FuncionarioEntity, isArray: true })
  async findSituacao(@Query('ativo') ativo: boolean) {
    const cliente = await this.funcionariosService.findSituacao(ativo);

    return cliente.map((func) => new FuncionarioEntity(func));
  }

  @Get('email') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @ProtectedRoute()
  @ApiCreatedResponse({ type: FuncionarioEntity, isArray: true })
  async findEmail(@Query('email') email: string) {
    const cliente = await this.funcionariosService.findEmail(email);

    return cliente.map((func) => new FuncionarioEntity(func));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: FuncionarioEntity })
  async findOne(@Param('id') id: number) {
    const funcionario = new FuncionarioEntity(
      await this.funcionariosService.findOne(id),
    );
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID: ${id} não existe`);
    }
    return funcionario;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: FuncionarioEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return new FuncionarioEntity(
      await this.funcionariosService.update(id, updateFuncionarioDto),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: FuncionarioEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new FuncionarioEntity(await this.funcionariosService.remove(id));
  }
}
