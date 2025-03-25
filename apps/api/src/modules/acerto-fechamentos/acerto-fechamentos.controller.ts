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
import { AcertoFechamentosService } from './acerto-fechamentos.service';
import { CreateAcertoFechamentoDto } from './dto/create-acerto-fechamento.dto';
import { UpdateAcertoFechamentoDto } from './dto/update-acerto-fechamento.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AcertoFechamentoEntity } from './entities/acerto-fechamento.entity';

import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Acerto de fechamento de linha')
@Controller('acerto-fechamentos')
export class AcertoFechamentosController {
  constructor(
    private readonly acertoFechamentosService: AcertoFechamentosService,
  ) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: AcertoFechamentoEntity })
  async create(@Body() data: CreateAcertoFechamentoDto) {
    return new AcertoFechamentoEntity(
      await this.acertoFechamentosService.create(data),
    );
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: AcertoFechamentoEntity, isArray: true })
  async findAll() {
    const acerto = await this.acertoFechamentosService.findAll();
    return acerto.map((a) => new AcertoFechamentoEntity(a));
  }

  @Get(':id')
  @ProtectedRoute()
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
  @ProtectedRoute()
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
  @ProtectedRoute()
  @ApiOkResponse({ type: AcertoFechamentoEntity })
  async remove(@Param('id') id: number) {
    return new AcertoFechamentoEntity(
      await this.acertoFechamentosService.remove(id),
    );
  }
}
