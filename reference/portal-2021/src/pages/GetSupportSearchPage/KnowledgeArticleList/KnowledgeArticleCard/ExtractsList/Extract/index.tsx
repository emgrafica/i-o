import React from 'react';
import { Typography } from '@lumos/core';

/**
 * Props for the Extract component
 **/
interface ExtractsProps {
  /**
   * String annotated with <em> tags to denote what
   * portions of the text should be highlighted
   **/
  extract: string;
}

/**
 * Received a string annotated with <em> tags in the `extract` prop
 * and renders the corresponding highlighted text
 */
const Extract: React.FC<ExtractsProps> = ({ extract }) => {
  // Split the text on every occurrence of either <em> or </em>
  // the odd items in the chunks array should be then highlighted
  const chunks = extract.split(new RegExp(`</?em>`, 'gi'));
  return (
    <>
      {chunks.map((chunk, index) => {
        const highlighted = index % 2;
        const lastItem = index === chunks.length - 1;
        return (
          <Typography
            kind="body3"
            display="inline"
            fontWeight={highlighted && 'bold'}
            key={index}
          >
            {chunk}
            {lastItem && '... '}
          </Typography>
        );
      })}
    </>
  );
};

export default Extract;
