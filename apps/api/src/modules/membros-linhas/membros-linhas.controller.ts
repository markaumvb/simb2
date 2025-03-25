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
import { MembrosLinhasService } from './membros-linhas.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMembrosLinhaDto } from './dto/create-membros-linha.dto';
import { UpdateMembrosLinhaDto } from './dto/update-membros-linha.dto';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { MembrosLinhaEntity } from './entities/membros-linha.entity';

@ApiTags('Membros da linha')
@Controller('membros-linhas')
export class MembrosLinhasController {
  constructor(private readonly membrosLinhasService: MembrosLinhasService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: MembrosLinhaEntity })
  async create(@Body() data: CreateMembrosLinhaDto) {
    return new MembrosLinhaEntity(await this.membrosLinhasService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: MembrosLinhaEntity, isArray: true })
  async findAll() {
    const membro = await this.membrosLinhasService.findAll();
    return membro.map((m) => new MembrosLinhaEntity(m));
  }

  @Get(':id')
  @ProtectedRoute()
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
  @ProtectedRoute()
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
  @ProtectedRoute()
  @ApiOkResponse({ type: MembrosLinhaEntity })
  async remove(@Param('id') id: number) {
    return new MembrosLinhaEntity(await this.membrosLinhasService.remove(id));
  }
}
