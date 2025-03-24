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
import { PermissaoUsuariosService } from './permissao-usuarios.service';
import { CreatePermissaoUsuarioDto } from './dto/create-permissao-usuario.dto';
import { UpdatePermissaoUsuarioDto } from './dto/update-permissao-usuario.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PermissaoUsuarioEntity } from './entities/permissao-usuario.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Permissões de usuários nos sistemas')
@Controller('permissao-usuarios')
export class PermissaoUsuariosController {
  constructor(
    private readonly permissaoUsuariosService: PermissaoUsuariosService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PermissaoUsuarioEntity })
  async create(@Body() data: CreatePermissaoUsuarioDto) {
    return new PermissaoUsuarioEntity(
      await this.permissaoUsuariosService.create(data),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PermissaoUsuarioEntity, isArray: true })
  async findAll() {
    const permissao = await this.permissaoUsuariosService.findAll();
    return permissao.map((per) => new PermissaoUsuarioEntity(per));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PermissaoUsuarioEntity })
  async findOne(@Param('id') id: number) {
    const permissao = new PermissaoUsuarioEntity(
      await this.permissaoUsuariosService.findOne(id),
    );
    if (!permissao) {
      throw new NotFoundException(`Permissão de usuário: ${id} não existe`);
    }
    return permissao;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PermissaoUsuarioEntity })
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePermissaoUsuarioDto,
  ) {
    return new PermissaoUsuarioEntity(
      await this.permissaoUsuariosService.update(id, data),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PermissaoUsuarioEntity })
  async remove(@Param('id') id: number) {
    return new PermissaoUsuarioEntity(
      await this.permissaoUsuariosService.remove(id),
    );
  }
}
