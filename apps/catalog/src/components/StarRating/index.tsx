import React, { useState } from 'react';
import { Grid } from '@lumos/core';
import { StarBorderRounded, StarRounded } from '@material-ui/icons';
import { IconWrapper } from './index.style';

interface StarRatingProps {
  setRating: Function;
  rating?: number;
}

/**
 * Star Rating component
 */
const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [starRating, setStarRating] = useState(rating || 0);

  const stars = [];
  for (let filledStars = 0; filledStars < starRating; filledStars++) {
    stars.push(
      <IconWrapper key={filledStars}>
        <StarRounded
          fontSize="inherit"
          onClick={() => {
            setStarRating(filledStars + 1);
            setRating(filledStars + 1);
          }}
        />
      </IconWrapper>,
    );
  }
  for (let emptyStars = starRating; emptyStars < 5; emptyStars++) {
    stars.push(
      <IconWrapper key={emptyStars}>
        <StarBorderRounded
          fontSize="inherit"
          onClick={() => {
            setStarRating(emptyStars + 1);
            setRating(emptyStars + 1);
          }}
        />
      </IconWrapper>,
    );
  }

  return (
    <Grid
      width="100%"
      padding="16px 24px"
      justifyContent="center"
      fontSize={{ xs: '49px', lg: '63px' }}
      color="primary.1"
    >
      {stars.map(star => star)}
    </Grid>
  );
};

export default StarRating;
