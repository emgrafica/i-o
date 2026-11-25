import React from 'react';
import { Box, Container, Grid, Typography } from '@lumos/core';
import { Col, GridLayout, Row } from 'components/GridLayout';
import { ShowFor } from 'components';

/** ListPageLayout Props */
interface ListPageLayoutProps {
  /** Refine component */
  refine?: React.ReactElement;
  /** SortBy component */
  sortBy?: React.ReactElement;
  /** DateRange component */
  dateRange?: React.ReactElement;
  /** Pagination component */
  pagination?: React.ReactElement;
  /** Filter component */
  filters?: React.ReactElement;
  /** Boolean to determine whether content is loading (when true, pagination will be hidden) */
  loading?: boolean;
}

/**
 * ListPageLayout is meant to be used inside the ListPageTemplate wrapper. It's purpose
 * is to position all components (refine, sortBy, filters, pagination, children)
 * on a page with listed content in order to keep consistency throughout the app.
 */
const ListPageLayout: React.FC<ListPageLayoutProps> = ({
  refine,
  sortBy,
  dateRange,
  pagination,
  filters,
  loading,
  children,
}) => {
  return (
    <Container width="100%">
      <ShowFor desktopAndLarger>
        <GridLayout columnGutters={0}>
          <Row>
            {/* <Col
              colspan={{
                xxs: '2',
              }}
            >
              <Box paddingX="5px">
                {refine}
                {dateRange}
                {filters}
              </Box>
            </Col> */}
            <Col
              colspan={{
                xxs: '12',
              }}
            >
              <Box paddingX="5px">
                <Grid flexDirection="column">
                  <Grid
                    flexDirection="row"
                    alignItems="center"
                    marginBottom="32px"
                    height="68px"
                  >
                    {refine}
                    <Box marginTop="24px">
                      {dateRange}
                      {filters}
                      {sortBy}
                    </Box>

                    {/* {!loading && <Box marginLeft="auto">{pagination}</Box>} */}
                  </Grid>
                  {children}
                  {/* {!loading && (
                    <Grid
                      justifyContent="flex-end"
                      marginTop="60px"
                      marginBottom="100px"
                    >
                      {pagination}
                    </Grid>
                  )} */}
                  {pagination}
                </Grid>
              </Box>
            </Col>
          </Row>
        </GridLayout>
      </ShowFor>
      <ShowFor tabletAndSmaller>
        <Grid flexDirection="column" width="100%">
          <ShowFor tablet>
            <Grid flexDirection="row" alignItems="flex-end" marginBottom="32px">
              {refine}
              {dateRange}
              {filters}
              {sortBy}
            </Grid>
          </ShowFor>
          <ShowFor mobile>
            <Box marginBottom="12px">{refine}</Box>
            <Box marginBottom="12px">
              {dateRange}
              {filters}
              {sortBy}
            </Box>
          </ShowFor>
          {children}
          {!loading && (
            <Box
              marginRight={{ xxs: 'auto', md: '0px' }}
              marginTop={{ xxs: '20px', md: '32px' }}
              marginBottom={{ xxs: '50px', md: '100px' }}
            >
              {pagination}
            </Box>
          )}
        </Grid>
      </ShowFor>
    </Container>
  );
};

export default ListPageLayout;
