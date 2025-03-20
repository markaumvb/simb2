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
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MesaEntity } from './entities/mesa.entity';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Mesas')
@Controller('mesas')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MesaEntity })
  async create(@Body() createMesaDto: CreateMesaDto) {
    return new MesaEntity(await this.mesasService.create(createMesaDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MesaEntity, isArray: true })
  async findAll() {
    const mesa = await this.mesasService.findAll();
    return mesa.map((m) => new MesaEntity(m));
  }

  @Get('linha')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MesaEntity, isArray: true })
  async findLinha(@Query('linha') linha: number) {
    const mesa = await this.mesasService.findLinha(linha);
    return mesa.map((m) => new MesaEntity(m));
  }

  @Get('ativo') //as rotas sem parametros como o get, get por id, devem ser inseridas após as rotas sem parametros
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MesaEntity, isArray: true })
  async findSituacao(@Query('ativo') ativo: string) {
    const cliente = await this.mesasService.findStatus(ativo);

    return cliente.map((mes) => new MesaEntity(mes));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MesaEntity })
  async findOne(@Param('id') id: number) {
    const mesa = new MesaEntity(await this.mesasService.findOne(id));

    if (!mesa) {
      throw new NotFoundException(`Mesa ${id} não existe`);
    }
    return mesa;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MesaEntity })
  async update(@Param('id') id: number, @Body() updateMesaDto: UpdateMesaDto) {
    return new MesaEntity(await this.mesasService.update(id, updateMesaDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MesaEntity })
  async remove(@Param('id') id: number) {
    return new MesaEntity(await this.mesasService.remove(id));
  }
}
