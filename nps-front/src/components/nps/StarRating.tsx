import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

export function StarRating({ rating, onRatingChange, disabled = false }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${
            star <= (hover || rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          onClick={() => !disabled && onRatingChange(star)}
          onMouseEnter={() => !disabled && setHover(star)}
          onMouseLeave={() => !disabled && setHover(rating)}
          disabled={disabled}
        >
          ★
        </button>
      ))}
    </div>
  );
}