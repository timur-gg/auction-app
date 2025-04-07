import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUnitDto } from './dto/create-unit.dto.ts';
import { UpdateUnitDto } from './dto/update-unit.dto.ts';
import { Unit } from './entities/unit.entity.ts';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private auctionsRepository: Repository<Unit>,
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const Units = this.auctionsRepository.create({
      ...createUnitDto,
    });

    return this.auctionsRepository.save(Units);
  }

  async findAll(): Promise<Unit[]> {
    return this.auctionsRepository.find();
  }

  async findOne(id: string): Promise<Unit> {
    const Units = await this.auctionsRepository.findOne({ where: { id } });

    if (!Units) {
      throw new NotFoundException(`Unit with ID "${id}" not found`);
    }

    return Units;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    const Units = await this.findOne(id);

    Object.assign(Units, updateUnitDto);

    return this.auctionsRepository.save(Units);
  }
}
