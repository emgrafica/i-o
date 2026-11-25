import styled from 'styled-components';

/** Scales the child image to be used for thumbnail for cards in the Tablet and larger screens */
export const ThumbnailBoxLarge = styled.div`
  float: left;
  margin-right: 10px;
  & img {
    max-width: 55px;
    max-height: 55px;
  }
`;

/** Scales the child image to be used for thumbnail for cards in the mobile screens */
export const ThumbnailBoxSmall = styled.div`
  margin-right: 5px;
  & img {
    max-width: 45px;
    max-height: 45px;
  }
`;
