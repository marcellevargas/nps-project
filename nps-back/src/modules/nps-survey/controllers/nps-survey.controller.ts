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
import {
  ValidateRating,
  ValidateRequired,
  ErrorHandler,
} from '../../../common/decorators';

@Controller('nps-surveys')
export class NpsSurveyController {
  constructor(private readonly npsSurveyService: NpsSurveyService) {}

  @Post()
  @ValidateRating(0)
  @ValidateRequired({
    field: 'productName',
    message: 'Nome do produto é obrigatório',
    parameterIndex: 0,
  })
  @ErrorHandler('Erro ao cadastrar resposta do cliente', HttpStatus.BAD_REQUEST)
  async create(@Body() createNpsSurveyDto: CreateNpsSurveyDto) {
    return await this.npsSurveyService.create(createNpsSurveyDto);
  }

  @Get()
  @ErrorHandler('Erro ao buscar respostas dos clientes')
  async findAll() {
    return await this.npsSurveyService.findAll();
  }

  @Get('nps-score')
  @ErrorHandler('Erro ao calcular NPS Score')
  async getNpsScore() {
    return await this.npsSurveyService.calculateNpsScore();
  }

  @Get('report')
  @ErrorHandler('Erro ao gerar relatório das respostas')
  async getReport() {
    return await this.npsSurveyService.getDetailedReport();
  }

  @Get(':id')
  @ErrorHandler('Erro ao buscar resposta')
  async findById(@Param('id') id: string) {
    const survey = await this.npsSurveyService.findById(id);
    if (!survey) {
      throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);
    }
    return survey;
  }

  @Put(':id')
  @ValidateRating(1)
  @ErrorHandler('Erro ao atualizar resposta')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateNpsSurveyDto,
  ) {
    const updatedSurvey = await this.npsSurveyService.update(id, updateData);
    if (!updatedSurvey) {
      throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);
    }
    return updatedSurvey;
  }

  @Delete(':id')
  @ErrorHandler('Erro ao deletar resposta')
  async delete(@Param('id') id: string) {
    const deletedSurvey = await this.npsSurveyService.delete(id);
    if (!deletedSurvey) {
      throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);
    }
    return { message: 'Resposta deletada com sucesso' };
  }
}
