import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { ProtectedRoute } from '@app/decorators/protected-route.decorator';
import { DashboardSummaryEntity } from './entities/dashboard-summary.entity';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);

  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ProtectedRoute()
  @ApiOkResponse({
    description: 'Resumo do dashboard',
    type: DashboardSummaryEntity,
  })
  async getSummary() {
    this.logger.log('Obtendo resumo do dashboard');

    // Buscar dados em paralelo para otimizar performance
    const [mesasSummary, faturamentoSummary, utilizacaoData] =
      await Promise.all([
        this.dashboardService.getMesasSummary(),
        this.dashboardService.getFaturamentoSummary(),
        this.dashboardService.getUtilizacaoData(),
      ]);

    return {
      mesas: mesasSummary,
      faturamento: faturamentoSummary,
      utilizacao: utilizacaoData,
    };
  }

  @Get('mesas')
  @ProtectedRoute()
  async getMesasSummary() {
    return this.dashboardService.getMesasSummary();
  }

  @Get('faturamento')
  @ProtectedRoute()
  async getFaturamentoSummary() {
    return this.dashboardService.getFaturamentoSummary();
  }

  @Get('utilizacao')
  @ProtectedRoute()
  async getUtilizacaoData() {
    return this.dashboardService.getUtilizacaoData();
  }
}
