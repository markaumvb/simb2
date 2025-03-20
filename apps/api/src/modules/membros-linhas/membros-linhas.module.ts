import { Module } from '@nestjs/common';
import { MembrosLinhasService } from './membros-linhas.service';
import { MembrosLinhasController } from './membros-linhas.controller';

@Module({
  controllers: [MembrosLinhasController],
  providers: [MembrosLinhasService]
})
export class MembrosLinhasModule {}
