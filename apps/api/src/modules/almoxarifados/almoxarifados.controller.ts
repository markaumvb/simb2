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
} from '@nestjs/common';
import { AlmoxarifadosService } from './almoxarifados.service';
import { CreateAlmoxarifadoDto } from './dto/create-almoxarifado.dto';
import { UpdateAlmoxarifadoDto } from './dto/update-almoxarifado.dto';
import { AlmoxarifadoEntity } from './entities/almoxarifado.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Almoxarifado')
@Controller('almoxarifados')
export class AlmoxarifadosController {
  constructor(private readonly almoxarifadosService: AlmoxarifadosService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: AlmoxarifadoEntity })
  async create(@Body() createAlmoxarifadoDto: CreateAlmoxarifadoDto) {
    return new AlmoxarifadoEntity(
      await this.almoxarifadosService.create(createAlmoxarifadoDto),
    );
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: AlmoxarifadoEntity, isArray: true })
  async findAll() {
    const almoxarifado = await this.almoxarifadosService.findAll();
    return almoxarifado.map((almo) => new AlmoxarifadoEntity(almo));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: AlmoxarifadoEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const almoxarifado = new AlmoxarifadoEntity(
      await this.almoxarifadosService.findOne(id),
    );

    if (!almoxarifado) {
      throw new NotFoundException(`Almoxarifado ${id} não existe`);
    }
    return almoxarifado;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: AlmoxarifadoEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlmoxarifadoDto: UpdateAlmoxarifadoDto,
  ) {
    return new AlmoxarifadoEntity(
      await this.almoxarifadosService.update(id, updateAlmoxarifadoDto),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: AlmoxarifadoEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new AlmoxarifadoEntity(await this.almoxarifadosService.remove(id));
  }
}
