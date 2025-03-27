import { IsOptional, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProjectsDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'Page number (default: 1)',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({
    example: '10',
    description: 'Items per page (default: 10)',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
