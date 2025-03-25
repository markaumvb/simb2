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
import { DepositosService } from './depositos.service';
import { CreateDepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { DepositoEntity } from './entities/deposito.entity';

@ApiTags('Depósitos')
@Controller('depositos')
export class DepositosController {
  constructor(private readonly depositosService: DepositosService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: DepositoEntity })
  async create(@Body() data: CreateDepositoDto) {
    return new DepositoEntity(await this.depositosService.create(data));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: DepositoEntity, isArray: true })
  async findAll() {
    const deposito = await this.depositosService.findAll();
    return deposito.map((d) => new DepositoEntity(d));
  }

  @Get(':id')
  @ProtectedRoute()
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
  @ProtectedRoute()
  @ApiOkResponse({ type: DepositoEntity })
  async update(@Param('id') id: number, @Body() data: UpdateDepositoDto) {
    return new DepositoEntity(await this.depositosService.update(id, data));
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: DepositoEntity })
  async remove(@Param('id') id: number) {
    return new DepositoEntity(await this.depositosService.remove(id));
  }
}
