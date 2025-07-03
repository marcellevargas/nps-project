import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NpsSurvey, NpsSurveySchema } from './schemas/nps-survey.schema';
import { NpsSurveyService } from './services/nps-survey.service';
import { NpsSurveyController } from './controllers/nps-survey.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NpsSurvey.name, schema: NpsSurveySchema },
    ]),
  ],
  controllers: [NpsSurveyController],
  providers: [NpsSurveyService],
  exports: [NpsSurveyService],
})
export class NpsSurveyModule {}
