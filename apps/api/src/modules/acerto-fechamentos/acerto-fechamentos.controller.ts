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
import { AcertoFechamentosService } from './acerto-fechamentos.service';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { AcertoFechamentoEntity } from './entities/acerto-fechamento.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Acerto de fechamento de linha')
@Controller('acerto-fechamentos')
export class AcertoFechamentosController {
  constructor(
    private readonly acertoFechamentosService: AcertoFechamentosService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AcertoFechamentoEntity })
  async create(@Body() data: CreateAcertoFechamentoDto) {
    return new AcertoFechamentoEntity(
      await this.acertoFechamentosService.create(data),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AcertoFechamentoEntity, isArray: true })
  async findAll() {
    const acerto = await this.acertoFechamentosService.findAll();
    return acerto.map((a) => new AcertoFechamentoEntity(a));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AcertoFechamentoEntity })
  async findOne(@Param('id') id: number) {
    const acerto = new AcertoFechamentoEntity(
      await this.acertoFechamentosService.findOne(id),
    );
    if (!acerto) {
      throw new NotFoundException(`O Acerto de ${id} não existe`);
    }
    return acerto;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AcertoFechamentoEntity })
  async update(
    @Param('id') id: number,
    @Body() updateAcertoFechamentoDto: UpdateAcertoFechamentoDto,
  ) {
    return new AcertoFechamentoEntity(
      await this.acertoFechamentosService.update(id, updateAcertoFechamentoDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: AcertoFechamentoEntity })
  async remove(@Param('id') id: number) {
    return new AcertoFechamentoEntity(
      await this.acertoFechamentosService.remove(id),
    );
  }
}
