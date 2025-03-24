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
import { DebitosClientesService } from './debitos-clientes.service';
import { CreateDebitosClienteDto } from './dto/create-debitos-cliente.dto';
import { UpdateDebitosClienteDto } from './dto/update-debitos-cliente.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { DebitosClienteEntity } from './entities/debitos-cliente.entity';
import { TenantGuard } from '@app/guards/tenant.guard';

@ApiTags('Débitos dos clientes')
@Controller('debitos-clientes')
export class DebitosClientesController {
  constructor(
    private readonly debitosClientesService: DebitosClientesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DebitosClienteEntity })
  async create(@Body() createDebitosClienteDto: CreateDebitosClienteDto) {
    return new DebitosClienteEntity(
      await this.debitosClientesService.create(createDebitosClienteDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DebitosClienteEntity, isArray: true })
  async findAll() {
    const debitos = await this.debitosClientesService.findAll();
    return debitos.map((deb) => new DebitosClienteEntity(deb));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DebitosClienteEntity })
  async findOne(@Param('id') id: number) {
    const debitos = new DebitosClienteEntity(
      await this.debitosClientesService.findOne(id),
    );

    if (!debitos) {
      throw new NotFoundException(`Cliente ${id} não existe`);
    }
    return debitos;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: DebitosClienteEntity })
  async update(
    @Param('id') id: number,
    @Body() updateDebitosClienteDto: UpdateDebitosClienteDto,
  ) {
    return new DebitosClienteEntity(
      await this.debitosClientesService.update(id, updateDebitosClienteDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DebitosClienteEntity })
  async remove(@Param('id') id: number) {
    return new DebitosClienteEntity(
      await this.debitosClientesService.remove(id),
    );
  }
}
