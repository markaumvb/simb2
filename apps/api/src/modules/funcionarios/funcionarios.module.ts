import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
  imports: [PrismaModule],
  exports:[FuncionariosService] // para ser usado no jwtstrategy (autenticação)
})
export class FuncionariosModule {}
