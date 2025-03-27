// apps/rest-api/src/auctions/dto/update-auction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Column } from 'typeorm';

export class UpdateAuctionDto {
  @ApiProperty({
    description: 'Starting price of the auction',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  startPrice?: number;

  @ApiProperty({ description: 'Start time of the auction', required: false })
  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @ApiProperty({ description: 'End time of the auction', required: false })
  @IsDateString()
  @IsOptional()
  endTime?: Date;

  @ApiProperty({
    description: 'Highest bid',
    nullable: true,
    example: '62f018dc-9b45-4dbd-94e1-dbaa710f3d78',
  })
  @IsUUID()
  @IsOptional()
  highestBidId?: string;

  @ApiProperty({
    description: 'Status of the auction',
    enum: ['pending', 'active', 'completed', 'canceled'],
    required: false,
  })
  @IsEnum(['pending', 'active', 'completed', 'canceled'])
  @IsOptional()
  status?: 'pending' | 'active' | 'completed' | 'canceled';
}
