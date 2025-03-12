import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module.ts";
import {User} from "../user/entities/user.entity.ts";

@Module({
  imports: [  TypeOrmModule.forRoot({
    autoLoadEntities: true,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'nest',
    username: 'nest',
    entities: [__dirname + '/../**/*.entity.{js,ts}'], //<- doesnt work!!!
    database: 'auction_db',
    synchronize: true,
    logging: true,
  }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
