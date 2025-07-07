import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { StarRating } from './StarRating';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NPSSurvey } from '@/services/api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface SurveyResponsesReportProps {
  responses: NPSSurvey[];
  paginatedResponses: NPSSurvey[];
  pagination?: {
    page: number;
    limit: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    totalPages: number;
    total: number;
  };
}

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

export function SurveyResponsesReport({ responses, paginatedResponses, pagination }: SurveyResponsesReportProps) {
  const calculateNPS = () => {
    if (!responses || responses.length === 0) return { nps: 0, promoters: 0, passives: 0, detractors: 0 };

    const total = responses.length;
    const promoters = responses.filter(r => r.rating >= 4 && r.rating <= 5).length;
    const passives = responses.filter(r => r.rating === 3).length;
    const detractors = responses.filter(r => r.rating <= 2).length;

    const nps = Math.round(((promoters - detractors) / total) * 100);

    return {
      nps,
      promoters: Math.round((promoters / total) * 100),
      passives: Math.round((passives / total) * 100),
      detractors: Math.round((detractors / total) * 100)
    };
  };

  const { nps, promoters, passives, detractors } = calculateNPS();

  const getNPSClassification = (nps: number) => {
    if (nps >= 75) return { label: 'Excellent', color: 'bg-green-500/80 backdrop-blur-sm' };
    if (nps >= 50) return { label: 'Very Good', color: 'bg-green-400/80 backdrop-blur-sm' };
    if (nps >= 0) return { label: 'Good', color: 'bg-yellow-500/80 backdrop-blur-sm' };
    if (nps >= -50) return { label: 'Poor', color: 'bg-orange-500/80 backdrop-blur-sm' };
    return { label: 'Critical', color: 'bg-red-500/80 backdrop-blur-sm' };
  };

  const classification = getNPSClassification(nps);

  const chartData: ChartData[] = [
    { name: 'Promoters', value: promoters, fill: 'rgb(34, 197, 94)' },
    { name: 'Passives', value: passives, fill: 'rgb(234, 179, 8)' },
    { name: 'Detractors', value: detractors, fill: 'rgb(239, 68, 68)' }
  ];

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20">
          <p className="text-gray-900">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white drop-shadow">NPS Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white drop-shadow-lg">{nps}</div>
            <Badge className={`mt-1 ${classification.color} text-white border-white/20`}>
              {classification.label}
            </Badge>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white drop-shadow">Promoters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-300 drop-shadow-lg">{promoters}%</div>
            <p className="text-sm text-white/80 drop-shadow">Ratings 4-5</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white drop-shadow">Passives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">{passives}%</div>
            <p className="text-sm text-white/80 drop-shadow">Ratings 3</p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white drop-shadow">Detractors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-300 drop-shadow-lg">{detractors}%</div>
            <p className="text-sm text-white/80 drop-shadow">Ratings 0-2</p>
          </CardContent>
        </Card>
      </div>

      {responses && responses.length > 0 && (
        <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-white drop-shadow-lg">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'white', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'white', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="w-4 h-4 bg-green-500 rounded mx-auto"></div>
                <p className="text-xs text-white/80 drop-shadow">Promoters</p>
                <p className="text-sm text-white drop-shadow">{promoters}%</p>
              </div>
              <div className="space-y-1">
                <div className="w-4 h-4 bg-yellow-500 rounded mx-auto"></div>
                <p className="text-xs text-white/80 drop-shadow">Passives</p>
                <p className="text-sm text-white drop-shadow">{passives}%</p>
              </div>
              <div className="space-y-1">
                <div className="w-4 h-4 bg-red-500 rounded mx-auto"></div>
                <p className="text-xs text-white/80 drop-shadow">Detractors</p>
                <p className="text-sm text-white drop-shadow">{detractors}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white drop-shadow-lg">
            Latest Responses ({pagination?.total || 0})
          </h2>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.page > 1) {
                      pagination.setPage(pagination.page - 1);
                    }
                  }}
                  className={cn(
                    "bg-white/20 hover:bg-white/30 text-white border-white/30",
                    pagination.page <= 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      pagination.setPage(pageNumber);
                    }}
                    isActive={pageNumber === pagination.page}
                    className={cn(
                      "bg-white/20 hover:bg-white/30 text-white border-white/30",
                      pageNumber === pagination.page && "bg-white/40"
                    )}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (pagination.page < pagination.totalPages) {
                      pagination.setPage(pagination.page + 1);
                    }
                  }}
                  className={cn(
                    "bg-white/20 hover:bg-white/30 text-white border-white/30",
                    pagination.page >= pagination.totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {paginatedResponses.map((response) => (
          <Card key={response.id} className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <StarRating rating={response.rating} onRatingChange={() => {}} disabled />
                  {response.comment && (
                    <p className="text-white/90 mt-2">{response.comment}</p>
                  )}
                  <p className="text-sm text-white/60">
                    {new Date(response.createdAt).toLocaleDateString('en-US')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}