import { IsString, IsDateString } from 'class-validator';
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

  @ApiProperty()
  @IsDateString()
  constructionStartDate: string;

  @ApiProperty()
  @IsDateString()
  completionDate: string;
}
