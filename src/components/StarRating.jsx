import React from 'react';
import { Rating, Box, Typography } from '@mui/material';

const labels = {
  0.5: 'Very Bad',
  1: 'Bad',
  1.5: 'Poor',
  2: 'Okay',
  2.5: 'Average',
  3: 'Good',
  3.5: 'Very Good',
  4: 'Great',
  4.5: 'Excellent',
  5: 'Perfect',
};

const StarRating = ({ value, onChange, readOnly = false, size = 'medium' }) => {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        name="recipe-rating"
        value={value}
        precision={0.5}
        onChange={(_, newValue) => !readOnly && onChange?.(newValue)}
        onChangeActive={(_, newHover) => setHover(newHover)}
        readOnly={readOnly}
        size={size}
      />
      {!readOnly && (
        <Typography variant="body2">
          {labels[hover !== -1 ? hover : value] || ''}
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;
