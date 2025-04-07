// apps/rest-api/src/units/units.controller.ts
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

import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { Unit } from './entities/unit.entity.ts';
import { UnitsService } from './units.service.ts';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.ts';

@ApiTags('units')
@Controller('units')
export class UnitsController {
  unitService: UnitsService;
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Unit' })
  @ApiCreatedResponse({
    description: 'The Unit has been successfully created',
    type: Unit,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createUnitDto: CreateUnitDto): Promise<Unit> {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all units' })
  @ApiOkResponse({
    description: 'Returns all Units',
    type: [Unit],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(): Promise<Unit[]> {
    return this.unitService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Unit by ID' })
  @ApiParam({ name: 'id', description: 'Unit ID' })
  @ApiOkResponse({
    description: 'Returns a Unit by id',
    type: Unit,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  findOne(@Param('id') id: string): Promise<Unit> {
    return this.unitService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a Unit' })
  @ApiParam({ name: 'id', description: 'Unit ID' })
  @ApiOkResponse({
    description: 'The Unit has been successfully updated',
    type: Unit,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Unit not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<Unit> {
    return this.unitService.update(id, updateUnitDto);
  }
}
