import { Module } from '@nestjs/common';
import { FuncionarioPerfilsService } from './funcionario-perfils.service';
import { FuncionarioPerfilsController } from './funcionario-perfils.controller';

@Module({
  controllers: [FuncionarioPerfilsController],
  providers: [FuncionarioPerfilsService]
})
export class FuncionarioPerfilsModule {}
