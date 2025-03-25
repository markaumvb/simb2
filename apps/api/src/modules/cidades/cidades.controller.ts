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
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CidadeEntity } from './entities/cidade.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Cidade')
@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: CidadeEntity })
  async create(@Body() createCidadeDto: CreateCidadeDto) {
    return new CidadeEntity(await this.cidadesService.create(createCidadeDto));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: CidadeEntity, isArray: true })
  async findAll() {
    return await this.cidadesService.findAll();
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: CidadeEntity })
  async findOne(@Param('id') id: string) {
    const cidade = await this.cidadesService.findOne(+id);
    if (!cidade) {
      throw new NotFoundException(`Cidade ${id} não existe`);
    }
    return cidade;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: CidadeEntity })
  async update(
    @Param('id') id: number,
    @Body() updateCidadeDto: UpdateCidadeDto,
  ) {
    return await this.cidadesService.update(id, updateCidadeDto);
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: CidadeEntity })
  async remove(@Param('id') id: number) {
    return new CidadeEntity(await this.cidadesService.remove(id));
  }
}
