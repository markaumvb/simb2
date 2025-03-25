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
import { BrindesService } from './brindes.service';
import { CreateBrindeDto } from './dto/create-brinde.dto';
import { UpdateBrindeDto } from './dto/update-brinde.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { BrindeEntity } from './entities/brinde.entity';

@ApiTags('Brindes')
@Controller('brindes')
export class BrindesController {
  constructor(private readonly brindesService: BrindesService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: BrindeEntity })
  async create(@Body() data: CreateBrindeDto) {
    return new BrindeEntity(await this.brindesService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: BrindeEntity, isArray: true })
  async findAll() {
    const brinde = await this.brindesService.findAll();
    return brinde.map((b) => new BrindeEntity(b));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: BrindeEntity })
  async findOne(@Param('id') id: number) {
    const brinde = new BrindeEntity(await this.brindesService.findOne(id));
    if (!brinde) {
      throw new NotFoundException(`Brinde: ${id} não existe`);
    }
    return brinde;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: BrindeEntity })
  async update(
    @Param('id') id: number,
    @Body() updateBrindeDto: UpdateBrindeDto,
  ) {
    return new BrindeEntity(
      await this.brindesService.update(id, updateBrindeDto),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: BrindeEntity })
  async remove(@Param('id') id: number) {
    return new BrindeEntity(await this.brindesService.remove(id));
  }
}
