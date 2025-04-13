import { IsString, IsDateString, IsOptional } from 'class-validator';
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
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.png'],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  documents?: string[];

  @ApiProperty()
  @IsDateString()
  constructionStartDate: string;

  @ApiProperty()
  @IsDateString()
  completionDate: string;
}
