// apps/rest-api/src/units/dto/update-unit.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';

export class UpdateUnitDto {
  @ApiProperty({
    description: 'Name of the unit',
    example: 'Unit 1204',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Description of the unit',
    example: 'Spacious corner unit with city views',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Size of the unit in square feet',
    example: 850,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  size?: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  bedrooms?: number;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  bathrooms?: number;

  @ApiProperty({
    description: 'Base price of the unit',
    example: 450000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  basePrice?: number;
}
