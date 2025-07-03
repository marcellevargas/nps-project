export interface NpsCalculationResult {
  npsScore: number;
  totalResponses: number;
  promoters: number;
  neutrals: number;
  detractors: number;
}

export interface NpsReportResult {
  responses: any[];
  npsData: NpsCalculationResult;
}
