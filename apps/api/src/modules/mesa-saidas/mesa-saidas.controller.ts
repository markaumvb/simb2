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
import { MesaSaidasService } from './mesa-saidas.service';
import { CreateMesaSaidaDto } from './dto/create-mesa-saida.dto';
import { UpdateMesaSaidaDto } from './dto/update-mesa-saida.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { MesaSaidaEntity } from './entities/mesa-saida.entity';

@ApiTags('Saídas de Mesas em pontos')
@Controller('mesa-saidas')
export class MesaSaidasController {
  constructor(private readonly mesaSaidasService: MesaSaidasService) {}

  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaSaidaEntity })
  @Post()
  async create(@Body() data: CreateMesaSaidaDto) {
    return new MesaSaidaEntity(await this.mesaSaidasService.create(data));
  }

  @ProtectedRoute()
  @ApiOkResponse({ type: MesaSaidaEntity, isArray: true })
  @Get()
  async findAll() {
    const mesa = await this.mesaSaidasService.findAll();
    return mesa.map((mes) => new MesaSaidaEntity(mes));
  }

  @ProtectedRoute()
  @ApiOkResponse({ type: MesaSaidaEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const brinde = new MesaSaidaEntity(
      await this.mesaSaidasService.findOne(id),
    );
    if (!brinde) {
      throw new NotFoundException(`Saída de Mesa: ${id} não existe`);
    }
    return brinde;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MesaSaidaEntity })
  async update(@Param('id') id: number, @Body() data: UpdateMesaSaidaDto) {
    return new MesaSaidaEntity(await this.mesaSaidasService.update(id, data));
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: MesaSaidaEntity })
  async remove(@Param('id') id: number) {
    return new MesaSaidaEntity(await this.mesaSaidasService.remove(id));
  }
}
