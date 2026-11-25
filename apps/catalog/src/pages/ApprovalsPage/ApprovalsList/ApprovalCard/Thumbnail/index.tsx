import React from 'react';
import { useTranslation } from 'react-i18next';
import ImageWithFallback from 'components/ImageWithFallback';
import backupImage from 'assets/images/noimage_computer.png';

/**
 * Props type for Thumbnail.
 */
interface ThumbnailProps {
  /** src of the image to render, a default image is rendered if no value is passed */
  image?: string;
}

/**
 * Renders thumbnail of the approval card.
 *
 * @param props The props the component expects.
 */
const Thumbnail: React.FC<ThumbnailProps> = props => {
  const { t } = useTranslation();
  return (
    <ImageWithFallback
      width="100%"
      src={props.image}
      fallbackSrc={backupImage}
      alt={t('approvals:order.imageAlt')}
    />
  );
};
export default Thumbnail;
