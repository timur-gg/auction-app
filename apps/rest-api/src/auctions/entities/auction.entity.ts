// apps/rest-api/src/auctions/entities/auction.entity.ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity('auctions')
export class Auction {
  @ApiProperty({
    description: 'ID of Auction',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  unitId: string;
  @ApiProperty({
    description:'Start price of auction',example: '999.99' ,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  startPrice: number;
  @ApiProperty({
    description:'Start time of auction',example: new Date(),
  })
  @Column({ type: 'timestamp with time zone' })
  startTime: Date;
@ApiProperty({
  description:'End time of auction',example: new Date(),
})
  @Column({ type: 'timestamp with time zone' })
  endTime: Date;
 @ApiProperty({description: 'Highest bid', nullable:true,
 example:'62f018dc-9b45-4dbd-94e1-dbaa710f3d78' })
  @Column({ type: 'string', nullable: true })
  highestBidId: string | null;

  @ApiProperty({ description: 'Status of Auction', example: 'pending' })
  @Column({
    type: 'enum',
    enum: ['pending', 'active', 'completed', 'canceled'],
    default: 'pending'
  })
  status: 'pending' | 'active' | 'completed' | 'canceled';

  @ApiProperty({ description: 'Created date of Auction' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of Auction' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
