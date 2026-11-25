import { ClampText } from 'components/ClampText';
import { GetSupportSearch_knowledgeArticleSearch_items } from 'models/types/GetSupportSearch';
import CardTemplate from 'pages/GetSupportSearchPage/CardTemplate';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArticleIcon } from './ArticleIcon';
import ExtractsList from './ExtractsList';

/**
 * Props type for the KnowledgeArticleCard component
 **/
type KnowledgeArticleCardProps = Pick<
  GetSupportSearch_knowledgeArticleSearch_items,
  'title' | 'extracts' | 'description' | 'url' | 'id'
>;

/**
 * Knowledge article card
 **/
const KnowledgeArticleCard: React.FC<KnowledgeArticleCardProps> = ({
  title,
  extracts,
  description,
  url,
  id,
}) => {
  const history = useHistory();

  const showDetailKB = (id: any) => {
    history.push({
      pathname: `/knowledges/detail/${id}`,
    });
  };

  return (
    <CardTemplate
      icon={<ArticleIcon />}
      minHeight={'100px'}
      minWidth="100%"
      title={title}
      onTitleClick={() => showDetailKB(id)}
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
