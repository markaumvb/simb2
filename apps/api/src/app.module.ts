import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { CidadesModule } from './modules/cidades/cidades.module';
import { PrismaModule } from './database/prisma.module';
import { LinhasModule } from './modules/linhas/linhas.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { AlmoxarifadosModule } from './modules/almoxarifados/almoxarifados.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { TipoMesasModule } from './modules/tipo-mesas/tipo-mesas.module';
import { MesasModule } from './modules/mesas/mesas.module';
import { FuncaosModule } from './modules/funcaos/funcaos.module';
import { SistemasModule } from './modules/sistemas/sistemas.module';
import { DepositosModule } from './modules/depositos/depositos.module';
import { MovimentacoesModule } from './modules/movimentacoes/movimentacoes.module';
import { AcertoFechamentosModule } from './modules/acerto-fechamentos/acerto-fechamentos.module';
import { BrindesModule } from './modules/brindes/brindes.module';
import { CobrancasModule } from './modules/cobrancas/cobrancas.module';
import { DebitosClientesModule } from './modules/debitos-clientes/debitos-clientes.module';
import { DespesasModule } from './modules/despesas/despesas.module';
import { FuncionarioPerfilsModule } from './modules/funcionario-perfils/funcionario-perfils.module';
import { HistoricoComposicoesModule } from './modules/historico-composicoes/historico-composicoes.module';
import { HistoricoPontosModule } from './modules/historico-pontos/historico-pontos.module';
import { ItensPedidoAlmoxarifadosModule } from './modules/itens-pedido-almoxarifados/itens-pedido-almoxarifados.module';
import { LogMesasModule } from './modules/log-mesas/log-mesas.module';
import { MembrosLinhasModule } from './modules/membros-linhas/membros-linhas.module';
import { MesaEntradasModule } from './modules/mesa-entradas/mesa-entradas.module';
import { MesaSaidasModule } from './modules/mesa-saidas/mesa-saidas.module';
import { PedidoAlmoxarifadosModule } from './modules/pedido-almoxarifados/pedido-almoxarifados.module';
import { PerfilsModule } from './modules/perfils/perfils.module';
import { PontosModule } from './modules/pontos/pontos.module';
import { PontoClientesModule } from './modules/ponto-clientes/ponto-clientes.module';
import { TipoDespesasModule } from './modules/tipo-despesas/tipo-despesas.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PaginationInterceptor } from './interceptors/pagination';
import { ComposicoesModule } from './modules/composicoes/composicoes.module';
import { ItensAcertosModule } from './modules/itens-acertos/itens-acertos.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenantModule } from './modules/tenants/tenant.module';
import { PrismaTenantService } from './providers/prisma-tenant.provider';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaTenantModule } from './providers/prisma-tenant.module';
import { PermissaoUsuariosModule } from './modules/permissao-usuarios/permissao-usuarios.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    HealthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        { ttl: 60, limit: 20 }, // 20 req/min geral
        { ttl: 60, limit: 5, name: 'auth' }, // 5 req/min para auth
      ],
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: 60, // segundos
      }),
    }),

    // Configuração global do ConfigModule para variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
    }),
    PrismaModule,
    AuthModule,

    // Módulos da aplicação
    TenantModule,
    PrismaTenantModule,
    CidadesModule,
    LinhasModule,
    FuncionariosModule,
    AlmoxarifadosModule,
    ClientesModule,
    TipoMesasModule,
    MesasModule,
    FuncaosModule,
    SistemasModule,
    DepositosModule,
    MovimentacoesModule,
    AcertoFechamentosModule,
    BrindesModule,
    CobrancasModule,
    DebitosClientesModule,
    DespesasModule,
    FuncionarioPerfilsModule,
    HistoricoComposicoesModule,
    HistoricoPontosModule,
    ItensPedidoAlmoxarifadosModule,
    LogMesasModule,
    MembrosLinhasModule,
    MesaEntradasModule,
    MesaSaidasModule,
    PedidoAlmoxarifadosModule,
    PerfilsModule,
    PontosModule,
    PontoClientesModule,
    TipoDespesasModule,
    ComposicoesModule,
    ItensAcertosModule,

    PermissaoUsuariosModule,

    // Configuração do CacheModule para melhorar a performance
    CacheModule.register({
      isGlobal: true,
      ttl: 30, // 30 segundos de tempo de cache padrão
    }),
  ],
  controllers: [],
  providers: [
    PrismaTenantService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PaginationInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: 'LOGGER',
      useFactory: () => {
        return new Logger('AppModule');
      },
    },
  ],
  exports: [PrismaTenantService], // Exporta o PrismaTenantService para ser usado em outros módulos
})
export class AppModule implements NestModule {
  private readonly logger = new Logger('AppModule');

  constructor() {
    console.log('🚀 AppModule inicializado');
    console.log('🌎 NODE_ENV:', process.env.NODE_ENV);
    console.log('🔑 SECRETKEY configurada:', !!process.env.SECRETKEY);
  }

  configure(consumer: MiddlewareConsumer) {
    // Aplica o middleware de tenant a todas as rotas
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
