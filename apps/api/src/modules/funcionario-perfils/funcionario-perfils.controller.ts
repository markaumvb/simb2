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
import { FuncionarioPerfilsService } from './funcionario-perfils.service';
import { CreateFuncionarioPerfilDto } from './dto/create-funcionario-perfil.dto';
import { UpdateFuncionarioPerfilDto } from './dto/update-funcionario-perfil.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { FuncionarioPerfilEntity } from './entities/funcionario-perfil.entity';

@ApiTags('Perfil de funcionarios/ usuários no sistema')
@Controller('funcionario-perfils')
export class FuncionarioPerfilsController {
  constructor(
    private readonly funcionarioPerfilsService: FuncionarioPerfilsService,
  ) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: FuncionarioPerfilEntity })
  async create(@Body() data: CreateFuncionarioPerfilDto) {
    return new FuncionarioPerfilEntity(
      await this.funcionarioPerfilsService.create(data),
    );
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: FuncionarioPerfilEntity, isArray: true })
  async findAll() {
    const perfil_usuario = await this.funcionarioPerfilsService.findAll();
    return perfil_usuario.map((pf) => new FuncionarioPerfilEntity(pf));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: FuncionarioPerfilEntity })
  async findOne(@Param('id') id: number) {
    const perfil_usuario = new FuncionarioPerfilEntity(
      await this.funcionarioPerfilsService.findOne(id),
    );
    if (!perfil_usuario) {
      throw new NotFoundException(`Perfild e usuário ${id} não existe`);
    }
    return perfil_usuario;
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiCreatedResponse({ type: FuncionarioPerfilEntity })
  async update(
    @Param('id') id: number,
    @Body() updateFuncionarioPerfilDto: UpdateFuncionarioPerfilDto,
  ) {
    return new FuncionarioPerfilEntity(
      await this.funcionarioPerfilsService.update(
        id,
        updateFuncionarioPerfilDto,
      ),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: FuncionarioPerfilEntity })
  async remove(@Param('id') id: number) {
    return new FuncionarioPerfilEntity(
      await this.funcionarioPerfilsService.remove(id),
    );
  }
}
