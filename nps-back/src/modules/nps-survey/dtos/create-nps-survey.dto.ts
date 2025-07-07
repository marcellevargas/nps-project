import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateNpsSurveyDto {
  @IsString()
  productName: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
