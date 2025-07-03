import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NpsSurveyService } from '../services/nps-survey.service';
import { CreateNpsSurveyDto, UpdateNpsSurveyDto } from '../dtos';

@Controller('nps-surveys')
export class NpsSurveyController {
  constructor(private readonly npsSurveyService: NpsSurveyService) {}

  @Post()
  async create(@Body() createNpsSurveyDto: CreateNpsSurveyDto) {
    try {
      if (createNpsSurveyDto.rating < 0 || createNpsSurveyDto.rating > 5) {
        throw new HttpException(
          'A avaliação deve estar entre 0 e 5 estrelas',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        !createNpsSurveyDto.productName ||
        createNpsSurveyDto.productName.trim() === ''
      ) {
        throw new HttpException(
          'Nome do produto é obrigatório',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.npsSurveyService.create(createNpsSurveyDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao cadastrar resposta do cliente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.npsSurveyService.findAll();
    } catch {
      throw new HttpException(
        'Erro ao buscar respostas dos clientes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('nps-score')
  async getNpsScore() {
    try {
      return await this.npsSurveyService.calculateNpsScore();
    } catch {
      throw new HttpException(
        'Erro ao calcular NPS Score',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('report')
  async getReport() {
    try {
      return await this.npsSurveyService.getDetailedReport();
    } catch {
      throw new HttpException(
        'Erro ao gerar relatório das respostas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const survey = await this.npsSurveyService.findById(id);
      if (!survey) {
        throw new HttpException(
          'Resposta não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      return survey;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar resposta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateNpsSurveyDto,
  ) {
    try {
      if (
        updateData.rating !== undefined &&
        (updateData.rating < 0 || updateData.rating > 5)
      ) {
        throw new HttpException(
          'A avaliação deve estar entre 0 e 5 estrelas',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedSurvey = await this.npsSurveyService.update(id, updateData);
      if (!updatedSurvey) {
        throw new HttpException(
          'Resposta não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedSurvey;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao atualizar resposta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const deletedSurvey = await this.npsSurveyService.delete(id);
      if (!deletedSurvey) {
        throw new HttpException(
          'Resposta não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      return { message: 'Resposta deletada com sucesso' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao deletar resposta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
