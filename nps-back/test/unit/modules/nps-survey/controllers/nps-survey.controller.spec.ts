import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NpsSurveyController } from '@/modules/nps-survey/controllers/nps-survey.controller';
import { NpsSurveyService } from '@/modules/nps-survey/services/nps-survey.service';
import {
  CreateNpsSurveyDto,
  UpdateNpsSurveyDto,
} from '@/modules/nps-survey/dtos';

describe('NpsSurveyController', () => {
  let controller: NpsSurveyController;

  const mockNpsSurveyService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    calculateNpsScore: jest.fn(),
    getDetailedReport: jest.fn(),
  };

  const mockSurveyData = {
    _id: '507f1f77bcf86cd799439011',
    productName: 'Produto Teste',
    rating: 4,
    comment: 'Muito bom produto',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockNpsScore = {
    npsScore: 50,
    totalResponses: 10,
    promoters: 6,
    neutrals: 2,
    detractors: 2,
  };

  const mockReport = {
    responses: [mockSurveyData],
    npsData: mockNpsScore,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpsSurveyController],
      providers: [
        {
          provide: NpsSurveyService,
          useValue: mockNpsSurveyService,
        },
      ],
    }).compile();

    controller = module.get<NpsSurveyController>(NpsSurveyController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new NPS survey', async () => {
      const createDto: CreateNpsSurveyDto = {
        productName: 'Produto Teste',
        rating: 4,
        comment: 'Muito bom produto',
      };

      mockNpsSurveyService.create.mockResolvedValue(mockSurveyData);

      const result = await controller.create(createDto);

      expect(mockNpsSurveyService.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockSurveyData);
    });

    it('should throw an error if validation fails', async () => {
      const createDto: CreateNpsSurveyDto = {
        productName: 'Produto Teste',
        rating: 6,
        comment: 'Teste',
      };

      mockNpsSurveyService.create.mockRejectedValue(
        new HttpException(
          'A avaliação deve estar entre 0 e 5 estrelas',
          HttpStatus.BAD_REQUEST,
        ),
      );

      await expect(controller.create(createDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return all NPS surveys', async () => {
      const mockSurveys = [mockSurveyData];
      mockNpsSurveyService.findAll.mockResolvedValue(mockSurveys);

      const result = await controller.findAll();

      expect(mockNpsSurveyService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockSurveys);
    });
  });

  describe('getNpsScore', () => {
    it('should return NPS score calculation', async () => {
      mockNpsSurveyService.calculateNpsScore.mockResolvedValue(mockNpsScore);

      const result = await controller.getNpsScore();

      expect(mockNpsSurveyService.calculateNpsScore).toHaveBeenCalled();
      expect(result).toEqual(mockNpsScore);
    });
  });

  describe('getReport', () => {
    it('should return detailed report', async () => {
      mockNpsSurveyService.getDetailedReport.mockResolvedValue(mockReport);

      const result = await controller.getReport();

      expect(mockNpsSurveyService.getDetailedReport).toHaveBeenCalled();
      expect(result).toEqual(mockReport);
    });
  });

  describe('findById', () => {
    it('should return a survey by ID', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      mockNpsSurveyService.findById.mockResolvedValue(mockSurveyData);

      const result = await controller.findById(surveyId);

      expect(mockNpsSurveyService.findById).toHaveBeenCalledWith(surveyId);
      expect(result).toEqual(mockSurveyData);
    });

    it('should throw HttpException when survey not found', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      mockNpsSurveyService.findById.mockResolvedValue(null);

      await expect(controller.findById(surveyId)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a survey by ID', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      const updateDto: UpdateNpsSurveyDto = {
        productName: 'Produto Atualizado',
        rating: 5,
        comment: 'Excelente produto',
      };

      const updatedSurvey = { ...mockSurveyData, ...updateDto };
      mockNpsSurveyService.update.mockResolvedValue(updatedSurvey);

      const result = await controller.update(surveyId, updateDto);

      expect(mockNpsSurveyService.update).toHaveBeenCalledWith(
        surveyId,
        updateDto,
      );
      expect(result).toEqual(updatedSurvey);
    });

    it('should throw HttpException when survey to update not found', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      const updateDto: UpdateNpsSurveyDto = {
        productName: 'Produto Atualizado',
      };

      mockNpsSurveyService.update.mockResolvedValue(null);

      await expect(controller.update(surveyId, updateDto)).rejects.toThrow();
    });

    it('should throw an error if rating validation fails', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      const updateDto: UpdateNpsSurveyDto = {
        rating: 6,
      };

      mockNpsSurveyService.update.mockRejectedValue(
        new HttpException(
          'A avaliação deve estar entre 0 e 5 estrelas',
          HttpStatus.BAD_REQUEST,
        ),
      );

      await expect(controller.update(surveyId, updateDto)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a survey by ID', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      mockNpsSurveyService.delete.mockResolvedValue(mockSurveyData);

      const result = await controller.delete(surveyId);

      expect(mockNpsSurveyService.delete).toHaveBeenCalledWith(surveyId);
      expect(result).toEqual({ message: 'Resposta deletada com sucesso' });
    });

    it('should throw HttpException when survey to delete not found', async () => {
      const surveyId = '507f1f77bcf86cd799439011';
      mockNpsSurveyService.delete.mockResolvedValue(null);

      await expect(controller.delete(surveyId)).rejects.toThrow();
    });
  });
});
