import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { StarRating } from './StarRating';
import { useNPSSurvey } from '@/hooks/useNPSSurvey';

export function CadastroForm() {
  const [produto, setProduto] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { createSurvey, isLoading, error } = useNPSSurvey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!produto.trim() || score === 0) {
      alert('Por favor, preencha o nome do produto e selecione uma avaliação.');
      return;
    }

    try {
      await createSurvey({
        productName: produto.trim(),
        rating: score,
        comment: feedback.trim(),
      });
      
      setProduto('');
      setScore(0);
      setFeedback('');
    } catch (err) {
      alert('Erro ao cadastrar a pesquisa. Por favor, tente novamente.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white drop-shadow-lg">Cadastrar Nova Resposta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="produto" className="text-white drop-shadow">Nome do Produto *</Label>
            <Input
              id="produto"
              type="text"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              placeholder="Digite o nome do produto"
              required
              className="backdrop-blur-sm bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 transition-all"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white drop-shadow">Avaliação *</Label>
            <div className="flex items-center gap-2">
              <StarRating 
                rating={score} 
                onRatingChange={setScore}
                disabled={isLoading}
              />
              <span className="text-sm text-white/80 ml-2 drop-shadow">
                {score > 0 ? `${score} estrela${score > 1 ? 's' : ''}` : 'Selecione uma avaliação'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-white drop-shadow">Comentário (opcional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Digite um comentário adicional..."
              rows={4}
              className="backdrop-blur-sm bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 transition-all resize-none"
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <Button 
            type="submit" 
            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar Resposta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}