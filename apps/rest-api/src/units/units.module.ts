import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsController } from './units.controller.ts';
import { UnitsService } from './units.service.ts';
import { JwtService } from '@nestjs/jwt';
import {Unit} from "./entities/unit.entity.ts";

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitsController],
  providers: [UnitsService, JwtService],
  exports: [UnitsService],
})
export class UnitsModule {}
