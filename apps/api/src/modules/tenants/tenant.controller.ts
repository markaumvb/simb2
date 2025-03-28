import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { TenantEntity } from './tenant.entity';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ProtectedRoute()
  @ApiCreatedResponse({ type: TenantEntity })
  async create(@Body() createTenantDto: CreateTenantDto) {
    return new TenantEntity(await this.tenantService.create(createTenantDto));
  }

  @Get()
  @ProtectedRoute()
  @ApiOkResponse({ type: TenantEntity, isArray: true })
  async findAll() {
    const tenants = await this.tenantService.findAll();
    return tenants.map((tenant) => new TenantEntity(tenant));
  }

  @Get(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TenantEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tenant = await this.tenantService.findOne(id);
    if (!tenant) {
      throw new NotFoundException(`Tenant com ID ${id} não encontrado`);
    }
    return new TenantEntity(tenant);
  }

  @Patch(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TenantEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return new TenantEntity(
      await this.tenantService.update(id, updateTenantDto),
    );
  }

  @Delete(':id')
  @ProtectedRoute()
  @ApiOkResponse({ type: TenantEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new TenantEntity(await this.tenantService.remove(id));
  }
}
