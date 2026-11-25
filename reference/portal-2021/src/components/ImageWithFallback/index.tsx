import React from 'react';

/** Props for ImageWithFallback */
interface ImageWithFallbackProp
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallbackSrc: string;
}

/** This component is a wrapper for the img component.
 *  It receives a fallbackSrc to use in case the original
 *  src fails to load or is undefined. The component is
 *  used for cases in which we always need to render an
 *  image regardless of errors, or when we need a default
 *  generic image.
 */
const ImageWithFallback: React.FC<ImageWithFallbackProp> = ({
  src: originalSrc,
  fallbackSrc,
  onError,
  ...rest
}) => {
  const [src, setSrc] = React.useState(originalSrc || fallbackSrc);
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={src}
      onError={event => {
        setSrc(fallbackSrc);
        if (onError) onError(event);
      }}
      {...rest}
    />
  );
};

export default ImageWithFallback;
