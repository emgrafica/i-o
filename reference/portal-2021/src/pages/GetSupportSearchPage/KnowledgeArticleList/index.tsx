import React from 'react';
import { GetSupportSearch_knowledgeArticleSearch } from 'models/types/GetSupportSearch';
import NoResultsMessage from '../NoResultsMessage';
import { MuuriComponent } from 'muuri-react';
import { useHistory } from 'react-router-dom';
import { Box } from '@lumos/core';
import { IoAccordion } from '@i-o/design-system';
import DateUtils from 'utils/date';
import UserService from 'services/userServices';

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
  const options = {
    dragSortHeuristics: {
      sortInterval: 70,
    },
    layoutDuration: 400,
    dragRelease: {
      duration: 400,
      easing: 'ease-out',
    },
    dragEnabled: true,
    dragContainer: document.body,
    layout: {
      fillGaps: true,
    },
    // The placeholder of an item that is being dragged.
    dragPlaceholder: {
      enabled: true,
    },
    dragStartPredicate: {
      distance: 10,
    },
    visibleStyles: {
      transform: 'scale(1)',
    },
    hiddenStyles: {
      transform: 'scale(1)',
    },
  };

  const history = useHistory();

  const onArticleCardClick = (kbNumber: string) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
    });
  };
  let dataUser: any = UserService.getCurrentUser();

  return items.length === 0 ? (
    <NoResultsMessage />
  ) : (
    <MuuriComponent {...options} dragFixed>
      {items.map(item => (
        <Box key={item.id} width={1} padding={2}>
          <IoAccordion.AccordionDetails
            title={item.name}
            description={item.content}
            rate={item.rating}
            lastUpdated={DateUtils.timetoXbyUTC(
              item.publishedDate,
              dataUser.time_zone,
            )}
            viewCount={item.viewCount}
            kbNumber={item.number}
            onViewDetail={onArticleCardClick}
          />
        </Box>
      ))}
    </MuuriComponent>
  );
};

export default KnowledgeArticleList;
