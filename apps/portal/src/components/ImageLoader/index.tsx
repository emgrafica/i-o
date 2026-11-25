import React, { useState } from 'react';
import { Box } from '@lumos/core';

interface ImageLoaderProps {
  /**
   * image name to use it as image alt
   */
  imageName: string;

  /**
   * image url
   */
  imageUrl: string | null;

  /**
   * image width
   */
  width: string;

  /**
   * image height
   */
  height: string;

  /**
   * default image that will be displayed if an invalid url is passed
   */
  defaultImage: string;
}

/**
 * Image Loader
 * Renders a given image that scales properly for a given width and height independently of the provided image.
 * For invalid urls it displays a provided default image.
 */
const ImageLoader: React.FC<ImageLoaderProps> = ({
  imageName,
  imageUrl,
  width,
  height,
  defaultImage,
}) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = imageError ? defaultImage : imageUrl || defaultImage;
  return (
    <>
      {/* Dummy Image to use onError validation for invalid urls */}
      <img
        style={{
          display: 'none',
        }}
        src={imageSrc}
        onError={() => {
          setImageError(true);
        }}
        alt={imageName}
      />
      {/* Loading Image as div background to make it scale properly */}
      <Box
        background={`url(${imageSrc})`}
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundColor="#FFFFFF"
        justifyContent="center"
        width={width}
        height={height}
        alt={imageName}
      />
    </>
  );
};

export default ImageLoader;
