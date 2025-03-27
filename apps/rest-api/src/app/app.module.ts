import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ProjectsModule } from '../projects/projects.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ .env available across entire app
    }),
    DatabaseModule,    // ✅ DB connection + TypeORM setup
    ProjectsModule,    // ✅ Your feature module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
