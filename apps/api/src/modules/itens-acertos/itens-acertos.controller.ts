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
import { ItensAcertosService } from './itens-acertos.service';
import { CreateItensAcertoDto } from './dto/create-itens-acerto.dto';
import { UpdateItensAcertoDto } from './dto/update-itens-acerto.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItensAcertoEntity } from './entities/itens-acerto.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Itens de Acertos')
@Controller('itens-acertos')
export class ItensAcertosController {
  constructor(private readonly itensAcertosService: ItensAcertosService) {}

  @Post()
  @ApiCreatedResponse({ type: ItensAcertoEntity })
  @ProtectedRoute()
  async create(@Body() data: CreateItensAcertoDto) {
    return new ItensAcertoEntity(await this.itensAcertosService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: ItensAcertoEntity, isArray: true })
  async findAll() {
    const itens = await this.itensAcertosService.findAll();
    return itens.map((i) => new ItensAcertoEntity(i));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: ItensAcertoEntity })
  async findOne(@Param('id') id: number) {
    const itens = new ItensAcertoEntity(
      await this.itensAcertosService.findOne(id),
    );
    if (!itens) {
      throw new NotFoundException(`Item de acerto ${id} não existe`);
    }
    return itens;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: ItensAcertoEntity })
  async update(
    @Param('id') id: number,
    @Body() updateItensAcertoDto: UpdateItensAcertoDto,
  ) {
    return new ItensAcertoEntity(
      await this.itensAcertosService.update(id, updateItensAcertoDto),
    );
  }
  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: ItensAcertoEntity })
  async remove(@Param('id') id: number) {
    return new ItensAcertoEntity(await this.itensAcertosService.remove(id));
  }
}
