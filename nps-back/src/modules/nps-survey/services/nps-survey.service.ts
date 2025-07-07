import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NpsSurvey, NpsSurveyDocument } from '../schemas/nps-survey.schema';
import { CreateNpsSurveyDto, UpdateNpsSurveyDto, PaginationDto } from '../dtos';
import {
  NpsCalculationResult,
  NpsReportResult,
  PaginatedResult,
} from '../../../common/interfaces';

@Injectable()
export class NpsSurveyService {
  constructor(
    @InjectModel(NpsSurvey.name)
    private npsSurveyModel: Model<NpsSurveyDocument>,
  ) {}

  async create(createNpsSurveyDto: CreateNpsSurveyDto): Promise<NpsSurvey> {
    const createdSurvey = new this.npsSurveyModel(createNpsSurveyDto);
    return createdSurvey.save();
  }

  async findAll(
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResult<NpsSurvey>> {
    const { page = 1, limit = 10 } = paginationDto || {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.npsSurveyModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.npsSurveyModel.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findById(id: string): Promise<NpsSurvey | null> {
    return this.npsSurveyModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: UpdateNpsSurveyDto,
  ): Promise<NpsSurvey | null> {
    return this.npsSurveyModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<NpsSurvey | null> {
    return this.npsSurveyModel.findByIdAndDelete(id).exec();
  }

  async calculateNpsScore(): Promise<NpsCalculationResult> {
    const surveys = await this.npsSurveyModel.find().exec();

    if (surveys.length === 0) {
      return {
        npsScore: 0,
        totalResponses: 0,
        promoters: 0,
        neutrals: 0,
        detractors: 0,
      };
    }

    const promoters = surveys.filter((survey) => survey.rating >= 4).length;
    const neutrals = surveys.filter((survey) => survey.rating === 3).length;
    const detractors = surveys.filter((survey) => survey.rating <= 2).length;

    const totalResponses = surveys.length;

    const promotersPercentage = (promoters / totalResponses) * 100;
    const detractorsPercentage = (detractors / totalResponses) * 100;
    const npsScore = promotersPercentage - detractorsPercentage;

    return {
      npsScore: Math.round(npsScore),
      totalResponses,
      promoters,
      neutrals,
      detractors,
    };
  }

  async getDetailedReport(
    paginationDto?: PaginationDto,
  ): Promise<NpsReportResult> {
    const paginatedResponses = await this.findAll(paginationDto);
    const npsData = await this.calculateNpsScore();

    return {
      responses: paginatedResponses,
      npsData,
    };
  }
}
