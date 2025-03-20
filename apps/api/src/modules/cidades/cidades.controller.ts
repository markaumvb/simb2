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
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CidadeEntity } from './entities/cidade.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Cidade')
@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CidadeEntity })
  async create(@Body() createCidadeDto: CreateCidadeDto) {
    return new CidadeEntity(await this.cidadesService.create(createCidadeDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CidadeEntity, isArray: true })
  async findAll() {
    return await this.cidadesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CidadeEntity })
  async findOne(@Param('id') id: string) {
    const cidade = await this.cidadesService.findOne(+id);
    if (!cidade) {
      throw new NotFoundException(`Cidade ${id} não existe`);
    }
    return cidade;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CidadeEntity })
  async update(
    @Param('id') id: number,
    @Body() updateCidadeDto: UpdateCidadeDto,
  ) {
    return await this.cidadesService.update(id, updateCidadeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CidadeEntity })
  async remove(@Param('id') id: number) {
    return new CidadeEntity(await this.cidadesService.remove(id));
  }
}
