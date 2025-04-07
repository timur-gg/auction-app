import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('projects')
export class Project {
  @ApiProperty({ example: '7e8a83b6-3e2a-4db3-950f-e1cfc73d8c45' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Downtown Lofts' })
  @Column()
  name: string;

  @ApiProperty({ example: '123 Queen St E' })
  @Column()
  address: string;

  @ApiProperty({ example: 'M5A 1S2' })
  @Column()
  postalCode: string;

  @ApiProperty({ example: 'builder-001' })
  @Column()
  builderId: string;

  @ApiProperty({ example: '2024-06-01' })
  @Column({ type: 'date' })
  constructionStartDate: Date;

  @ApiProperty({ example: '2025-12-01' })
  @Column({ type: 'date' })
  completionDate: Date;

  @ApiProperty({ example: '2024-03-27T10:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-03-27T10:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
