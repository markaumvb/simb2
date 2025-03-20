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
import { PerfilsService } from './perfils.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PerfilEntity } from './entities/perfil.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Perfil para usuários')
@Controller('perfils')
export class PerfilsController {
  constructor(private readonly perfilsService: PerfilsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PerfilEntity })
  async create(@Body() data: CreatePerfilDto) {
    return new PerfilEntity(await this.perfilsService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PerfilEntity, isArray: true })
  async findAll() {
    const mesa = await this.perfilsService.findAll();
    return mesa.map((m) => new PerfilEntity(m));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PerfilEntity })
  async findOne(@Param('id') id: number) {
    const mesa = new PerfilEntity(await this.perfilsService.findOne(id));

    if (!mesa) {
      throw new NotFoundException(`Mesa ${id} não existe`);
    }
    return mesa;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PerfilEntity })
  async update(
    @Param('id') id: number,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ) {
    return new PerfilEntity(
      await this.perfilsService.update(id, updatePerfilDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PerfilEntity })
  async remove(@Param('id') id: number) {
    return new PerfilEntity(await this.perfilsService.remove(id));
  }
}
