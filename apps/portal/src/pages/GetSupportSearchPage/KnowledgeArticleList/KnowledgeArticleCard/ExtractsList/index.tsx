import React from 'react';
import Extract from './Extract';
import { ClampText } from 'components/ClampText';

/**
 * Props for the ExtractsList component
 **/
interface ExtractListProps {
  /**
   * List  of extracts for a KnowledgeArticleCard
   * each extract is a string annotated with <em>
   * tags to denote what portions of the text should
   * be highlighted
   **/
  extracts: string[];
}

/**
 * List of extracts for a given knowledge article
 **/
const ExtractsList: React.FC<ExtractListProps> = ({ extracts }) => (
  <ClampText maxLineCount={2}>
    {extracts.map((extract, index) => (
      <Extract extract={extract} key={index} />
    ))}
  </ClampText>
);

export default ExtractsList;
