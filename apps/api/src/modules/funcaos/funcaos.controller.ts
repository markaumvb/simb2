import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FuncaosService } from './funcaos.service';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FuncaoEntity } from './entities/funcao.entity';

@ApiTags('Funções de usuários')
@Controller('funcaos')
export class FuncaosController {
  constructor(private readonly funcaosService: FuncaosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FuncaoEntity })
  async create(@Body() createFuncaoDto: CreateFuncaoDto) {
    return new FuncaoEntity(await this.funcaosService.create(createFuncaoDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FuncaoEntity, isArray: true })
  async findAll() {
    const funcao = await this.funcaosService.findAll();
    return funcao.map((fun) => new FuncaoEntity(fun));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FuncaoEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const funcao = new FuncaoEntity(await this.funcaosService.findOne(id));
    if (!funcao) {
      throw new NotFoundException(`Função: ${id} não existe`);
    }
    return funcao;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FuncaoEntity })
  async update(
    @Param('id') id: number,
    @Body() updateFuncaoDto: UpdateFuncaoDto,
  ) {
    return new FuncaoEntity(
      await this.funcaosService.update(id, updateFuncaoDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: FuncaoEntity })
  async remove(@Param('id') id: number) {
    return new FuncaoEntity(await this.funcaosService.remove(id));
  }
}
