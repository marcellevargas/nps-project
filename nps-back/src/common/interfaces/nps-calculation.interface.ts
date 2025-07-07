export interface NpsCalculationResult {
  npsScore: number;
  totalResponses: number;
  promoters: number;
  neutrals: number;
  detractors: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NpsReportResult {
  responses: PaginatedResult<any>;
  npsData: NpsCalculationResult;
}
