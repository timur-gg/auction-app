import {
  IsString,
  IsDateString,
  IsOptional,
  IsISO8601,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  builderId: string;

  @ApiProperty({
    description: 'Image URLs of the project',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.png',
    ],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  documents?: string[];

  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Construction start date in ISO 8601 format',
    example: '2024-06-01',
    format: 'date',
  })
  constructionStartDate: string;

  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Expected completion date in ISO 8601 format',
    example: '2025-12-01',
    format: 'date',
  })
  completionDate: string;
}
