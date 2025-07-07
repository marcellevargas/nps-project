'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, ClipboardList, RefreshCw } from 'lucide-react';
import { RelatorioRespostas } from '@/components/nps/RelatorioRespostas';
import { CadastroForm } from '@/components/nps/CadastroForm';
import { useNPSSurvey } from '@/hooks/useNPSSurvey';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { surveys, paginatedSurveys, isLoading, error, refetch, pagination } = useNPSSurvey();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-500 to-white relative overflow-hidden">
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 transition-all duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 75}px, ${mousePosition.y - 75}px)`,
        }}
      >
        <div 
          className="w-36 h-36 rounded-full blur-2xl opacity-80"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.1) 60%, transparent 100%)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gray-300/20 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-2xl">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">Sistema de Avaliação NPS</h1>
              <p className="text-white/90 drop-shadow">
                Cadastre respostas de clientes e acompanhe o Net Promoter Score
              </p>
              
              {error && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <p className="text-red-400">{error}</p>
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Tentar Novamente
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-2xl">
            <Tabs defaultValue="relatorio" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/20 backdrop-blur-sm border border-white/30">
                <TabsTrigger 
                  value="relatorio" 
                  className="flex items-center gap-2 data-[state=active]:bg-white/30 data-[state=active]:text-white text-white/80 hover:text-white transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  Relatório
                </TabsTrigger>
                <TabsTrigger 
                  value="cadastro" 
                  className="flex items-center gap-2 data-[state=active]:bg-white/30 data-[state=active]:text-white text-white/80 hover:text-white transition-all"
                >
                  <ClipboardList className="w-4 h-4" />
                  Cadastro
                </TabsTrigger>
              </TabsList>

              <TabsContent value="relatorio">
                {isLoading ? (
                  <div className="text-center text-white py-8">Carregando...</div>
                ) : (
                  <RelatorioRespostas 
                    respostas={surveys} 
                    respostasPaginadas={paginatedSurveys}
                    pagination={pagination}
                  />
                )}
              </TabsContent>

              <TabsContent value="cadastro">
                <CadastroForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
