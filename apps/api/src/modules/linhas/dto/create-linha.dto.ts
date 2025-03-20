import { ApiProperty } from '@nestjs/swagger';

export class CreateLinhaDto {
  @ApiProperty()
  status: string;
}
