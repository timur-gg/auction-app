// apps/rest-api/src/units/entities/unit.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('unit')
export class Unit {
  @ApiProperty({
    description: 'ID of Unit',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9f',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the unit',
    example: 'Unit 1204',
  })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    description: 'Description of the unit',
    example: 'Spacious corner unit with city views',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Size of the unit in square feet',
    example: 850,
    required: true,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  size: number;

  @ApiProperty({
    description: 'Number of bedrooms',
    example: 2,
    required: true,
  })
  @Column({ type: 'int', nullable: false })
  bedrooms: number;

  @ApiProperty({
    description: 'Number of bathrooms',
    example: 2.5,
    required: true,
  })
  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: false })
  bathrooms: number;

  @ApiProperty({
    description: 'Base price of the unit',
    example: 450000,
    required: false,
  })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  basePrice: number;

  @ApiProperty({ description: 'Created date of Unit' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of Unit' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
