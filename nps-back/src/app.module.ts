import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NpsSurveyModule } from './modules/nps-survey';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [MongooseModule.forRoot(databaseConfig.uri), NpsSurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
