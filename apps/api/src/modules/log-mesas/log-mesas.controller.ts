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
import { LogMesasService } from './log-mesas.service';
import { CreateLogMesaDto } from './dto/create-log-mesa.dto';
import { UpdateLogMesaDto } from './dto/update-log-mesa.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { LogMesaEntity } from './entities/log-mesa.entity';

@ApiTags('Log de Mesas')
@Controller('log-mesas')
export class LogMesasController {
  constructor(private readonly logMesasService: LogMesasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: LogMesaEntity })
  async create(@Body() data: CreateLogMesaDto) {
    return new LogMesaEntity(await this.logMesasService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: LogMesaEntity, isArray: true })
  async findAll() {
    const log = await this.logMesasService.findAll();
    return log.map((lg) => new LogMesaEntity(lg));
  }

  @Get(':mesa')
  @ProtectedRoute()
  @ApiOkResponse({ type: LogMesaEntity, isArray: true })
  async findMesa(@Query('mesa') mesa: number) {
    const log = await this.logMesasService.findMesa(mesa);
    return log.map((lg) => new LogMesaEntity(lg));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: LogMesaEntity })
  async findOne(@Param('id') id: number) {
    const log = new LogMesaEntity(await this.logMesasService.findOne(id));

    if (!log) {
      throw new NotFoundException(`Log de Mesa ${id} não existe`);
    }
    return log;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: LogMesaEntity })
  async update(
    @Param('id') id: number,
    @Body() updateLogMesaDto: UpdateLogMesaDto,
  ) {
    return new LogMesaEntity(
      await this.logMesasService.update(id, updateLogMesaDto),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: LogMesaEntity })
  async remove(@Param('id') id: number) {
    return new LogMesaEntity(await this.logMesasService.remove(id));
  }
}
