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
import { DepositosService } from './depositos.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DepositoEntity } from './entities/deposito.entity';
import { TenantGuard } from 'src/guards/tenant.guard';

@ApiTags('Depósitos')
@Controller('depositos')
export class DepositosController {
  constructor(private readonly depositosService: DepositosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DepositoEntity })
  async create(@Body() data: CreateDepositoDto) {
    return new DepositoEntity(await this.depositosService.create(data));
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DepositoEntity, isArray: true })
  async findAll() {
    const deposito = await this.depositosService.findAll();
    return deposito.map((d) => new DepositoEntity(d));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DepositoEntity })
  async findOne(@Param('id') id: number) {
    const deposito = new DepositoEntity(
      await this.depositosService.findOne(id),
    );
    if (!deposito) {
      throw new NotFoundException(`Depósito: ${id} não existe`);
    }
    return deposito;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DepositoEntity })
  async update(@Param('id') id: number, @Body() data: UpdateDepositoDto) {
    return new DepositoEntity(await this.depositosService.update(id, data));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DepositoEntity })
  async remove(@Param('id') id: number) {
    return new DepositoEntity(await this.depositosService.remove(id));
  }
}
