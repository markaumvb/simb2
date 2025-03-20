import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CobrancasService } from './cobrancas.service';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { UpdateCobrancaDto } from './dto/update-cobranca.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CobrancaEntitity } from './entities/cobranca.entity';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Cobranças')
@Controller('cobrancas')
export class CobrancasController {
  constructor(private readonly cobrancasService: CobrancasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CobrancaEntitity })
  async create(@Body() data: CreateCobrancaDto) {
    return new CobrancaEntitity(await this.cobrancasService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CobrancaEntitity, isArray: true })
  async findAll() {
    const cobranca = await this.cobrancasService.findAll();
    return cobranca.map((c) => new CobrancaEntitity(c));
  }

  @Get(':mesa')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CobrancaEntitity })
  async findCobrancaMesa(@Param('mesa') mesa: number) {
    const cobrancaMesa = await this.cobrancasService.findCobrancaMesa(mesa);
    return cobrancaMesa.map((cm) => new CobrancaEntitity(cm));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CobrancaEntitity })
  async findOne(@Param('id') id: number) {
    const cobranca = new CobrancaEntitity(
      await this.cobrancasService.findOne(id),
    );
    if (!cobranca) {
      throw new NotFoundException(`Cobrança ${id} não existe`);
    }
    return cobranca;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CobrancaEntitity })
  async update(
    @Param('id') id: number,
    @Body() updateCobrancaDto: UpdateCobrancaDto,
  ) {
    return new CobrancaEntitity(
      await this.cobrancasService.update(id, updateCobrancaDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CobrancaEntitity })
  async remove(@Param('id') id: number) {
    return new CobrancaEntitity(await this.cobrancasService.remove(id));
  }
}
