// apps/rest-api/src/units/dto/create-unit.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsPositive, isEnum, IsEnum,
} from 'class-validator';
import { unitStatus } from '../../common/enums/unit.enum.ts';

export class CreateUnitDto {
  @ApiProperty({
    description: 'Name of the unit',
    example: 'Unit 1204',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  size: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 2,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  bedrooms: number;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2.5,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  bathrooms: number;

  @ApiProperty()
  @IsString()
  projectId: string;

  @ApiProperty({
    description: 'Status of the unit',
    enum: unitStatus,
    example: 'pending',
    required: true
  })
  @IsEnum(unitStatus)
  status: unitStatus;


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
