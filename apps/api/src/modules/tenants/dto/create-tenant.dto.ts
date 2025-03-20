import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  razaoSocial?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: true })
  ativo?: boolean = true;
}
