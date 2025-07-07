import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NpsSurveyModule } from './modules/nps-survey';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(databaseConfig.uri),
    NpsSurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
