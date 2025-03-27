import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDto {
  @ApiProperty({ example: '7e8a83b6-3e2a-4db3-950f-e1cfc73d8c45' })
  id: string;

  @ApiProperty({ example: 'Downtown Condos' })
  name: string;

  @ApiProperty({ example: '123 Main St, Toronto' })
  address: string;

  @ApiProperty({ example: 'M5A 1P9' })
  postalCode: string;

  @ApiProperty({ example: 'builder-uuid-123' })
  builderId: string;

  @ApiProperty({ example: '2025-01-01' })
  constructionStartDate: Date;

  @ApiProperty({ example: '2026-06-01' })
  completionDate: Date;

  @ApiProperty({ example: '2024-03-27T15:45:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-28T12:00:00.000Z' })
  updatedAt: Date;
}
