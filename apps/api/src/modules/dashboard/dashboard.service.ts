import { Injectable, Logger } from '@nestjs/common';
import { PrismaTenantService } from '@app/providers/prisma-tenant.provider';
import { StatusMesa } from '@prisma/client';
import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  endOfDay,
  endOfWeek,
  endOfMonth,
  format,
} from 'date-fns';
import { pt } from 'date-fns/locale';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(private prismaTenant: PrismaTenantService) {}

  /**
   * Obtém os totais de mesas por status
   */
  async getMesasSummary() {
    try {
      // Consultar contagem de mesas por status
      const mesasStats = await this.prismaTenant.prisma.client.$queryRaw`
        SELECT status, COUNT(*) as total 
        FROM "Mesa"
        WHERE tenant_id = ${this.prismaTenant.currentTenantId}
        GROUP BY status
      `;

      // Criar objeto com status explícitos
      const totalsPorStatus = {
        DISPONIVEL: 0,
        OCUPADA: 0,
        MANUTENCAO: 0,
        NO_DEPOSITO: 0,
        total: 0,
      };

      // Preencher com valores do banco
      for (const stat of mesasStats as any[]) {
        totalsPorStatus[stat.status] = Number(stat.total);
        totalsPorStatus.total += Number(stat.total);
      }

      // Total de mesas ativas (disponíveis + ocupadas)
      const mesasAtivas = totalsPorStatus.DISPONIVEL + totalsPorStatus.OCUPADA;

      return {
        ...totalsPorStatus,
        mesasAtivas,
        mesasInativas: totalsPorStatus.MANUTENCAO + totalsPorStatus.NO_DEPOSITO,
      };
    } catch (error) {
      this.logger.error(`Erro ao obter resumo de mesas: ${error.message}`);
      throw error;
    }
  }

  /**
   * Calcula o faturamento para diferentes períodos
   */
  async getFaturamentoSummary() {
    try {
      const hoje = new Date();

      // Definir períodos
      const inicioDia = startOfDay(hoje);
      const fimDia = endOfDay(hoje);

      const inicioSemana = startOfWeek(hoje, { weekStartsOn: 0 }); // Domingo como início da semana
      const fimSemana = endOfWeek(hoje, { weekStartsOn: 0 });

      const inicioMes = startOfMonth(hoje);
      const fimMes = endOfMonth(hoje);

      // Buscar faturamento diário
      const faturamentoDiario = await this.calcularFaturamento(
        inicioDia,
        fimDia,
      );

      // Buscar faturamento semanal
      const faturamentoSemanal = await this.calcularFaturamento(
        inicioSemana,
        fimSemana,
      );

      // Buscar faturamento mensal
      const faturamentoMensal = await this.calcularFaturamento(
        inicioMes,
        fimMes,
      );

      return {
        diario: {
          valor: faturamentoDiario,
          periodo: format(hoje, 'dd/MM/yyyy'),
        },
        semanal: {
          valor: faturamentoSemanal,
          periodo: `${format(inicioSemana, 'dd/MM', { locale: pt })} - ${format(
            fimSemana,
            'dd/MM',
            { locale: pt },
          )}`,
        },
        mensal: {
          valor: faturamentoMensal,
          periodo: format(hoje, 'MMMM/yyyy', { locale: pt }),
        },
      };
    } catch (error) {
      this.logger.error(
        `Erro ao obter resumo de faturamento: ${error.message}`,
      );
      throw error;
    }
  }

  /**
   * Obtém os dados para o gráfico de utilização
   */
  async getUtilizacaoData() {
    try {
      const hoje = new Date();
      const inicioMes = startOfMonth(hoje);

      // Buscar ocupação diária das mesas no mês atual
      const utilizacaoDiaria = await this.prismaTenant.prisma.client.$queryRaw`
        SELECT 
          DATE(data_hora) as data,
          COUNT(DISTINCT id_mesa) as total_mesas_utilizadas
        FROM "Cobranca"
        WHERE 
          tenant_id = ${this.prismaTenant.currentTenantId}
          AND data_hora >= ${inicioMes}
        GROUP BY DATE(data_hora)
        ORDER BY data
      `;

      // Buscar total de mesas disponíveis para ocupação
      const totalMesas = await this.prismaTenant.prisma.client.mesa.count({
        where: {
          tenant_id: this.prismaTenant.currentTenantId,
          status: {
            in: [StatusMesa.DISPONIVEL, StatusMesa.OCUPADA],
          },
        },
      });

      // Formatar dados para o gráfico
      const dadosGrafico = (utilizacaoDiaria as any[]).map((item) => ({
        data: format(new Date(item.data), 'dd/MM'),
        mesasUtilizadas: Number(item.total_mesas_utilizadas),
        taxaOcupacao:
          totalMesas > 0
            ? Math.round(
                (Number(item.total_mesas_utilizadas) / totalMesas) * 100,
              )
            : 0,
      }));

      return {
        dadosGrafico,
        totalMesas,
      };
    } catch (error) {
      this.logger.error(`Erro ao obter dados de utilização: ${error.message}`);
      throw error;
    }
  }

  /**
   * Função auxiliar para calcular faturamento em um período
   */
  private async calcularFaturamento(
    dataInicio: Date,
    dataFim: Date,
  ): Promise<number> {
    try {
      const resultado =
        await this.prismaTenant.prisma.client.cobranca.aggregate({
          where: {
            tenant_id: this.prismaTenant.currentTenantId,
            data_hora: {
              gte: dataInicio,
              lte: dataFim,
            },
          },
          _sum: {
            valor_cobrado: true,
          },
        });

      return Number(resultado._sum.valor_cobrado) || 0;
    } catch (error) {
      this.logger.error(`Erro ao calcular faturamento: ${error.message}`);
      return 0;
    }
  }
}
