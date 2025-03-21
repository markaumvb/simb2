import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CidadesModule } from './modules/cidades/cidades.module';
import { PrismaModule } from './database/prisma.module';
import { LinhasModule } from './modules/linhas/linhas.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { AlmoxarifadosModule } from './modules/almoxarifados/almoxarifados.module';
import { AuthModule } from './auth/auth.module';
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
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TenantModule } from './modules/tenants/tenant.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { PrismaTenantService } from './providers/prisma-tenant.provider';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaTenantModule } from './providers/prisma-tenant.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 100,
        },
      ],
    }) as any,

    // Configuração global do ConfigModule para variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Módulo do Prisma para acesso ao banco de dados
    PrismaModule,

    // Configuração do JwtModule para autenticação
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),

    // Configuração do CacheModule para melhorar a performance
    CacheModule.register({
      isGlobal: true,
      ttl: 30, // 30 segundos de tempo de cache padrão
    }),

    // Módulos da aplicação
    TenantModule,
    AuthModule,
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
    PrismaTenantModule,
  ],
  controllers: [],
  providers: [
    // Service de tenant do Prisma
    PrismaTenantService,

    // Interceptor de cache global
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },

    // Interceptor de paginação global
    {
      provide: APP_INTERCEPTOR,
      useClass: PaginationInterceptor,
    },

    // Guard para rate limiting global
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PrismaTenantService], // Exporta o PrismaTenantService para ser usado em outros módulos
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Aplica o middleware de tenant a todas as rotas
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
