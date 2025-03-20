import { PartialType } from '@nestjs/swagger';
import { CreateDebitosClienteDto } from './create-debitos-cliente.dto';

export class UpdateDebitosClienteDto extends PartialType(CreateDebitosClienteDto) {}
