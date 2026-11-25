import React, { useContext } from 'react';
import { Box } from '@lumos/core';
import { ApolloError } from 'apollo-client';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import { Col, GridLayout, Row } from 'components/GridLayout';
import CatalogCard from 'components/CatalogCard';
import { useQueryLifecycles } from 'hooks/useQueryLifecycles';
import { CatalogPageContext } from '../../CatalogPageContext';
import { CatalogItemClass } from 'gqlTypes/globalTypes';
import { CatalogData_catalogModels_catalogModels as CatalogModel } from 'graphql/queries/gqlTypes/CatalogData';
import { pathMap } from '../../utils';
import NoResultsWithFilters from 'components/NoResultsWithFilters';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';
import useDevice from '../../../../utils/useDevice';
import { createSkeletonCatalogCardList } from '../utils';

/**
 * Props for CatalogCardListProps extended with react-router props
 */
export interface CatalogCardListProps extends RouteComponentProps {
  /**
   * catalogItemClass to be loaded
   */
  catalogItemClass: CatalogItemClass;

  /**
   * Catalog models available in catalog
   */
  catalogModels: CatalogModel[] | null;
  /**
   * Total number of catalog models
   */
  totalHits: Number;
  /**
   * Is catalog cards loading
   */
  loading: boolean;
  /**
   * Catalog Models error
   */
  catalogModelsError?: ApolloError;
  /**
   * Catalog Models retry function
   */
  catalogModelsRefetch: Function;
}

/**
 * Card for Catalog
 * @param props
 */

const CatalogCardList: React.FC<CatalogCardListProps> = ({
  catalogModels,
  totalHits,
  catalogItemClass,
  loading,
  catalogModelsError,
  catalogModelsRefetch,
}) => {
  const { error } = useQueryLifecycles(CatalogPageContext);
  const { handleSetCatalogInfo } = useContext(CatalogPageContext);
  const breakpoint = useBreakpoint();
  const device = useDevice();

  const catalogModelsList = catalogModels || [];

  let content;
  if (error || catalogModelsError) {
    content = <ErrorMessage onRetry={() => catalogModelsRefetch()} />;
  } else {
    content = (
      <GridLayout columnGutters={0}>
        <Row>
          {loading || !catalogModels
            ? createSkeletonCatalogCardList(6, device)
            : catalogModelsList.map((item: CatalogModel, i: number) => {
                return (
                  <Col
                    key={`${item.description}:${i}`}
                    display="column"
                    colspan={{
                      xxs: '12',
                      md: '4',
                    }}
                    paddingBottom={3}
                  >
                    <Box paddingX={breakpoint >= Breakpoint.md ? '6px' : 0}>
                      <CatalogCard
                        item={item}
                        path={pathMap[catalogItemClass]}
                        onClick={handleSetCatalogInfo}
                      />
                    </Box>
                  </Col>
                );
              })}
        </Row>
      </GridLayout>
    );
  }
  if (
    !loading &&
    catalogModels &&
    (catalogModelsList.length === 0 || totalHits === 0)
  ) {
    return <NoResultsWithFilters />;
  }
  return content;
};

export default withRouter(CatalogCardList);
