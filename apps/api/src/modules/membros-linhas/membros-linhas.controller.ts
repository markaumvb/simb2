import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { MembrosLinhasService } from './membros-linhas.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMembrosLinhaDto } from './dto/create-membros-linha.dto';
import { UpdateMembrosLinhaDto } from './dto/update-membros-linha.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { MembrosLinhaEntity } from './entities/membros-linha.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Membros da linha')
@Controller('membros-linhas')
export class MembrosLinhasController {
  constructor(private readonly membrosLinhasService: MembrosLinhasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MembrosLinhaEntity })
  async create(@Body() data: CreateMembrosLinhaDto) {
    return new MembrosLinhaEntity(await this.membrosLinhasService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MembrosLinhaEntity, isArray: true })
  async findAll() {
    const membro = await this.membrosLinhasService.findAll();
    return membro.map((m) => new MembrosLinhaEntity(m));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MembrosLinhaEntity })
  async findOne(@Param('id') id: number) {
    const membro = new MembrosLinhaEntity(
      await this.membrosLinhasService.findOne(id),
    );

    if (!membro) {
      throw new NotFoundException(`Membro da linha ${id} não existe`);
    }
    return membro;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: MembrosLinhaEntity })
  async update(
    @Param('id') id: number,
    @Body() updateMembrosLinhaDto: UpdateMembrosLinhaDto,
  ) {
    return new MembrosLinhaEntity(
      await this.membrosLinhasService.update(id, updateMembrosLinhaDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: MembrosLinhaEntity })
  async remove(@Param('id') id: number) {
    return new MembrosLinhaEntity(await this.membrosLinhasService.remove(id));
  }
}
