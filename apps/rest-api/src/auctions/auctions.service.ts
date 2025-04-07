// apps/rest-api/src/auctions/auctions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private auctionsRepository: Repository<Auction>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = this.auctionsRepository.create({
      ...createAuctionDto,
      status: 'pending',
    });

    return this.auctionsRepository.save(auction);
  }

  async findAll(): Promise<Auction[]> {
    return this.auctionsRepository.find();
  }

  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctionsRepository.findOne({ where: { id } });

    if (!auction) {
      throw new NotFoundException(`Auction with ID "${id}" not found`);
    }

    return auction;
  }

  async update(
    id: string,
    updateAuctionDto: UpdateAuctionDto,
  ): Promise<Auction> {
    const auction = await this.findOne(id);

    Object.assign(auction, updateAuctionDto);

    return this.auctionsRepository.save(auction);
  }
}
