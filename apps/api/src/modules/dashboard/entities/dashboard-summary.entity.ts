import { ApiProperty } from '@nestjs/swagger';

class MesasSummaryEntity {
  @ApiProperty({ description: 'Total de mesas disponíveis' })
  DISPONIVEL: number;

  @ApiProperty({ description: 'Total de mesas ocupadas' })
  OCUPADA: number;

  @ApiProperty({ description: 'Total de mesas em manutenção' })
  MANUTENCAO: number;

  @ApiProperty({ description: 'Total de mesas no depósito' })
  NO_DEPOSITO: number;

  @ApiProperty({ description: 'Total geral de mesas' })
  total: number;

  @ApiProperty({
    description: 'Total de mesas ativas (disponíveis + ocupadas)',
  })
  mesasAtivas: number;

  @ApiProperty({
    description: 'Total de mesas inativas (manutenção + depósito)',
  })
  mesasInativas: number;
}

class PeriodoFaturamentoEntity {
  @ApiProperty({ description: 'Valor do faturamento no período' })
  valor: number;

  @ApiProperty({ description: 'Descrição do período' })
  periodo: string;
}

class FaturamentoSummaryEntity {
  @ApiProperty({ type: PeriodoFaturamentoEntity })
  diario: PeriodoFaturamentoEntity;

  @ApiProperty({ type: PeriodoFaturamentoEntity })
  semanal: PeriodoFaturamentoEntity;

  @ApiProperty({ type: PeriodoFaturamentoEntity })
  mensal: PeriodoFaturamentoEntity;
}

class UtilizacaoDiariaEntity {
  @ApiProperty({ description: 'Data no formato DD/MM' })
  data: string;

  @ApiProperty({ description: 'Número de mesas utilizadas no dia' })
  mesasUtilizadas: number;

  @ApiProperty({ description: 'Taxa de ocupação (%)' })
  taxaOcupacao: number;
}

class UtilizacaoDataEntity {
  @ApiProperty({ type: [UtilizacaoDiariaEntity] })
  dadosGrafico: UtilizacaoDiariaEntity[];

  @ApiProperty({ description: 'Total de mesas disponíveis para ocupação' })
  totalMesas: number;
}

export class DashboardSummaryEntity {
  @ApiProperty({ type: MesasSummaryEntity })
  mesas: MesasSummaryEntity;

  @ApiProperty({ type: FaturamentoSummaryEntity })
  faturamento: FaturamentoSummaryEntity;

  @ApiProperty({ type: UtilizacaoDataEntity })
  utilizacao: UtilizacaoDataEntity;
}
