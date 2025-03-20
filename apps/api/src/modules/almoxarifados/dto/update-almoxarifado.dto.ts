import { PartialType } from '@nestjs/swagger';
import { CreateAlmoxarifadoDto } from './create-almoxarifado.dto';

export class UpdateAlmoxarifadoDto extends PartialType(CreateAlmoxarifadoDto) {}
