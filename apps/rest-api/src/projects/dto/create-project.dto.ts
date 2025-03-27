import { IsString, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  postalCode: string;

  @IsString()
  builderId: string;

  @IsDateString()
  constructionStartDate: string;

  @IsDateString()
  completionDate: string;
}
