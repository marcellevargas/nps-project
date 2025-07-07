import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { StarRating } from './StarRating';
import { useNPSSurvey } from '@/hooks/useNPSSurvey';

export function SurveyForm() {
  const [product, setProduct] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { createSurvey, isLoading, error } = useNPSSurvey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.trim() || score === 0) {
      alert('Please enter the product name and select a rating.');
      return;
    }

    try {
      await createSurvey({
        productName: product.trim(),
        rating: score,
        comment: feedback.trim(),
      });
      
      setProduct('');
      setScore(0);
      setFeedback('');
    } catch (err) {
      alert('Error submitting the survey. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white drop-shadow-lg">Submit New Response</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" role="form">
          <div className="space-y-2">
            <Label htmlFor="product" className="text-white drop-shadow">Product Name *</Label>
            <Input
              id="product"
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter the product name"
              required
              className="backdrop-blur-sm bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 transition-all"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white drop-shadow">Rating *</Label>
            <div className="flex items-center gap-2">
              <StarRating 
                rating={score} 
                onRatingChange={setScore}
                disabled={isLoading}
              />
              <span className="text-sm text-white/80 ml-2 drop-shadow">
                {score > 0 ? `${score} star${score > 1 ? 's' : ''}` : 'Select a rating'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-white drop-shadow">Comment (optional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter additional comments..."
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
            {isLoading ? 'Submitting...' : 'Submit Response'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}