import { Module } from '@nestjs/common';
import { BrindesService } from './brindes.service';
import { BrindesController } from './brindes.controller';

@Module({
  controllers: [BrindesController],
  providers: [BrindesService],
})
export class BrindesModule {}
