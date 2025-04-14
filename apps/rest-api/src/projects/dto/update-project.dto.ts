import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'Updated Project Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '456 New Address St' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'M5B 2T3' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ example: 'builder-002' })
  @IsOptional()
  @IsString()
  builderId?: string;

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

  @ApiPropertyOptional({ example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  constructionStartDate?: string;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  completionDate?: string;
}
