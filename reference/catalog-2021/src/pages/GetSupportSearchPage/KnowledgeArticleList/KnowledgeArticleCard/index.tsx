import React from 'react';
import ExtractsList from './ExtractsList';
import { ArticleIcon } from './ArticleIcon';
import { openInWindow } from '../../../../utils/openInWindow';
import { GetSupportSearch_knowledgeArticleSearch_items } from 'graphql/queries/gqlTypes/GetSupportSearch';
import CardTemplate from 'pages/GetSupportSearchPage/CardTemplate';
import { ClampText } from 'components/ClampText';

/**
 * Props type for the KnowledgeArticleCard component
 **/
type KnowledgeArticleCardProps = Pick<
  GetSupportSearch_knowledgeArticleSearch_items,
  'title' | 'extracts' | 'description' | 'url'
>;

/**
 * Knowledge article card
 **/
const KnowledgeArticleCard: React.FC<KnowledgeArticleCardProps> = ({
  title,
  extracts,
  description,
  url,
}) => {
  return (
    <CardTemplate
      icon={<ArticleIcon />}
      minHeight={'100px'}
      title={title}
      onTitleClick={() => openInWindow(url)}
    >
      {extracts.length > 0 ? (
        <ExtractsList extracts={extracts} />
      ) : (
        <ClampText maxLineCount={2}>{description}</ClampText>
      )}
    </CardTemplate>
  );
};

export default KnowledgeArticleCard;
