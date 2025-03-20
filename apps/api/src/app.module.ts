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

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: process.env.EXPIRESIN },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 30,
    }),
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
  ],
  exports: [PrismaTenantService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
