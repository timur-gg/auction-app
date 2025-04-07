// apps/rest-api/src/auctions/auctions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionsController } from './auctions.controller';
import { AuctionsService } from './auctions.service';
import { Auction } from './entities/auction.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Auction])],
  controllers: [AuctionsController],
  providers: [AuctionsService, JwtService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
