import React from 'react';
import KnowledgeArticleCard from './KnowledgeArticleCard';
import { GetSupportSearch_knowledgeArticleSearch } from 'graphql/queries/gqlTypes/GetSupportSearch';
import NoResultsMessage from '../NoResultsMessage';

/**
 * Props type for the GetSupportSearchList component
 **/
type KnowledgeArticleListProps = Pick<
  GetSupportSearch_knowledgeArticleSearch,
  'items'
>;

/**
 * List of knowledge articles
 **/
const KnowledgeArticleList: React.FC<KnowledgeArticleListProps> = ({
  items,
}) => {
  return items.length === 0 ? (
    <NoResultsMessage />
  ) : (
    <>
      {items.map(item => (
        <KnowledgeArticleCard
          key={item.id}
          extracts={item.extracts}
          description={item.description}
          title={item.title}
          url={item.url}
        />
      ))}
    </>
  );
};

export default KnowledgeArticleList;
