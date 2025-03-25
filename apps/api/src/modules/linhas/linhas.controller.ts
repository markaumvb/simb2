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
import { LinhasService } from './linhas.service';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LinhaEntity } from './entities/linha.entity';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';

@ApiTags('Linha')
@Controller('linhas')
export class LinhasController {
  constructor(private readonly linhasService: LinhasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: LinhaEntity })
  async create(@Body() createLinhaDto: CreateLinhaDto) {
    return await this.linhasService.create(createLinhaDto);
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: LinhaEntity, isArray: true })
  async findAll() {
    return await this.linhasService.findAll();
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: LinhaEntity })
  async findOne(@Param('id') id: string) {
    const linha = await this.linhasService.findOne(+id);
    if (!linha) {
      throw new NotFoundException(`Cidade ${id} não existe`);
    }
    return linha;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: LinhaEntity })
  async update(
    @Param('id') id: string,
    @Body() updateLinhaDto: UpdateLinhaDto,
  ) {
    return await this.linhasService.update(+id, updateLinhaDto);
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: LinhaEntity })
  async remove(@Param('id') id: string) {
    return await this.linhasService.remove(+id);
  }
}
