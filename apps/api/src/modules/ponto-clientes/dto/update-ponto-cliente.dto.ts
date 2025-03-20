import { PartialType } from '@nestjs/swagger';
import { CreatePontoClienteDto } from './create-ponto-cliente.dto';

export class UpdatePontoClienteDto extends PartialType(CreatePontoClienteDto) {}
