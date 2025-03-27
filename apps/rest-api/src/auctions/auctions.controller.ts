// apps/rest-api/src/auctions/auctions.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction } from './entities/auction.entity';
import { AuctionsService } from './auctions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';

@ApiTags('auctions')
@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new auction' })
  @ApiCreatedResponse({
    description: 'The auction has been successfully created',
    type: Auction,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createAuctionDto: CreateAuctionDto): Promise<Auction> {
    return this.auctionsService.create(createAuctionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all auctions' })
   @ApiOkResponse({
    description: 'Returns all auctions',
    type: [Auction],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })

  findAll(): Promise<Auction[]> {
    return this.auctionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get auction by ID' })
  @ApiParam({ name: 'id', description: 'Auction ID' })

  @ApiOkResponse({
    description: 'Returns an auction by id',
    type: Auction,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })

  @ApiNotFoundResponse({ description: 'Auction not found' })
  findOne(@Param('id') id: string): Promise<Auction> {
    return this.auctionsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an auction' })
  @ApiParam({ name: 'id', description: 'Auction ID' })
  @ApiOkResponse({
    description: 'The auction has been successfully updated',
    type: Auction,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Auction not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ): Promise<Auction> {
    return this.auctionsService.update(id, updateAuctionDto);
  }
}
