#  Responsive Design

This article documents the different techniques at our disposal to
tackle the problem of responsive design.

## Breakpoints and devices
The following table illustrate the breakpoints that we support and
how they are group by devices:

### Breakpoints
- xxs: 0px - 374px (This breakpoint is not officially supported by us)
- xxs  375px - 599px
- sm:  600px - 767px
- md:  768px - 1279px
- lg:  1280px - 1439px
- xl:  1440px - 1919px
- xxl: 1920px and beyond

### Devices
- Mobile: 0px - 767px (xxs, xs, sm)
- Tablet: 768px - 1279px (md)
- Desktop: 1280px - 1919px (lg, xl)
- Ultrawide: 1920px+ (xxl)

## Styled-System Responsive Styles

`styled-system` responsive styles provide us with a short and simple alternative to
writing media queries out by hand. This is convenient when we need to define style
props based on the current breakpoint.

### Example
```tsx
<Box width={{ xxs: 1, sm: 1, md: 1 / 2, lg: 1 / 4 }} />
```

Please find more information in the [official documentation page](https://styled-system.com/responsive-styles).

## Media queries

Consider using media queries when the responsive style changes can not easily be modelled
with `styled-system` responsive styles.

### Example

```tsx
const SomeComponent = styled.div`
  ${({ theme }) => `
    @media screen and (max-width: ${theme.breakpoints.sm}) {
       // Styles
    }
  `}
`;
```

### Tips

As shown in the example, keep in mind we can access the `theme.breakpoint` object within the
media query. This is a more robust approach than simply hard-coding the pixel values manually.

## useDevice and useBreakpoint hooks

Consider using the `useDevice` and `useBreakpoint` hooks for cases in which we need to run different logic
based on the current breakpoint or device. These hooks were designed for cases in which the changes
in behavior goes beyond simple style changes.

### Example

```tsx
import useDevice, { Device } from 'utils/useDevice';
import useBreakpoint, { Breakpoint } from 'utils/useBreakpoint';

const SomeComponent: React.FC = () => {
  const device = useDevice();
  const breakpoint = useBreakpoint();
  return (
    <p>
      This is {device !== Device.Desktop && 'not '} the desktop breakpoint.
    </p>
    <p>
      This is the {breakpoint !== Breakpoint.sm && 'not '} the sm breakpoint.
    </p>
  );
};
```

### Tips

Note that the `Breakpoint` and `Device` enums values are mapped to numbers so we can do something like
the following snippet to check for screen sizes smaller or larger than a given device size.

```tsx
{ useDevice() <= Device.Tablet ? ... : ... }
```

## ShowFor component

The `ShowFor` component allows us to dynamically show content based on the current screen
breakpoint or device. This is especially useful for cases in which the UI of a given component changes
dramatically between breakpoints. Keep in mind these components allows us to reuse the same
layout for multiple breakpoints by setting the corresponding props.

### Example

```tsx
  <ShowFor tabletAndSmaller>
    content for mobile and tablet
  </ShowFor>
  <ShowFor md lg>
    content for the md and lg breakpoints
  </ShowFor>
  <ShowFor mobile desktopAndLarger>
    content for mobile, desktop and ultrawide screens
  </ShowFor>
```
