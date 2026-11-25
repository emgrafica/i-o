import React from 'react';
import { useHistory } from 'react-router-dom';
import { MuuriComponent } from 'muuri-react';
import { Box } from '@lumos/core';
import { IoCard } from '@i-o/design-system';
import DateUtils from 'utils/date';
import { AUTH } from 'constants/authConstants';
import useDevice, { Device } from 'utils/useDevice';

type SubcategoriesProps = {
  items: any[];
  columns: number;
};

const Subcategories: React.FC<SubcategoriesProps> = ({
  items,
  columns = 1,
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
    dragStartPredicate: {
      distance: 10,
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
  };
  const history = useHistory();
  const device = useDevice();

  const onArticleCardClick = (kbNumber: string) => {
    history.push({
      pathname: `/knowledges/detail/${kbNumber}`,
    });
  };
  let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
  const time_zone = !!currentUser ? JSON.parse(currentUser).time_zone : '';
  const isMobile = device === Device.Mobile;

  columns = isMobile ? 1 : columns;
  const widthBox = isMobile ? 280 : 600;

  return (
    <Box
      borderRadius="12px"
      width={1}
      border={'thin solid'}
      borderColor="grayScale.0"
    >
      <MuuriComponent {...options} dragFixed>
        {items.map(item => (
          <Box key={item.id} width={{ xxs: 1, md: 1 / columns }} padding={2}>
            <IoCard.SupportArticle
              direction="horizontal"
              cardType={
                item.knowledgeBase
                  ? item.knowledgeBase.toUpperCase()
                  : item.knowledgeBase
              }
              cardTitle={item.name}
              cardDesc={item.content}
              lastUpdated={DateUtils.timetoXbyUTC(item.lastUpdated, time_zone)}
              kbNumber={item.number}
              rate={item.rating}
              viewCount={item.viewCount}
              onViewDetail={onArticleCardClick}
            />
          </Box>
        ))}
      </MuuriComponent>
    </Box>
  );
};

export default Subcategories;
