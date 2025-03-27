// apps/rest-api/src/auctions/dto/create-auction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({ description: 'ID of the unit being auctioned' })
  @IsUUID()
  @IsNotEmpty()
  unitId: string;

  @ApiProperty({ description: 'Starting price of the auction' })
  @IsNumber()
  @IsNotEmpty()
  startPrice: number;

  @ApiProperty({ description: 'Start time of the auction' })
  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ description: 'End time of the auction' })
  @IsDateString()
  @IsNotEmpty()
  endTime: Date;
}
