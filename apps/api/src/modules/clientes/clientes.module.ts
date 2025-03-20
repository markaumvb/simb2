import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [PrismaModule],
})
export class ClientesModule {}
