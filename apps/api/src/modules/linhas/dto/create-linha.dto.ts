import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLinhaDto {
  @ApiProperty({ required: true })
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsString()
  status: string;
}
