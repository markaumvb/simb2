import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateSistemaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  descricao: string;

  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @IsDate()
  @ApiProperty({ required: false })
  dt_inclusao: Date;

  @IsDate()
  @ApiProperty({ required: false })
  dt_alteracao: Date | null;
}
