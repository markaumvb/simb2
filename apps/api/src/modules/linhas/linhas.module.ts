import { Module } from '@nestjs/common';
import { LinhasService } from './linhas.service';
import { LinhasController } from './linhas.controller';
import { PrismaModule } from '@app/database/prisma.module';

@Module({
  controllers: [LinhasController],
  providers: [LinhasService],
  imports: [PrismaModule],
})
export class LinhasModule {}
