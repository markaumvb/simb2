import { Module } from '@nestjs/common';
import { PerfilsService } from './perfils.service';
import { PerfilsController } from './perfils.controller';

@Module({
  controllers: [PerfilsController],
  providers: [PerfilsService],
})
export class PerfilsModule {}
